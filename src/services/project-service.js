import { request } from './netlify-service';

export function getMatrix() {
    return request(`https://themes.stackbit.com/supportMatrix.json`, { withCredentials: false }).then((matrix) => {
        return {
            ssg: matrix.ssg.filter((item) => item.status === 'enabled'),
            cms: matrix.cms.filter((item) => item.status === 'enabled')
        };
    });
}
