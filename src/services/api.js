import axios from 'axios/index';

function apiFetch(endpoint, params, method = 'get') {
    return axios({
        data: params,
        method: method,
        url: process.env.GATSBY_STACKBIT_API_URL + endpoint,
        withCredentials: true
    }).then((response) => response.data);
}

function signUpload(dataType) {
    return apiFetch(`/project/upload-sign/${dataType}`, {}, 'post');
}

export function uploadData(dataType, file) {
    return signUpload(dataType).then((req) => {
        let formData = new FormData();

        Object.keys(req.data).forEach((key) => {
            formData.append(key, req.data[key]);
        });

        formData.append('file', file);

        return axios.post(req.url, formData, {}).then(() => ({
            key: req.key,
            nextUrl: req.nextUrl
        }));
    });
}
