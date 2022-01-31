import './../../App.css';

import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Checkbox, Container, Divider, Grid, Icon, Image, Input, Search, Segment, Step } from "semantic-ui-react";

import Navigation from "../Navigation/Navigation";
import parsePhoneNumber from 'libphonenumber-js';
import { Country, State, City } from 'country-state-city';

class Checkout extends React.Component {
    state = {
        StepperController: {
            Details: true,
            Shipping: false,
            Billing: false,
            Confirm: false
        },
        ConfirmOrderDisabled: true,
        CurrentCountry: 'ad'
    }

    componentDidMount() {

    }

    handleStepperClick = (event, { steppertype }) => {
        const { StepperController } = this.state;
        const types = Object.keys(StepperController);
        StepperController[steppertype] = true;
        types.forEach(type => {
            if (steppertype !== type) {
                StepperController[type] = false;
            }
        });

        this.setState({ StepperController });
    }

    handlePhonenumber = (event) => {
        const phoneNumber = parsePhoneNumber(event.target.value);
        console.log(phoneNumber);
        if (phoneNumber) {
            this.setState({ CurrentCountry: phoneNumber.country });
        }
    }

    handleCountry = (event, data) => {
        const allCountry = Country.getAllCountries();
        const country = allCountry.filter((country) => country.name.toLowerCase().includes(data.value));
        console.log(country);
        return country;
    }

    test = () => {
        return <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Country' onChange={this.handleCountry} />
    }

    generateForm = () => {
        const { StepperController, CurrentCountry } = this.state;

        if (StepperController.Details) {
            return (
                <div>
                    <Input style={{ marginBottom: '10px' }} fluid icon="user" placeholder='First Name' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="user" placeholder='Last Name' />
                    <Input type='email' style={{ marginBottom: '10px' }} fluid icon="mail" placeholder='Email Name' />
                    <Input className='flag-icons' onChange={this.handlePhonenumber} labelPosition='left'
                        label={{ content: <Image src={`country-flag/${CurrentCountry}-flag.jpg`} /> }}
                        fluid icon="phone" placeholder='Mobile No.' />
                </div>
            )
        }


        if (StepperController.Shipping) {
            return (
                <div>
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Street' />
                    <Search as={this.test} style={{ marginBottom: '10px' }} />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='City' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='State' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Zip' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='House name (Optional)' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='Flat no. (Optional)' />
                </div>
            )
        }

        if (StepperController.Billing) {
            return (
                <div>
                    <Checkbox style={{ marginBottom: '10px' }} label='Same as shipping' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Street' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Country' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='City' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='State' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Zip' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='House name (Optional)' />
                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='Flat no. (Optional)' />

                    <p>Payment Methods</p>
                </div>
            )
        }
    }

    render() {
        const { StepperController, ConfirmOrderDisabled } = this.state;
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

                <Divider />


                <Grid columns={3} centered>
                    <Grid.Row>
                        <Grid.Column width={1}></Grid.Column>

                        <Grid.Column width={14}>
                            <Step.Group widths={4} attached='top'>
                                <Step steppertype={"Details"} active={StepperController.Details} onClick={this.handleStepperClick}>
                                    <Icon name='user circle' />
                                    <Step.Content>
                                        <Step.Title>Personal Details</Step.Title>
                                        <Step.Description></Step.Description>
                                    </Step.Content>
                                </Step>
                                <Step steppertype={"Shipping"} active={StepperController.Shipping} onClick={this.handleStepperClick}>
                                    <Icon name='truck' />
                                    <Step.Content>
                                        <Step.Title>Shipping</Step.Title>
                                        <Step.Description>Choose your shipping options</Step.Description>
                                    </Step.Content>
                                </Step>

                                <Step steppertype={"Billing"} active={StepperController.Billing} onClick={this.handleStepperClick}>
                                    <Icon name='payment' />
                                    <Step.Content>
                                        <Step.Title>Billing</Step.Title>
                                        <Step.Description>Enter billing information</Step.Description>
                                    </Step.Content>
                                </Step>

                                <Step steppertype={"Confirm"} active={StepperController.Confirm} disabled={ConfirmOrderDisabled} onClick={this.handleStepperClick}>
                                    <Icon name='info' />
                                    <Step.Content>
                                        <Step.Title>Confirm Order</Step.Title>
                                    </Step.Content>
                                </Step>
                            </Step.Group>
                            <Segment attached>
                                <Grid columns={2}>
                                    <Grid.Row>
                                        <Grid.Column width={10}>
                                            {
                                                this.generateForm()
                                            }
                                        </Grid.Column>
                                        <Grid.Column width={6}>ff</Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>

                        </Grid.Column>

                        <Grid.Column width={1}></Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        )
    }
}

export default Checkout;