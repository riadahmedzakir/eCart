import React from "react";
import axios from 'axios';

import { Menu, Grid, Pagination, Divider } from "semantic-ui-react";
import ProductList from "../Product/ProductList";

class SideNavigation extends React.Component {
    state = {
        ActiveCategory: 'All',
        Items: [],
        TotalPages: 0,
        ActivePage: 1,
        Categories: [],
        SelectedProduct: 'all'
    };


    componentDidMount() {
        this.getProductList();
        this.getProductCategoryList();
    }

    getProductList = (ProductId, PageNumber) => {
        const getUrl = (ProductId) ?
            `${process.env.REACT_APP_PRODUCT_MICROSERVICE}/get/${PageNumber ? PageNumber : 0}/${ProductId}` :
            `${process.env.REACT_APP_PRODUCT_MICROSERVICE}/get/${PageNumber ? PageNumber : 0}`

        axios.get(getUrl)
            .then(res => {
                const items = res.data.data;
                const totalPages = Math.ceil(res.data.totalRecord / 10);
                this.setState({ Items: items, TotalPages: totalPages });
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

    handleCategoryClick = (e, { name, id }) => {
        this.setState({ ActiveCategory: name, ActivePage: 1, SelectedProduct: id });

        if (id && id !== 'all') { this.getProductList(id); }
        else { this.getProductList(); }
    }

    handlePageChange = (e, data) => {
        const { SelectedProduct } = this.state;
        const ProductId = SelectedProduct !== "all" ? SelectedProduct : undefined;
        const page = data.activePage - 1;
        this.setState({ ActivePage: data.activePage });
        this.getProductList(ProductId, page);
    }

    render() {
        const { ActiveCategory, Items, Categories, TotalPages, ActivePage, SelectedProduct } = this.state;

        return (
            <Grid className="body-container">
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        {Categories.map(item =>
                            <Menu.Item
                                name={item.name}
                                key={item.itemId}
                                id={item.itemId}
                                disabled={item.itemId === SelectedProduct}
                                color="green"
                                active={ActiveCategory === item.name}
                                onClick={this.handleCategoryClick}
                            />
                        )}
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <ProductList Items={Items} />
                    <Divider horizontal></Divider>
                    <Grid centered>
                        <Grid.Row ce>
                            <Pagination activePage={ActivePage} pointing secondary totalPages={TotalPages} onPageChange={this.handlePageChange} />
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        )
    }
}

export default SideNavigation;