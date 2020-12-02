import _ from 'lodash';

export function track(name, props = {}) {
    if (!window.analytics) {
        return Promise.resolve();
    }

    props.variant = process.env.BRANCH || 'none';

    return new Promise((resolve, reject) => {
        var isAnalyticsReady = false;
        window.analytics.ready(() => {
            const user = window.analytics.user();
            isAnalyticsReady = true;
            window.analytics.track(
                name,
                props,
                {
                    context: {
                        traits: { email: user ? user.traits().email : null, variant: props.variant }
                    }
                },
                () => {
                    resolve();
                }
            );

        });
        setTimeout(function () {
            if (!isAnalyticsReady) {
                resolve();
            }
        }, 500);
    });
}

export function identify(user) {
    let userObj = filterUser(user);
    window.analytics.identify(user._id, { ...userObj, client: true });
    window.$crisp.push(['set', 'user:email', userObj.email]);
    window.$crisp.push([
        'set',
        'session:data',
        [
            _.toPairs(userObj).map((pair) => {
                if (!['string', 'boolean', 'number'].includes(typeof pair[1])) {
                    pair[1] = JSON.stringify(pair[1]);
                }
                return pair;
            })
        ]
    ]);
}

export function filterUser(user) {
    return {
        ...user,
        connections: [
            ...user.connections.map((connection) => {
                let newCon = { ...connection };
                delete newCon.accessToken;
                delete newCon.refreshToken;
                return newCon;
            })
        ]
    };
}
