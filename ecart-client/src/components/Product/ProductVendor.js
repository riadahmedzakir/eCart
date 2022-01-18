import React from "react";

import { Button, Divider, Grid, Segment } from "semantic-ui-react";

class ProductVendor extends React.Component {
    render() {
        return (
            <Segment placeholder style={{ marginTop: '50px' }}>
                <Grid>
                    <Grid.Row>
                        <Grid columns={2}>
                            <Grid.Row style={{ padding: '0px' }}>
                                <Grid.Column>
                                    <p className='label-paragraph-12'>Sold by</p>
                                    <p className="vendor-name">xYz Co.</p>
                                </Grid.Column>
                                <Grid.Column>
                                    {/* <p>Chat now</p> */}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                    <Divider style={{ margin: '0px' }} />

                    <Grid.Row>
                        <Grid columns={3} divided>
                            <Grid.Column>
                                <p className='label-paragraph-12'>Positive Seller Ratings</p>
                                <p className="vendor-ratings">90%</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p className='label-paragraph-12'>Ship on Time</p>
                                <p className="vendor-ratings">100%</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p className='label-paragraph-12'>Chat Response Rate</p>
                                <p className="vendor-ratings">100%</p>
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                    <Divider style={{ margin: '0px' }} />

                    <Grid.Row centered>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Button basic color="green">Go to Store</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

export default ProductVendor;