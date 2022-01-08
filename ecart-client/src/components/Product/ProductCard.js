import React from "react";

import { Card, Grid, Image, Button } from 'semantic-ui-react';

class ProductCard extends React.Component {
    render() {
        const { Item } = this.props;
        return (
            <Card key={Item.itemId}>
                <Image src={Item.imageUrl} wrapped ui={false} />

                <Card.Content>
                    <Card.Header className="product-title">{Item.name}</Card.Header>
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
                            <Button color='green'>Add to cart</Button>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }
}

export default ProductCard;