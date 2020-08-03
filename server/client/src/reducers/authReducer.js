import { FETCH_USER } from '../actions/types';

export default function (state = null, action) { //A default state for when this reducer is called 
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; //in javascript, an empty string is equivalent to false
        
        default:
            return state;
    }
}