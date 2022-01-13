import React from "react";

import { Grid, Segment, Divider, Button } from "semantic-ui-react";

class ProductDeliveryInformation extends React.Component {
    render() {
        return (
            <Segment style={{ padding: "20px" }} placeholder>
                <Grid>
                    <Grid.Row style={{ padding: 0 }}>
                        <Grid.Column>
                            <p className='label-paragraph-12'>Delivery options</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: 0 }}>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <i style={{ fontSize: '26px' }} aria-hidden="true" className="map marker alternate icon"></i>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    <p className='product-details-text-c3'>Dhaka, Dhaka North, Banani Road No. 12 - 19</p>
                                </Grid.Column>
                                <Grid.Column width={1}>
                                    <Button icon="edit" />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>
                <Divider />

                <Grid>
                    <Grid.Row style={{ padding: 0 }}>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <i style={{ fontSize: '26px' }} aria-hidden="true" className="home icon" />
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <Grid>
                                        <Grid.Row style={{ paddingBottom: 0 }}>
                                            <Grid.Column><p className='product-details-text-c3'>Home Delivery</p></Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={{ padding: 0 }}>
                                            <Grid.Column><p className='label-paragraph-12'>4-6 days</p></Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <p className='product-details-text-c3'>$ 35</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>

                <Segment style={{ marginTop: '30px' }}>
                    Enjoy free shipping promotion with minimum spend of ৳ 10,000
                </Segment>

                <Grid>
                    <Grid.Row>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <i style={{ fontSize: '26px' }} aria-hidden="true" className="payment icon"></i>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    <p className='product-details-text-c3'>Cash on delivary</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>

                <Divider />

                <Grid>
                    <Grid.Row style={{ padding: 0 }}>
                        <Grid.Column>
                            <p className='label-paragraph-12'>Return & Warranty</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: 0 }}>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <i style={{ fontSize: '26px' }} aria-hidden="true" className="redo icon"></i>
                                </Grid.Column>
                                <Grid.Column width={15}>
                                    <Grid>
                                        <Grid.Row style={{ paddingBottom: 0 }}>
                                            <Grid.Column><p className='product-details-text-c3'>7 Days Returns</p></Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={{ padding: 0 }}>
                                            <Grid.Column><p className='label-paragraph-12'>Change of mind is not applicable</p></Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>

                <Grid>
                    <Grid.Row>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    <i style={{ fontSize: '26px' }} aria-hidden="true" className="shield icon"></i>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    <p className='product-details-text-c3'>Warranty not available</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

export default ProductDeliveryInformation;