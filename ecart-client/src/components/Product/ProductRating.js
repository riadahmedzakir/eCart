import React from "react";

import { Divider, Grid, Progress, Rating, Segment } from "semantic-ui-react";

class ProductRating extends React.Component {
    render() {
        return (
            <Segment>
                <p style={{ fontWeight: 'bold' }}>Product Rating</p>
                <Divider style={{ padding: 0 }} />

                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <p style={{ fontWeight: 'bold', fontSize: '40px', textAlign: "center", margin: '20px' }}>
                                5.0 / <span style={{ color: 'grey' }}>5</span>
                            </p>
                            <div style={{ margin: 'auto', width: '35%' }}>
                                <Rating style={{ fontSize: '24px' }} icon='star' defaultRating={5} maxRating={5} disabled />
                            </div>
                            <p style={{ textAlign: 'center' }} className="label-paragraph-12">69 Ratings</p>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Grid columns={3}>
                                <Grid.Row style={{ paddingBottom: 0 }}>
                                    <Grid.Column width={2}><Rating icon='star' defaultRating={5} maxRating={5} disabled /></Grid.Column>
                                    <Grid.Column><Progress progress='value' value={100} /></Grid.Column>
                                    <Grid.Column>69 Total</Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ padding: 0 }}>
                                    <Grid.Column width={2}><Rating icon='star' defaultRating={4} maxRating={5} disabled /></Grid.Column>
                                    <Grid.Column><Progress progress='value' value={0} /></Grid.Column>
                                    <Grid.Column>0 Total</Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ padding: 0 }}>
                                    <Grid.Column width={2}><Rating icon='star' defaultRating={3} maxRating={5} disabled /></Grid.Column>
                                    <Grid.Column><Progress progress='value' value={0} /></Grid.Column>
                                    <Grid.Column>0 Total</Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ padding: 0 }}>
                                    <Grid.Column width={2}><Rating icon='star' defaultRating={2} maxRating={5} disabled /></Grid.Column>
                                    <Grid.Column><Progress progress='value' value={0} /></Grid.Column>
                                    <Grid.Column>0 Total</Grid.Column>
                                </Grid.Row>

                                <Grid.Row style={{ padding: 0 }}>
                                    <Grid.Column width={2}><Rating icon='star' defaultRating={1} maxRating={5} disabled /></Grid.Column>
                                    <Grid.Column><Progress progress='value' value={0} /></Grid.Column>
                                    <Grid.Column>0 Total</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

export default ProductRating;