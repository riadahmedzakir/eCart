import React from "react";

class ProductList extends React.Component {
    render() {
        const { Items } = this.props;

        console.log(Items);
        return (
            <React.Fragment>
                {
                    Items && Items.length ?
                        <p>Has item</p> :
                        <p>No item</p>
                }
            </React.Fragment>
        )
    }
}

export default ProductList;