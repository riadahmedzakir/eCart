import * as actionTypes from './types';

export const setCart = (product) => {
    return {
        type: actionTypes.SET_CART_ITEM,
        payload: {
            product: product
        }
    }
}