import moment from 'moment';
import {
    useRoute
} from 'vue-router';
import {
    useStore
} from 'vuex';
import axios from 'axios';

export const useBase = () => {
    return {
        route: useRoute(),
        store: useStore(),
        moment,
        axios
    }
}