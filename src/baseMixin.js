import moment from 'moment';
import {
    useRoute
} from 'vue-router';
import {
    useStore
} from 'vuex';

export const useBase = () => {
    return {
        route: useRoute(),
        store: useStore(),
        moment
    }
}