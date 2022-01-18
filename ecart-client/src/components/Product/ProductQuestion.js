import React from "react";

import { Divider, Grid, Icon, Pagination, Segment } from "semantic-ui-react";

class ProductQuestion extends React.Component {
    render() {
        const posts = [{
            ItemId: 1,
            Question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
            QuestionedBy: 'Lorem ipsum',
            Answer: 'Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Sed tempus urna et pharetra pharetra massa massa ultricies mi.'
        },
        {
            ItemId: 2,
            Question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
            QuestionedBy: 'Lorem ipsum',
            Answer: 'Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Sed tempus urna et pharetra pharetra massa massa ultricies mi.'
        }];

        return (
            <Segment>
                <p style={{ fontWeight: 'bold' }}>Questions & Answers</p>
                <Divider />

                {
                    posts.map(item =>
                        <React.Fragment key={item.ItemId}>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Icon style={{ fontSize: '20px' }} circular color='teal' name='question' />
                                    </Grid.Column>
                                    <Grid.Column width={15}>
                                        <Grid columns={1}>
                                            <Grid.Row style={{ paddingBottom: 0 }}>
                                                <Grid.Column>
                                                    <p style={{ padding: 0, fontWeight: 'bold', fontSize: '16px' }}>{item.Question}</p>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row style={{ padding: 0 }}>
                                                <Grid.Column>
                                                    <p className="label-paragraph-12">by {item.QuestionedBy}</p>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Icon style={{ fontSize: '20px' }} circular color='red' size="big" name='checkmark' />
                                    </Grid.Column>
                                    <Grid.Column width={15}>
                                        <p style={{ padding: 0, fontSize: '16px' }}>{item.Answer}</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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

export default ProductQuestion;