import * as actionTypes from './types';

export const setCart = (product) => {
    return {
        type: actionTypes.SET_CART_ITEM,
        payload: {
            product: product
        }
    }
}

export const setWholeCart = (cart) => {
    return {
        type: actionTypes.SET_WHOLE_CART,
        payload: {
            product: cart
        }
    }
}