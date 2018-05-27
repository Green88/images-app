import qs from 'qs';
import imgurAPI from '../../api/imgur';
import { router } from '../../main';

const state = {
    token: window.localStorage.getItem('imgur_token') || null
};

const getters = {
    isLoggedIn: state => !!state.token
};

const actions = {
    logout: ({ commit }) => {
        commit('setToken', null);
        window.localStorage.removeItem('imgur_token');
    },
    finalizeLogin: ({ commit }, hash) => {
        const parsedQuery = qs.parse(hash.replace('#', ''));
        // eslint-disable-next-line
        console.log(parsedQuery);
        commit('setToken', parsedQuery.access_token);
        window.localStorage.setItem('imgur_token', parsedQuery.access_token);
        router.push('/');
    },
    login: () => {
        imgurAPI.login();
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};