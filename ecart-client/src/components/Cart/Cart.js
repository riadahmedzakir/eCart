import './../../App.css';

import React from "react";
import { connect } from 'react-redux';
import { Breadcrumb, Button, Container, Divider, Grid, Image, Input } from 'semantic-ui-react';

import { setWholeCart } from './../../actions'
import Navigation from "../Navigation/Navigation";
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    state = {
        InputController: {},
        posts: []
    }

    componentDidMount() {
        const { InputController } = this.state;
        const posts = [{
            "itemId": "ba1aa961-eb50-4133-9537-9288ccbe22a4",
            "name": "Beef Ground Medium",
            "active": true,
            "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
            "productId": "4456924f-44b2-497c-86ba-b88be95d8df7",
            "createDate": "2021-05-26T08:04:22.000+00:00",
            "unitPrice": 35,
            "imageUrl": "https://picsum.photos/200",
            "stock": 6,
            "lastUpdateDate": "2021-10-25T03:14:05.000+00:00"
        }];

        posts.forEach(item => {
            InputController[item.itemId] = item.stock;
        });

        this.setState({ InputController, posts });
    }

    handleChange = (event) => {
        const { InputController } = this.state;
        const value = event.target.value;
        const name = event.target.name;

        InputController[name] = value;

        this.setState({ InputController })
    }

    render() {
        const { InputController, posts } = this.state;

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
                            <Grid.Row>
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
                                    <Input name={item.itemId} type='number' placeholder='Quantity' value={InputController[item.itemId]} onChange={this.handleChange} />
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
                                    <Grid.Column><p>555</p></Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column><p>Tax : </p></Grid.Column>
                                    <Grid.Column><p>555</p></Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column><p>Delivery Charge : </p></Grid.Column>
                                    <Grid.Column><p>555</p></Grid.Column>
                                </Grid.Row>
                                <Divider style={{marginRight: '260px'}} />
                                <Grid.Row>
                                    <Grid.Column><p style={{ fontSize: '24px', fontWeight: 'bold' }}>Total : </p></Grid.Column>
                                    <Grid.Column><p style={{ fontSize: '24px', fontWeight: 'bold' }}>555</p></Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column></Grid.Column>
                        <Grid.Column></Grid.Column>
                        <Grid.Column><Button style={{ width: '60%' }} size='huge' color='green'>Checkout</Button></Grid.Column>
                    </Grid.Row>
                </Grid>


            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.productList
});

export default connect(mapStateToProps, { setWholeCart })(Cart);