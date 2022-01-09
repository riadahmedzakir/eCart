import React from "react";

import { Card } from 'semantic-ui-react';
import ProductCard from "./ProductCard";

class ProductList extends React.Component {
    render() {
        const { Items } = this.props;
        return (
            <React.Fragment>
                {
                    Items && Items.length ?
                        <Card.Group itemsPerRow={5}>
                            {Items.map(item =>
                                <ProductCard Item={item} />
                            )}
                        </Card.Group> :
                        <p>No item</p>
                }
            </React.Fragment>
        )
    }
}

export default ProductList;