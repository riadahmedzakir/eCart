import * as actionTypes from './types';

export const setProductList = (productList, loading) => {
    return {
        type: actionTypes.SET_PRODUCT_LIST,
        payload: {
            productList: productList,
            loading: loading
        }
    }
}