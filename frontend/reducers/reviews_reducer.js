import {RECEIVE_REVIEWS, DELETE_REVIEW} from '../actions/review_actions';
import {RECEIVE_PRODUCT} from '../actions/product_actions';

const reviewsReducer = (state ={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return Object.assign({}, state, action.reviews);
        case RECEIVE_PRODUCT:
            if (action.product.reviews) {
                return action.product.reviews;
            } else {
                return {};
            }
        case DELETE_REVIEW:
            let newState = Object.assign({}, state);
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;