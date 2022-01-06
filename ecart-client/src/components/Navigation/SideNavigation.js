import React from "react";
import axios from 'axios';

import { Menu, Grid, Segment } from "semantic-ui-react";
import ProductList from "../Product/ProductList";

class SideNavigation extends React.Component {
    state = {
        ActiveCategory: 'All',
        Items: [],
        Categories: []
    };


    componentDidMount() {
        this.getProductList();
        this.getProductCategoryList();
    }

    getProductList = (ProductId) => {
        const getUrl = (ProductId) ? `${process.env.REACT_APP_PRODUCT_MICROSERVICE}/${ProductId}` : process.env.REACT_APP_PRODUCT_MICROSERVICE

        axios.get(getUrl)
            .then(res => {
                const items = res.data;
                this.setState({ Items: items });
            });
    }

    getProductCategoryList = () => {
        const getUrl = `${process.env.REACT_APP_PRODUCT_CATEGORY_MICROSERVICE}`;

        axios.get(getUrl)
            .then(res => {
                const categories = [{
                    name: 'All',
                    itemId: 'all'
                }];

                categories.push(...res.data);

                this.setState({ Categories: categories });
            });
    }

    handleItemClick = (e, { name, id }) => {
        this.setState({ ActiveCategory: name });

        if (id && id !== 'all') { this.getProductList(id); }
        else { this.getProductList(); }
    }

    render() {
        const { ActiveCategory, Items, Categories } = this.state;

        return (
            <Grid className="body-container">
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        {Categories.map(item =>
                            <Menu.Item
                                name={item.name}
                                key={item.itemId}
                                id={item.itemId}
                                active={ActiveCategory === item.name}
                                onClick={this.handleItemClick}
                            />
                        )}
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment>
                        <ProductList Items={Items} />
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default SideNavigation;