import {
    setRoute
} from './setRoute';

const drivers = setRoute('/drivers', import('../../views/Drivers.vue'))

export default drivers