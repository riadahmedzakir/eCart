import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialProductListState = {
    productList: []
};


const cart_reducer = (state = initialProductListState, action) => {
    switch (action.type) {
        case actionTypes.SET_CART_ITEM:
            const currentList = JSON.parse(JSON.stringify(state.productList));
            currentList.push(action.payload.product);
            return {
                productList: currentList
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cart: cart_reducer
});

export default rootReducer;