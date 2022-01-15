import React from "react";

import { Divider, Grid, Pagination, Rating, Segment } from "semantic-ui-react";

class ProductReview extends React.Component {
    render() {
        const posts = [{
            ItemId: 1,
            PostDate: '29 Nov 2021',
            Rating: 5,
            UserName: 'anonymous',
            Comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis nunc sed id semper risus. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Id leo in vitae turpis massa sed elementum. Leo duis ut diam quam nulla porttitor massa id. Sed libero enim sed faucibus turpis in eu mi bibendum. Commodo odio aenean sed adipiscing diam donec adipiscing. Hac habitasse platea dictumst quisque. Purus sit amet luctus venenatis lectus magna fringilla urna. Purus semper eget duis at. Et magnis dis parturient montes nascetur ridiculus mus mauris. Feugiat nisl pretium fusce id velit ut.'
        },
        {
            ItemId: 2,
            PostDate: '29 Nov 2021',
            Rating: 5,
            UserName: 'anonymous cup',
            Comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis nunc sed id semper risus. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Id leo in vitae turpis massa sed elementum. Leo duis ut diam quam nulla porttitor massa id. Sed libero enim sed faucibus turpis in eu mi bibendum. Commodo odio aenean sed adipiscing diam donec adipiscing. Hac habitasse platea dictumst quisque. Purus sit amet luctus venenatis lectus magna fringilla urna. Purus semper eget duis at. Et magnis dis parturient montes nascetur ridiculus mus mauris. Feugiat nisl pretium fusce id velit ut.'
        }]

        return (
            < Segment >
                <p style={{ fontWeight: 'bold' }}>Product Review</p>
                <Divider />

                {
                    posts.map(item =>
                        <React.Fragment key={item.ItemId}>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={14}><Rating icon='star' defaultRating={5} maxRating={5} /></Grid.Column>
                                    <Grid.Column width={2}>
                                        <p className="label-paragraph-12">{item.PostDate}</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <p className="label-paragraph-12">By {item.UserName}</p>
                            <p>{item.Comment}</p>
                            <Divider />
                        </React.Fragment>
                    )
                }

                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <Pagination defaultActivePage={1} totalPages={5} />
                </div>
            </Segment>
        )
    }
}

export default ProductReview;