import {
    setRoute
} from './setRoute';

const races = setRoute('/races', import('../../views/Races.vue'))

export default races