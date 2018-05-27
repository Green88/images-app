import qs from 'qs';
import axios from 'axios';
import { IMGUR_CLIENT_ID, IMGUR_ROOT_URL } from '../constants';

export default {
    login() {
        const querystring = {
            client_id: IMGUR_CLIENT_ID,
            response_type: 'token'
        };

        window.location = `${IMGUR_ROOT_URL}/oauth2/authorize?${qs.stringify(querystring)}`;
    },
    fetchImages(token) {
        const url = `${IMGUR_ROOT_URL}/3/account/me/images`;
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return axios.get(url, { headers });
    },
    uploadImages(images, token) {
        const url = `${IMGUR_ROOT_URL}/3/image`;
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const promises = Array.from(images).map(image => {
            const formData = new FormData();
            formData.append('image', image);
            return axios.post(url, formData, { headers });
        });
        return Promise.all(promises);
    }
};