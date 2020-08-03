import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) { //By default, this state will be an empty array waiting for surveys
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}