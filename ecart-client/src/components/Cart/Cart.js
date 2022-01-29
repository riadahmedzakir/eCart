import './../../App.css';

import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Container, Divider, Grid, Image, Input } from 'semantic-ui-react';
import axios from 'axios';

import { setWholeCart } from './../../actions'
import Navigation from "../Navigation/Navigation";
import CartService from './../../services/cart/cart-service';

class Cart extends React.Component {
    state = {
        InputController: {},
        posts: [],
        SubTotal: 0,
        Total: 0,
        DeliveryCharge: 5,
        Tax: 0,
        CheckoutDisabled: false
    }


    componentDidMount() {
        this.getCartItems();
    }

    getCartItems = () => {
        const url = `${process.env.REACT_APP_CART_MICROSERVICE}/get/${localStorage.getItem("user_session_id")}`;

        axios.get(url)
            .then(res => {
                const cart = (res && res.data && res.data.productList.length) ? res.data.productList : [];
                this.getProductInfos(cart);
            });
    }

    getProductInfos = (cart) => {
        if (!cart && !cart.length) { return; }

        const url = `${process.env.REACT_APP_PRODUCT_MICROSERVICE}/getProductByIds`;
        const { Tax, DeliveryCharge } = this.state;
        const itemIds = cart.map(item => item.itemId);
        const payload = {
            itemIds: itemIds
        };

        if (itemIds.length) {
            axios.post(url, payload)
                .then(res => {
                    const { InputController } = this.state;
                    const posts = res.data;
                    const SubTotal = CartService.CountTotal(cart);
                    const Total = SubTotal + DeliveryCharge + Tax;
                    posts.forEach(item => {
                        InputController[item.itemId] = cart.find(x => x.itemId === item.itemId).quantity;
                    });


                    this.setState({ InputController, posts, SubTotal, Total });
                });
        }
    }

    handleChange = (event) => {
        if (!event.target.value) { return; }

        const { InputController, Total, posts, SubTotal } = this.state;
        const value = parseInt(event.target.value);
        const name = event.target.name;
        const isGreater = (value > InputController[name]) ? true : false;
        const extraAdded = (isGreater) ? value - InputController[name] : InputController[name] - value;


        InputController[name] = value;
        const newValueAdded = extraAdded * posts.find(item => item.itemId === name).unitPrice;
        const newSubtotal = (isGreater) ? SubTotal + newValueAdded : SubTotal - newValueAdded;
        const newTotal = (isGreater) ? Total + newValueAdded : Total - newValueAdded;
        this.setState({ InputController, Total: newTotal, SubTotal: newSubtotal });
    }

    handleCheckout = () => {
        const { InputController, SubTotal } = this.state;
        const { cart } = this.props;
        const CartItemIds = Object.keys(InputController);
        CartItemIds.forEach(itemId => {
            const cartIndex = cart.findIndex(product => product.itemId === itemId);
            cart[cartIndex].quantity = InputController[itemId];
        });
        const newCart = JSON.parse(JSON.stringify(cart));
        this.props.setWholeCart(newCart);

        this.setState({ CheckoutDisabled: true });

        const cartModel = {
            id: localStorage.getItem("user_session_id"),
            total: SubTotal,
            productList: newCart
        }

        CartService.AddItemsToCart(cartModel).then(() => { 
            this.props.history.push('/checkout');
        });
    }

    render() {
        const { InputController, posts, SubTotal, Tax, DeliveryCharge, Total, CheckoutDisabled } = this.state;

        return (
            <Container fluid>
                <Navigation />

                <Breadcrumb className='px-20'>
                    <Breadcrumb.Section>
                        <Link to={"/"}>Home</Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section active>Cart</Breadcrumb.Section>
                </Breadcrumb>

                <Divider />

                <Grid columns={3} centered>
                    <Grid.Row style={{ background: '#25ba59', marginTop: '20px', marginLeft: '40px', marginRight: '40px' }}>
                        <Grid.Column width={6}>
                            <p style={{ fontWeight: 'bold' }}>Product</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p style={{ fontWeight: 'bold' }}>Quantity</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p style={{ fontWeight: 'bold' }}>Subtotal</p>
                        </Grid.Column>
                    </Grid.Row>


                    {
                        posts.map(item =>
                            <Grid.Row key={item.itemId}>
                                <Grid.Column width={6}>
                                    <Grid columns={2}>
                                        <Grid.Row>
                                            <Grid.Column width={6}>
                                                <Image size='small' src={item.imageUrl} wrapped ui={false} />
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '0px' }}>{item.name}</p>
                                                <p>Price $: {item.unitPrice}</p>
                                                <Button color='red'>Remove</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Input name={item.itemId} type='number' placeholder='Quantity' min='0' max={item.stock} value={InputController[item.itemId]} onChange={this.handleChange} />
                                </Grid.Column>
                                <Grid.Column width={4}>{item.unitPrice * InputController[item.itemId]}</Grid.Column>
                            </Grid.Row>
                        )
                    }

                    <Divider />

                    <Grid.Row>
                        <Grid.Column></Grid.Column>
                        <Grid.Column></Grid.Column>
                        <Grid.Column>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column><p>SubTotal : </p></Grid.Column>
                                    <Grid.Column><p>{SubTotal}</p></Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column><p>Tax : </p></Grid.Column>
                                    <Grid.Column><p>{Tax}</p></Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column><p>Delivery Charge : </p></Grid.Column>
                                    <Grid.Column><p>{DeliveryCharge}</p></Grid.Column>
                                </Grid.Row>
                                <Divider style={{ marginRight: '260px' }} />
                                <Grid.Row>
                                    <Grid.Column><p style={{ fontSize: '24px', fontWeight: 'bold' }}>Total : </p></Grid.Column>
                                    <Grid.Column><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{Total}</p></Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column></Grid.Column>
                        <Grid.Column></Grid.Column>
                        <Grid.Column>
                            <Button loading={CheckoutDisabled} disabled={CheckoutDisabled} onClick={this.handleCheckout} style={{ width: '60%' }} size='huge' color='green'>
                                Checkout
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container >
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.productList
});

export default connect(mapStateToProps, { setWholeCart })(Cart);