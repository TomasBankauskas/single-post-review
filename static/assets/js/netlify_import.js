(function() {
    if (window.netlifyImporterLoaded === true) {
        return
    }
    window.netlifyImporterLoaded = true;
    const hostname = window.location.hostname;



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
            if (options.headers) {
                Object.keys(options.headers).forEach(key=>{
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


    let apiBaseUrl = 'https://api.stackbit.com';

    if (hostname === "localhost") {
        apiBaseUrl = "https://localhost:8082"
    }

    function getUser() { return request(`${apiBaseUrl}/user/my`); }
    function getProjects() { return request(`${apiBaseUrl}/project/my`); }
    function importNetlify(site) { return request(`${apiBaseUrl}/project/import-netlify-site`, { method: 'POST', json: { site: site } }) }
    function getNetlifySites(netlifyConnection) { return netlifySites ? Promise.resolve(netlifySites) : request('https://api.netlify.com/api/v1/sites', { withCredentials: false, headers: {Authorization: `Bearer ${netlifyConnection.accessToken}`} }); }
    function getTokenInfo(netlifyConnection) { return request('https://api.netlify.com/api/v1/user', { withCredentials: false, headers: {Authorization: `Bearer ${netlifyConnection.accessToken}`} }); }
    function authenticate() { return popup(`${apiBaseUrl}/auth/netlify?tosVersion=1.0`); }

    var buttonClassName = 'sign-netlify';
    var isDeploying = false;

    var states = {
        init: 1,
        needAuth: 2,
        needNetlify: 3,
        canOpenPicker: 4
    };
    var state = states.init;
    var userId;
    var user;
    var buttons = [];
    let selectedSite = null;
    let siteListEl;
    let netlifySites;
    let netlifyModal;
    var netlifyConnection;

    function init() {
        track('Landing Netlify Import - Page Visited');

        buttons = Array.prototype.slice.call(document.getElementsByClassName(buttonClassName));
        buttons.forEach(function(button) {
            button.addEventListener('click', netlifyButtonHandler);
        });

        netlifyModal = document.getElementById('netlify-modal');
        siteListEl = document.querySelectorAll('#netlify-modal .site-list')[0];
        if (netlifyModal) {
            siteListEl.addEventListener('click', (evt)=>{
                let chosenSiteEl = evt.target.closest('.netlify-site');
                if (chosenSiteEl) {
                    var prevSelected = document.querySelectorAll('.site-list .selected')[0];
                    clearSelection();

                    if (prevSelected !== chosenSiteEl) {
                        siteListEl.classList.add('has-selected');
                        chosenSiteEl.classList.add('selected');
                        let id = chosenSiteEl.getAttribute('site-id');
                        selectedSite = netlifySites.find(site => site.id === id);
                        track('Landing Netlify Import - Site Selected', {userId, siteId: id});
                    }

                    validate();
                }
            });
            netlifyModal.querySelector('#agree-tos-modal').addEventListener('click', evt => {
                evt.stopPropagation();
                validate();
            });
            netlifyModal.querySelector('#import-site-cta').addEventListener('click', evt => {
                if (!evt.currentTarget.classList.contains('disabled')) {
                    onSiteSelected(selectedSite)
                }
            });
            netlifyModal.querySelector('#close-import-modal').addEventListener('click', () => {
                closeModal();
            });
            netlifyModal.querySelector('#close-and-try-modal-button').addEventListener('click', () => {
                closeModal();
                switchModalPage('modal-page-1');
            });
            netlifyModal.querySelector('#contact-us-button').addEventListener('click', () => {
                window.Intercom && window.Intercom('showNewMessage');
            });
        }

        initNetlify(true);
    }

    function clearSelection() {
        var prevSelected = document.querySelectorAll('.site-list .selected')[0];
        if (prevSelected) {
            track('Landing Netlify Import - Site Deselected', {userId, siteId: selectedSite.id});
            prevSelected.classList.remove('selected');
        }
        document.querySelectorAll('#netlify-modal .site-list')[0].classList.remove('has-selected');
        selectedSite = null;
    }

    function validate() {
        if (!netlifyModal || !siteListEl) {
            return false;
        }
        const agreedTos = netlifyModal.querySelector('#agree-tos-modal').checked;
        const isValid = agreedTos && selectedSite;
        netlifyModal.querySelector('#import-site-cta').classList.toggle('disabled', !isValid);
        return isValid;
    }

    function switchModalPage(pageId) {
        document.querySelectorAll('.modal-page:not(.hidden)').forEach(page=>page.classList.add('hidden'));
        document.getElementById(pageId).classList.remove('hidden');
    }

    function netlifyButtonHandler(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (isDeploying) {
            return;
        }
        if (state === states.needAuth || state === states.needNetlify) {
            track('Landing Netlify Import - CTA Clicked', {userId, isLoggedIn: state === states.needNetlify, isNetlifyConnected: false});
            authenticate()
                .then(initNetlify)
                .then(openModal);
        } else if (state === states.canOpenPicker) {
            track('Landing Netlify Import - CTA Clicked', {userId, isLoggedIn: true, isNetlifyConnected: true});
            openModal();
        }
    }

    function initNetlify(isInitial = false) {
        return getUser()
            .then(function(currentUser) {
                if (currentUser) {
                    user = currentUser;
                    userId = currentUser.id;
                    identify(currentUser);
                }
                var connection = currentUser.connections.find(function(c) { return c.type === 'netlify'; });
                if (!connection) {
                    state = states.needNetlify;
                    return;
                }

                return getTokenInfo(connection)
                    .then(function(user) {
                        if (!user) {
                            state = states.needNetlify;
                            return;
                        }

                        netlifyConnection = connection;
                        state = states.canOpenPicker;
                    });
            })
            .catch(function(err) {
                state = states.needAuth;
                throw err;
            }).finally(()=>{
                buttons.forEach(function(button) {
                  button.classList.add('enabled');
                });

                if (!isInitial) {
                    if (state === states.canOpenPicker) {
                        track('Landing Netlify Import - Auth Success', {userId});
                    } else {
                        track('Landing Netlify Import - Auth Failed', {userId, isLoggedIn: state === states.needNetlify, isNetlifyConnected: false});
                    }
                }
            });
    }

    function populateNetlifySites() {
        return Promise.all([getNetlifySites(netlifyConnection), getProjects()]).then(([sites, projects])=>{
            let projectHash = projects.reduce((prev,cur)=>{
                if (cur.deploymentData && cur.deploymentData.netlify) {
                    prev[cur.deploymentData.netlify.id] = cur;
                }
                return prev;
            },{});
            let titleEl = netlifyModal.querySelector('.modal-title');
            titleEl.innerHTML = 'Pick your Netlify project:';
            netlifySites = sites;
            siteListEl.innerHTML = '';
            sites
                .map(site => {
                    const project = projectHash[site.id];
                    site.hasWidget = project ? (project.widget && project.widget.netlifyInject) : false;
                    return site;
                })
                .sort((a, b) => a.hasWidget - b.hasWidget)
                .forEach(site => {
                    const tmpl = document.getElementById('template-netlify-site');
                    const node = tmpl.cloneNode(true);
                    node.id = null;
                    if (site.hasWidget) {
                        node.classList.add('disabled', 'has-widget');
                    }
                    node.setAttribute('site-id', site.id);
                    node.querySelector('.site-thumb img').src = site.screenshot_url || '../images/netlify-site-placeholder.png';
                    node.querySelector('.site-name').innerText = site.name;
                    node.querySelector('.site-publish-date').innerText = site.published_deploy ? `Last published at ${new Date(site.published_deploy.published_at).toLocaleString()}` : '';
                    siteListEl.appendChild(node);
                });

            netlifyModal.querySelector('.site-list-shadow').style.display = 'block';

            if (!projects.length && netlifyModal) {
                netlifyModal.querySelector('#agree-tos-panel').style.display = 'block';
            }
        });
    }

    function openModal() {
        if (!netlifyModal) {
            console.error('missing netlify modal');
            return;
        }
        netlifyModal.classList.remove('hidden');
        if (!netlifySites) {
            return populateNetlifySites();
        }
    }

    function closeModal() {
        clearSelection();
        netlifyModal.classList.add('hidden');
        netlifyModal.querySelector('.site-list').scrollTop = 0;
        validate();
    }

    let elapsed = 0;
    function onSiteSelected(site) {
        if (!site) {
            return;
        }
        track('Landing Netlify Import - Importing Site', {userId, siteId: site.id});

        const goToSiteBtn = netlifyModal.querySelector('#launching-button');

        isDeploying = true;
        goToSiteBtn.removeAttribute('href');
        netlifyModal.querySelector('#import-site-cta').classList.add('disabled');

        elapsed = new Date();

        importNetlify(site)
            .then(function (project) {
                track('Landing Netlify Import - Importing Site Success', {userId, siteId: project.deploymentData.netlify.id, projectId: project.id});

                goToSiteBtn.classList.remove('hidden', 'display--none');

                switchModalPage('modal-page-2');

                netlifyModal.querySelector('#modal-page-2 .modal-title').innerHTML = 'You’re all set!';

                netlifyModal.querySelector('#close-and-try-modal-button').classList.add('hidden', 'display--none');
                netlifyModal.querySelector('#contact-us-button').classList.add('hidden', 'display--none');

                var url = site.ssl_url;
                var widgetToken = user.widgetAuthToken;
                if (widgetToken) {
                    url += `?stackbit=${widgetToken}`;
                } else {
                    track('Landing Netlify Import - Stackbit Widget Key Not Found', {userId, projectId: project.id});
                }

                goToSiteBtn.href = url;

                addCountdown('Launching Your Site in', 3, goToSiteBtn, function() {
                   location.assign(url);
                });
            })
            .catch(() => {
                importSiteErrorHandler(site);
            });
    }

    function importSiteErrorHandler(site) {
        netlifyModal.querySelector('#launching-button').classList.add('display--none');

        switchModalPage('modal-page-2');

        track('Landing Netlify Import - Failed Importing Site', {userId, siteId: site.id});
        isDeploying = false;

        netlifyModal.querySelector('#modal-page-2 .modal-title').innerHTML = 'Couldn\'t add the Control Center to your site.';
        netlifyModal.querySelector('#close-and-try-modal-button').classList.remove('hidden', 'display--none');
        netlifyModal.querySelector('#contact-us-button').classList.remove('hidden', 'display--none');
    }

    function addCountdown(text, seconds = 3, el, cb) {
        el.textContent = `${text} ${seconds} ...`;
        if (seconds --> 1) {
            setTimeout(() => addCountdown(text, seconds, el, cb), 1000);
        } else {
            cb();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }


    function track(name, props = {}) {
        if (!window.analytics) {
            return;
        }

        // props.variant = 'master';
        window.analytics.ready(() => {
            const user = window.analytics.user();
            window.analytics.track(name, props, {
                context: {
                    traits: {email: user ? user.traits().email : null}
                }
            });
        });
    }

    function identify(user) {
        let userObj = filterUser(user);
        window.analytics.identify(user._id, {...userObj, client: true});
    }

    function filterUser(user) {
        return {
            ...user,
            connections: [
                ...user.connections.map(connection=>{
                    let newCon = {...connection};
                    delete newCon.accessToken;
                    delete newCon.refreshToken;
                    return newCon;
                })
            ]
        }
    }
})();
