import axios from 'axios';

function AddItemsToCart(cartModel) {
    const url = `${process.env.REACT_APP_CART_MICROSERVICE}/add`;

    return axios.post(url, cartModel)
}

const CartService = {
    AddItemsToCart: AddItemsToCart
};

export default CartService;