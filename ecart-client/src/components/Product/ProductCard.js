import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { Card, Grid, Image, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { setCart } from './../../actions'

class ProductCard extends React.Component {
    handleCartAdd = () => {
        const { Item, cart } = this.props;
        const newCart = JSON.parse(JSON.stringify(cart));
        newCart.push(Item);
        const cartModel = {
            id: localStorage.getItem("user_session_id"),
            productList: newCart
        }

        this.saveCartItem(cartModel);
        this.props.setCart(Item);
    }

    saveCartItem = (cartModel) => {
        const url = `${process.env.REACT_APP_CART_MICROSERVICE}/add`;

        axios.post(url, cartModel)
            .then(res => { });
    }

    render() {
        const { Item } = this.props;
        return (
            <Card key={Item.itemId}>
                <Image src={Item.imageUrl} wrapped ui={false} />

                <Card.Content>
                    <Card.Header className="product-title">
                        <Link to={"/product-details?" + Item.itemId}>{Item.name}</Link>
                    </Card.Header>
                    <Card.Description className="product-description">
                        {Item.description}
                    </Card.Description>
                </Card.Content>

                <Card.Content>
                    <Grid>
                        <Grid.Row className="space-between px-20">
                            <p><b>$ {Item.unitPrice}</b></p>
                            {
                                Item.stock ?
                                    <p>Stock : {Item.stock}</p> :
                                    <p>Out of stock</p>
                            }
                        </Grid.Row>
                    </Grid>
                </Card.Content>

                <Card.Content>
                    <Grid centered>
                        <Grid.Row>
                            <Button color='green' onClick={this.handleCartAdd}>Add to cart</Button>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.productList
});

export default connect(mapStateToProps, { setCart })(ProductCard);