import './../../App.css';

import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Container } from "semantic-ui-react";

import Navigation from "../Navigation/Navigation";

class Checkout extends React.Component {
    render() {
        return (
            <Container fluid>
                <Navigation />

                <Breadcrumb className='px-20'>
                    <Breadcrumb.Section>
                        <Link to={"/"}>Home</Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section>
                        <Link to={"/cart"}>Cart</Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section active>Checkout</Breadcrumb.Section>
                </Breadcrumb>
            </Container>
        )
    }
}

export default Checkout;