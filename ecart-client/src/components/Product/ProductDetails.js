import './../../App.css';

import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { Container, Breadcrumb, Divider, Image, Grid, Rating, Segment, Input, Button } from "semantic-ui-react";

import Navigation from "../Navigation/Navigation";
import UtilityService from '../../services/utility/utility-service';
import CartService from './../../services/cart/cart-service';
import { setWholeCart } from './../../actions';
import ProductVendor from './ProductVendor';
import ProductDeliveryInformation from './ProductDeliveryInformation';
import ProductRating from './ProductRating';
import ProductReview from './ProductReview';
import ProductQuestion from './ProductQuestion';

class ProductDetails extends React.Component {
    state = {
        BreadcrumbName: '',
        CurrentItem: {}
    }

    handleCartAdd = () => {
        const { cart } = this.props;
        const { CurrentItem } = this.state;

        const newCart = CartService.PrepareCart(cart, CurrentItem, 1);
        CartService.AddItemsToCart(newCart);
        this.props.setWholeCart(newCart.productList);
    }

    componentDidMount() {
        const queryParams = UtilityService.GetQueryParamFromString(this.props.location.search);
        this.getProductDetails(queryParams.id);
    }

    getProductDetails = (ItemId) => {
        const url = `${process.env.REACT_APP_PRODUCT_MICROSERVICE}/getById/${ItemId}`;

        axios.get(url)
            .then(res => {
                this.setState({ CurrentItem: res.data, BreadcrumbName: res.data.name });
            });
    }

    render() {
        const { BreadcrumbName, CurrentItem } = this.state;
        return (
            <Container fluid>
                <Navigation></Navigation>

                <Breadcrumb className='px-20'>
                    <Breadcrumb.Section>
                        <Link to={"/"}>Home</Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section active>{BreadcrumbName}</Breadcrumb.Section>
                </Breadcrumb>

                <Divider />

                <Container fluid className='product-details-container'>
                    <Grid columns={3} centered>
                        <Grid.Row>
                            <Grid columns={1}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Image className='product-details-image' src={CurrentItem.imageUrl} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <Grid.Column>
                                <p style={{ fontSize: '26px', fontWeight: 'bold', margin: '0' }}>{CurrentItem.name}</p>
                                <Grid style={{ padding: '0px 14px' }}>
                                    <Grid.Row>
                                        <Rating style={{ paddingTop: '4px' }} icon='star' defaultRating={4} maxRating={5} disabled />
                                        <p className='rating-text'>69 Rating</p>
                                    </Grid.Row>
                                </Grid>
                                <Divider />
                                <p className='unit-price-text'>$ {CurrentItem.unitPrice}</p>

                                <Input style={{ width: '150px' }} type='number' min={0} max={CurrentItem.stock} placeholder='Quantity'>
                                    <input />
                                </Input>

                                <div>
                                    <Button style={{ width: '150px', marginTop: '16px' }} color='green' onClick={this.handleCartAdd}>Add to cart</Button>
                                </div>

                                <ProductVendor />
                            </Grid.Column>

                            <ProductDeliveryInformation />
                        </Grid.Row>
                    </Grid>

                    <Segment>
                        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>Description</p>
                        <p>{CurrentItem.description}</p>
                    </Segment>

                    <ProductRating />
                    <ProductReview />
                    <ProductQuestion />
                </Container>
            </Container >
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart.productList
});

export default connect(mapStateToProps, { setWholeCart })(ProductDetails);