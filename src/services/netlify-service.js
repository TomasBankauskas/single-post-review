let apiBaseUrl = 'https://api.stackbit.com';
if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
        apiBaseUrl = 'https://localhost:8082';
    }
}

export function request(url, options = {}) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        let requestBody;
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr);
            }
        };
        xhr.withCredentials = typeof options.withCredentials === 'boolean' ? options.withCredentials : true;
        xhr.open(options.method || 'GET', url);
        if (options.headers) {
            Object.keys(options.headers).forEach((key) => {
                xhr.setRequestHeader(key, options.headers[key]);
            });
        }
        if (options.json) {
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            requestBody = JSON.stringify(options.json);
        }
        xhr.send(requestBody);
    });
}

export function popup(myUrl) {
    const windowArea = {
        width: Math.floor(window.outerWidth * 0.7),
        height: Math.floor(window.outerHeight * 0.7)
    };

    if (windowArea.width < 1000) {
        windowArea.width = 1000;
    }
    if (windowArea.height < 630) {
        windowArea.height = 630;
    }
    windowArea.left = Math.floor(window.screenX + (window.outerWidth - windowArea.width) / 2);
    windowArea.top = Math.floor(window.screenY + (window.outerHeight - windowArea.height) / 8);

    const sep = myUrl.indexOf('?') !== -1 ? '&' : '?';
    const url = myUrl + sep;
    const windowOpts =
        'toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,width=' +
        windowArea.width +
        ',height=' +
        windowArea.height +
        ',left=' +
        windowArea.left +
        ',top=' +
        windowArea.top;

    const authWindow = window.open(url, '_blank', windowOpts);

    return new Promise(function (resolve) {
        const interval = setInterval(function () {
            if (authWindow.closed) {
                resolve();
                clearInterval(interval);
            }
        }, 50);
    });
}

let netlifySites = null;

export function getUser() {
    return request(`${apiBaseUrl}/user/my`);
}
export function getProjects() {
    return request(`${apiBaseUrl}/project/my`);
}
export function importNetlify(site) {
    return request(`${apiBaseUrl}/project/import-netlify-site`, { method: 'POST', json: { site: site } });
}
export function getNetlifySites(netlifyConnection) {
    return netlifySites
        ? Promise.resolve(netlifySites)
        : request('https://api.netlify.com/api/v1/sites', {
              withCredentials: false,
              headers: { Authorization: `Bearer ${netlifyConnection.accessToken}` }
          }).then((sites) => {
              netlifySites = sites;
              return sites;
          });
}
export function getTokenInfo(netlifyConnection) {
    return request('https://api.netlify.com/api/v1/user', {
        withCredentials: false,
        headers: { Authorization: `Bearer ${netlifyConnection.accessToken}` }
    });
}
export function authenticate() {
    return popup(`${apiBaseUrl}/auth/netlify?tosVersion=1.0&allowConnectionOnly=true`);
}
