import axios from 'axios';

function AddItemsToCart(cartModel) {
    const url = `${process.env.REACT_APP_CART_MICROSERVICE}/add`;

    return axios.post(url, cartModel);
}

function PrepareCart(Cart, CurrentItem, Quantity) {
    const newCart = JSON.parse(JSON.stringify(Cart));
    let total = (newCart.total) ? newCart.total : 0;
    const itemIndex = newCart.findIndex(item => item.itemId === CurrentItem.itemId);

    if (itemIndex === -1) {
        newCart.push({
            itemId: CurrentItem.itemId,
            quantity: Quantity,
            price: CurrentItem.unitPrice
        });
    } else {
        newCart[itemIndex].quantity = newCart[itemIndex].quantity + Quantity;
    }

    total = total + (Quantity * CurrentItem.unitPrice);

    const cartModel = {
        id: localStorage.getItem("user_session_id"),
        total: total,
        productList: newCart
    }

    console.log(cartModel);

    return cartModel;
}

const CartService = {
    AddItemsToCart: AddItemsToCart,
    PrepareCart: PrepareCart
};

export default CartService;