(function() {
    function request(url, options = {}) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            var requestBody;
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr);
                }
            };
            xhr.withCredentials = typeof options.withCredentials === 'boolean' ? options.withCredentials : true;
            xhr.open(options.method || 'GET', url);
            if (options.json) {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                requestBody = JSON.stringify(options.json);
            }
            xhr.send(requestBody);
        });
    }

    function popup(myUrl) {
        var windowArea = {
            width: Math.floor(window.outerWidth * 0.7),
            height: Math.floor(window.outerHeight * 0.7),
        };

        if (windowArea.width < 1000) { windowArea.width = 1000; }
        if (windowArea.height < 630) { windowArea.height = 630; }
        windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
        windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));

        var sep = (myUrl.indexOf('?') !== -1) ? '&' : '?';
        var url = myUrl + sep;
        var windowOpts = 'toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,width=' + windowArea.width +
            ',height=' + windowArea.height + ',left=' + windowArea.left + ',top=' + windowArea.top;

        var authWindow = window.open(url, '_blank', windowOpts);

        return new Promise(function(resolve) {
            var interval = setInterval(function() {
                if (authWindow.closed) {
                    resolve();
                    clearInterval(interval);
                }
            }, 50);
        });
    }

    function getUser() { return request('https://api.stackbit.com/user/my'); }
    function refreshToken() { return request('https://api.stackbit.com/auth/google/refresh'); }
    function deploy(project) { return request('https://api.stackbit.com/project/deploy', { method: 'POST', json: { project: project } }) }
    function getTokenInfo(googleConnection) { return request('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleConnection.accessToken, { withCredentials: false }); }
    function authenticate(scope) { return popup('https://api.stackbit.com/auth/google?tosVersion=1.0&scope=' + scope); }

    var driveScope = 'https://www.googleapis.com/auth/drive.readonly';
    var gapiSrc = 'https://apis.google.com/js/api.js';
    var pickerMimeTypes = ['application/vnd.google-apps.document', 'application/vnd.google-apps.kix'];
    var buttonClassName = 'sign-google';
    var isDeploying = false;

    var states = {
        init: 1,
        needAuth: 2,
        canOpenPicker: 3
    };
    var state = states.init;
    var buttons = [];
    var googleConnection;

    function init() {
        buttons = Array.prototype.slice.call(document.getElementsByClassName(buttonClassName));
        buttons.forEach(function(button) {
            button.addEventListener('click', googleButtonHandler);
        });

        var scripts = Array.prototype.slice.call(document.scripts);
        var hasGapi = scripts.some(function(script) {
            return script.getAttribute('src') === gapiSrc;
        });
        if (!hasGapi) {
            var script = document.createElement('script');
            script.setAttribute('src', gapiSrc);
            script.addEventListener('load', initGapi);
            document.head.appendChild(script);
        }

        return initGoogle();
    }

    function googleButtonHandler(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (isDeploying) {
            return;
        }
        if (state === states.needAuth) {
            authenticate(driveScope)
                .then(initGoogle)
                .then(openPicker);
        } else if (state === states.canOpenPicker) {
            openPicker();
        }
    }

    function initGoogle() {
        return getUser()
            .then(function(user) {
                var connection = user.connections.find(function(c) { return c.type === 'google'; });
                if (!connection) {
                    state = states.needAuth;
                    return;
                }

                return getTokenInfo(connection)
                    .then(function(token) {
                        if (!token || token.expires_in < 300) {
                            return refreshToken().then(initGoogle);
                        }

                        var scopes = (token.scope || '').split(' ');
                        var hasScope = scopes.indexOf(driveScope) !== -1;

                        if (!hasScope) {
                            state = states.needAuth;
                            return;
                        }

                        googleConnection = connection;
                        state = states.canOpenPicker;
                    });
            })
            .catch(function(err) {
                state = states.needAuth;
                throw err;
            });
    }

    function initGapi() {
        window.gapi.load('picker');
    }

    function openPicker() {
        if (!window.google || !window.google.picker) {
            return;
        }

        var view = new window.google.picker.DocsView()
            .setIncludeFolders(true)
            .setParent('root')
            .setOwnedByMe(true)
            .setMimeTypes(pickerMimeTypes.join(','));

        var picker = new window.google.picker.PickerBuilder()
            .addView(view)
            .setOAuthToken(googleConnection.accessToken)
            .setCallback(onDocumentSelected);

        picker.setOrigin(window.location.protocol + '//' + window.location.host);

        picker.build().setVisible(true);
    }

    function onDocumentSelected(result) {
        var doc = result && result.docs && result.docs[0];
        if (!doc) {
            return;
        }

        var project = {
            wizard: {
                theme: null,
                ssg: null,
                cms: null,
                repository: null,
                deployment: {
                    id: 'container',
                    title: 'Container'
                }
            },
            importData: {
                dataType: 'googledocs',
                settings: {
                    docId: doc.id
                }
            }
        };

        isDeploying = true;

        deploy(project)
            .then(function (project) {
                var container = project && project.deploymentData && project.deploymentData.container;
                var url = container && container.url;
                if (url) {
                    var anchor = document.createElement('a');
                    anchor.setAttribute('href', url);
                    var searchQuery = anchor.search.slice(1);
                    var searchParts = searchQuery ? searchQuery.split('&') : [];
                    searchParts.push('widget');
                    anchor.search = '?' + searchParts.join('&');
                    window.location.href = anchor.href;
                }
            })
            .catch(function() {
                isDeploying = false;
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
