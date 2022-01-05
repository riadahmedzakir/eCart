import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialProductListState = {
    productList: [],
    loading: true
};


const product_list_reducer = (state = initialProductListState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCT_LIST:
            return {
                product_list: action.payload.productList,
                loading: false
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    product: product_list_reducer
});

export default rootReducer;