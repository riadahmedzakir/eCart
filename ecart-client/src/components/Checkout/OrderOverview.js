import axios from "axios";
import React from "react";
import { Accordion, Divider, Grid, Icon, Segment } from "semantic-ui-react";
import CartService from "../../services/cart/cart-service";

class OrderOverview extends React.Component {
    state = {
        posts: [],
        activeIndex: -1,
        SubTotal: 0,
        DeliveryCharge: 5,
        Tax: 0,
        Total: 0
    }

    componentDidMount() {
        this.getCartItems();
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    getCartItems = () => {
        const url = `${process.env.REACT_APP_CART_MICROSERVICE}/get/${localStorage.getItem("user_session_id")}`;

        axios.get(url)
            .then(res => {
                const cart = (res && res.data && res.data.productList.length) ? res.data.productList : [];

                const url = `${process.env.REACT_APP_PRODUCT_MICROSERVICE}/getProductByIds`;
                const { Tax, DeliveryCharge } = this.state;
                const itemIds = cart.map(item => item.itemId);
                const payload = {
                    itemIds: itemIds
                };

                if (itemIds.length) {
                    axios.post(url, payload)
                        .then(res => {
                            const posts = res.data;
                            posts.forEach((item, index) => {
                                posts[index].quantity = cart.find(x => x.itemId === item.itemId).quantity;
                            });
                            const SubTotal = CartService.CountTotal(cart);
                            const Total = SubTotal + DeliveryCharge + Tax;
                            this.setState({ posts, SubTotal, Total });
                        });
                }
            });
    }

    render() {
        const { activeIndex, posts, SubTotal, Total, DeliveryCharge, Tax } = this.state;

        return (
            <Segment>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Order Details</p>
                <Grid columns={2}>
                    <Grid.Row style={{ paddingBottom: '0px' }}>
                        <Grid.Column>Order ID :</Grid.Column>
                        <Grid.Column style={{ fontWeight: 'bold' }}>#5XFR-FFGS</Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ paddingTop: '0px' }}>
                        <Grid.Column>Total : </Grid.Column>
                        <Grid.Column style={{ fontWeight: 'bold' }}>{Total}</Grid.Column>
                    </Grid.Row>
                </Grid>

                <Accordion style={{ marginTop: '10px' }}>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick} >
                        <Icon name='dropdown' />
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>View Details</span> (2 Items)
                    </Accordion.Title>

                    <Accordion.Content style={{ padding: '30px', background: '#f7f7f7' }} active={activeIndex === 0}>
                        <Grid columns={2}>
                            {
                                posts.map(item =>
                                    <Grid.Row style={{ padding: '0px' }}>
                                        <Grid.Column width={12}>{item.name}</Grid.Column>
                                        <Grid.Column width={4}>x{item.quantity}</Grid.Column>
                                    </Grid.Row>
                                )
                            }
                            <Divider />

                            <Grid.Row style={{ padding: '0px' }}>
                                <Grid.Column width={12}>Subtotal</Grid.Column>
                                <Grid.Column width={4}>{SubTotal}</Grid.Column>
                            </Grid.Row>

                            <Grid.Row style={{ padding: '0px' }}>
                                <Grid.Column width={12}>Delivery Charge</Grid.Column>
                                <Grid.Column width={4}>{DeliveryCharge}</Grid.Column>
                            </Grid.Row>

                            <Grid.Row style={{ padding: '0px' }}>
                                <Grid.Column width={12}>Tax</Grid.Column>
                                <Grid.Column width={4}>{Tax}</Grid.Column>
                            </Grid.Row>

                            <Grid.Row style={{ paddingBottom: '0px', paddingTop: '10px', fontWeight: 'bold', fontSize: '20px' }}>
                                <Grid.Column width={12}>Total</Grid.Column>
                                <Grid.Column width={4}>{Total}</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        )
    }
}

export default OrderOverview;