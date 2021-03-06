import React from "react";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Button, Menu, Search } from "semantic-ui-react";
import { setWholeCart } from './../../actions'
import { Link } from "react-router-dom";
import CartService from './../../services/cart/cart-service';

class Navigation extends React.Component {
    setUserIdentity = () => {
        const userSessionId = localStorage.getItem("user_session_id");
        if (!userSessionId) { localStorage.setItem("user_session_id", uuidv4()) }
    }

    getCartItems = () => {
        const url = `${process.env.REACT_APP_CART_MICROSERVICE}/get/${localStorage.getItem("user_session_id")}`;

        axios.get(url)
            .then(res => {
                const cart = (res && res.data && res.data.productList.length) ? res.data.productList : []
                this.props.setWholeCart(cart);
            });
    }

    componentDidMount() {
        this.setUserIdentity();
        this.getCartItems();
    }

    render() {
        const { cart } = this.props;
        const totalValueAddedToCart = CartService.CountTotal(cart);

        return (
            <Menu >
                <Menu.Item header>eCart</Menu.Item>

                <Search className="custom-navigation" />

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <i aria-hidden="true" className="shopping cart icon"></i>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={"/Cart"}>
                            <Button circular color='green'>
                                {cart.length}
                            </Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <p>$ {totalValueAddedToCart}</p>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.productList
});

export default connect(mapStateToProps, { setWholeCart })(Navigation);