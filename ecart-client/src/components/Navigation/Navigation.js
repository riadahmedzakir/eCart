import React from "react";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Button, Menu, Search } from "semantic-ui-react";

class Navigation extends React.Component {
    countTotal = (list) => {
        const total = list.reduce((sum, { unitPrice }) => sum + unitPrice, 0);
        return total;
    }

    setUserIdentity = () => {
        const userSessionId = localStorage.getItem("user_session_id");
        if (!userSessionId) { localStorage.setItem("user_session_id", uuidv4()) }
    }

    componentDidMount() { 
        this.setUserIdentity();
    }

    render() {
        const { cart } = this.props;
        const totalValueAddedToCart = this.countTotal(cart);

        return (
            <Menu >
                <Menu.Item header>eCart</Menu.Item>

                <Search className="custom-navigation" />

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <i aria-hidden="true" className="shopping cart icon"></i>
                    </Menu.Item>
                    <Menu.Item>
                        <Button circular color='green'>{cart.length}</Button>
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

export default connect(mapStateToProps)(Navigation);