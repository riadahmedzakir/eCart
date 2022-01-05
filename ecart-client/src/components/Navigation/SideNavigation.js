import React from "react";
import axios from 'axios';

import { Menu, Grid, Segment } from "semantic-ui-react";
import ProductList from "../Product/ProductList";

class SideNavigation extends React.Component {
    state = {
        ActiveCategory: 'All',
        Items: []
    };


    componentDidMount() {
        this.getProductList();
    }

    getProductList = (ProductId) => {
        const getUrl = (ProductId) ? `${process.env.REACT_APP_PRODUCT_MICROSERVICE}/${ProductId}` : process.env.REACT_APP_PRODUCT_MICROSERVICE

        axios.get(getUrl)
            .then(res => {
                const items = res.data;
                this.setState({ Items: items });
            });
    }

    handleItemClick = (e, { name }) => {
        this.setState({ ActiveCategory: name });

        // TO-DO: read categories from db
        switch (name) {
            case 'Electronics':
                this.getProductList('4456924f-44b2-497c-86ba-b88be95d8df7');
                break;
            default:
                this.getProductList();
                break;
        }
    }

    render() {
        const { ActiveCategory, Items } = this.state;

        return (
            <Grid className="body-container">
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item
                            name='All'
                            active={ActiveCategory === 'All'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Electronics'
                            active={ActiveCategory === 'Electronics'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Cosmetics'
                            active={ActiveCategory === 'Cosmetics'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Placeholder'
                            active={ActiveCategory === 'Placeholder'}
                            onClick={this.handleItemClick}
                        />
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