import './../../App.css';

import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Container, Divider, Grid, Icon, Segment, Step } from "semantic-ui-react";

import Navigation from "../Navigation/Navigation";
import parsePhoneNumber from 'libphonenumber-js';
import { Country, State, City } from 'country-state-city';
import creditCardType from "credit-card-type";
import PersonalDetails from './PersonalDetails';
import ShippingDetails from './ShippingDetails';
import BillingDetails from './BillingDetails';

class Checkout extends React.Component {
    state = {
        StepperController: {
            Details: true,
            Shipping: false,
            Billing: false,
            Confirm: false
        },
        StepperDisabledController: {
            Details: false,
            Shipping: false,
            Billing: true,
            Confirm: true
        },
        SearchResults: {
            ShippingCountryResult: [],
            ShippingCityResult: [],
            ShippingStateResult: [],
            BillingCountryResult: [],
            BillingCityResult: [],
            BillingStateResult: [],
        },
        CurrentPhoneCountry: 'ad',
        CurrentActiveStepper: 'Details',
        SelectedPaymentMethod: '',
        CardType: 'credit card',
        IsPreviousButtonVisible: false,
        IsNextButtonVisible: true,
        FormController: {
            FirstName: '',
            LastName: '',
            Email: '',
            Mobile: '',
            ShippingStreet: '',
            ShippingCountry: {
                title: '',
                code: ''
            },
            ShippingCity: {
                title: '',
                code: ''
            },
            ShippingState: {
                title: '',
                code: ''
            },
            ShippingZip: '',
            ShippingHouse: '',
            ShippingFlat: '',
            BillingSameAs: false,
            BillingStreet: '',
            BillingCountry: {
                title: '',
                code: ''
            },
            BillingCity: {
                title: '',
                code: ''
            },
            BillingState: {
                title: '',
                code: ''
            },
            BillingZip: '',
            BillingHouse: '',
            BillingFlat: '',
            CardHolderName: '',
            CardNumber: '',
            CardExpiryDate: '',
            CardSecret: ''
        },
        FormDisableController: {
            ShippingStreet: false,
            ShippingCountry: false,
            ShippingCity: true,
            ShippingState: true,
            ShippingZip: false,
            ShippingHouse: false,
            ShippingFlat: false,
            BillingStreet: false,
            BillingCountry: false,
            BillingCity: true,
            BillingState: true,
            BillingZip: false,
            BillingHouse: false,
            BillingFlat: false
        }
    }

    handleStepperClick = (event, { steppertype }) => {
        const { StepperController } = this.state;
        let { IsPreviousButtonVisible } = this.state;
        const types = Object.keys(StepperController);
        StepperController[steppertype] = true;
        types.forEach(type => {
            if (steppertype !== type) {
                StepperController[type] = false;
            }
        });

        if (steppertype === 'Details') {
            IsPreviousButtonVisible = false;
        } else {
            IsPreviousButtonVisible = true;
        }

        this.setState({ StepperController, CurrentActiveStepper: steppertype, IsPreviousButtonVisible });
    }

    handleNext = () => {
        const { StepperController, StepperDisabledController } = this.state;
        let { IsPreviousButtonVisible } = this.state;

        if (StepperController.Details) {
            StepperController.Details = false;
            StepperController.Shipping = true;
            IsPreviousButtonVisible = true;
        } else if (StepperController.Shipping) {
            StepperController.Shipping = false;
            StepperController.Billing = true;
            StepperDisabledController.Billing = false;
        } else if (StepperController.Billing) {
            StepperController.Billing = false;
            StepperController.Confirm = true;
            StepperDisabledController.Details = true;
            StepperDisabledController.Shipping = true;
            StepperDisabledController.Billing = true;
            StepperDisabledController.Confirm = false;
        }

        this.setState({ StepperController, IsPreviousButtonVisible });
    }

    handlePrevious = () => {
        const { StepperController, StepperDisabledController } = this.state;
        let { IsPreviousButtonVisible } = this.state;

        if (StepperController.Shipping) {
            StepperController.Details = true;
            StepperController.Shipping = false;
            IsPreviousButtonVisible = false;
        } else if (StepperController.Billing) {
            StepperController.Shipping = true;
            StepperController.Billing = false;
        } else if (StepperController.Confirm) {
            StepperController.Confirm = false;
            StepperController.Billing = true;
            StepperDisabledController.Details = false;
            StepperDisabledController.Shipping = false;
            StepperDisabledController.Billing = false;
            StepperDisabledController.Confirm = true;
        }

        this.setState({ StepperController, IsPreviousButtonVisible });
    }

    handlePhonenumber = (event) => {
        const { FormController } = this.state;
        const phoneNumber = parsePhoneNumber(event.target.value);
        FormController.Mobile = event.target.value;

        if (phoneNumber) {
            this.setState({ CurrentPhoneCountry: phoneNumber.country, FormController: FormController });
        } else {
            this.setState({ FormController: FormController });
        }
    }

    handleCountry = (event, data) => {
        const { SearchResults, FormController } = this.state;
        const allCountry = Country.getAllCountries();
        const countryList = allCountry.filter((country) => country.name.toLowerCase().includes(data.value.toLowerCase()));
        SearchResults[data.uniqueidentifier + 'Result'] = countryList.map(country => ({ title: country.name, code: country.isoCode }));
        FormController[data.uniqueidentifier] = data.value;
        this.setState({ SearchResults, FormController });
    }

    handleState = (event, data) => {
        const { SearchResults, FormController } = this.state;
        const allState = State.getStatesOfCountry(FormController[data.uniqueidentifier.replace('State', 'Country')].code);
        const stateList = allState.filter((state) => state.name.toLowerCase().includes(data.value.toLowerCase()));
        SearchResults[data.uniqueidentifier + 'Result'] = stateList.map(state => ({ title: state.name, code: state.isoCode }));
        FormController[data.uniqueidentifier] = data.value;
        this.setState({ SearchResults });
    }

    handleCity = (event, data) => {
        const { SearchResults, FormController } = this.state;
        const allCity = City.getCitiesOfState(FormController[data.uniqueidentifier.replace('City', 'Country')].code, FormController[data.uniqueidentifier.replace('City', 'State')].code);
        const cityList = allCity.filter((city) => city.name.toLowerCase().includes(data.value.toLowerCase()));
        SearchResults[data.uniqueidentifier + 'Result'] = cityList.map(city => ({ title: city.name }));
        FormController[data.uniqueidentifier] = data.value;
        this.setState({ SearchResults });
    }

    handleForm = (event, data) => {
        const { FormController } = this.state;
        FormController[data.uniqueidentifier] = data.value;
        this.setState({ FormController });
    }

    handleSelectResult = (event, data) => {
        const { FormController, FormDisableController } = this.state;
        FormController[data.uniqueidentifier] = data.result;

        if (data.uniqueidentifier.includes('Country')) {
            FormDisableController[data.uniqueidentifier.replace('Country', 'State')] = false;
        }

        if (data.uniqueidentifier.includes('State')) {
            FormDisableController[data.uniqueidentifier.replace('State', 'City')] = false;
        }

        this.setState({ FormController, FormDisableController });
    }

    handlePaymentMethod = (event, data) => {
        let { SelectedPaymentMethod } = this.state;
        SelectedPaymentMethod = data.uniqueidentifier;
        this.setState({ SelectedPaymentMethod });
    }

    handleCreditCard = (event, data) => {
        const { FormController } = this.state;

        if (data.value === "") {
            FormController[data.uniqueidentifier] = "";
            this.setState({ FormController });
            return;
        }

        var cardNumber = data.value.replace(/ /g, "");
        if (isNaN(parseInt(cardNumber))) { return; }

        let { CardType } = this.setState;
        const CardMap = {
            [creditCardType.types.VISA]: "cc visa",
            [creditCardType.types.MASTERCARD]: "cc mastercard",
            [creditCardType.types.AMERICAN_EXPRESS]: "cc mastercard",
            [creditCardType.types.DINERS_CLUB]: "cc diners club",
            [creditCardType.types.DISCOVER]: "cc discover",
            [creditCardType.types.JCB]: "cc jcb"
        }

        var card = creditCardType(cardNumber);
        if (card) {
            CardType = (CardMap[card[0].type]) ? CardMap[card[0].type] : "credit card";
            card[0].gaps.forEach((gap, index) => {
                if (cardNumber.length > gap) {
                    cardNumber = [cardNumber.slice(0, gap + index), " ", cardNumber.slice(gap + index)].join('');
                }
            });


            FormController[data.uniqueidentifier] = cardNumber;
        }
        this.setState({ FormController, CardType });
    }

    handleExpiry = (event, data) => {
        const { FormController } = this.state;

        if (event.nativeEvent.inputType === "deleteContentBackward") {
            FormController[data.uniqueidentifier] = data.value;
            this.setState({ FormController });
            return;
        }

        if (data.value === "") {
            FormController[data.uniqueidentifier] = "";
            this.setState({ FormController });
            return;
        }

        const expiry = data.value.replace("/", "");
        if (isNaN(parseInt(expiry))) { return; }
        if (expiry.length > 1) {
            FormController[data.uniqueidentifier] = data.value;
        } else {
            if (expiry > 1) {
                FormController[data.uniqueidentifier] = `0${expiry}/`;
            } else if (expiry === 1) {
                FormController[data.uniqueidentifier] = data.value;
            }
        }

        this.setState({ FormController });
    }

    handleSameAsShipping = (event, data) => {
        const { FormController, FormDisableController } = this.state;
        if (!data.checked) {
            FormController.BillingStreet = '';
            FormController.BillingCountry = {
                title: '',
                code: ''
            };
            FormController.BillingCity = {
                title: '',
                code: ''
            };
            FormController.BillingState = {
                title: '',
                code: ''
            };
            FormController.BillingZip = '';
            FormController.BillingHouse = '';
            FormController.BillingFlat = '';

            FormDisableController.BillingStreet = false;
            FormDisableController.BillingCountry = false;
            FormDisableController.BillingZip = false;
            FormDisableController.BillingHouse = false;
            FormDisableController.BillingFlat = false;
        } else {
            FormController.BillingStreet = FormController.ShippingStreet;
            FormController.BillingCountry = FormController.ShippingCountry;
            FormController.BillingCity = FormController.ShippingCity;
            FormController.BillingState = FormController.ShippingState;
            FormController.BillingZip = FormController.ShippingZip;
            FormController.BillingHouse = FormController.ShippingHouse;
            FormController.BillingFlat = FormController.ShippingFlat;

            FormDisableController.BillingStreet = true;
            FormDisableController.BillingCountry = true;
            FormDisableController.BillingCity = true;
            FormDisableController.BillingState = true;
            FormDisableController.BillingZip = true;
            FormDisableController.BillingHouse = true;
            FormDisableController.BillingFlat = true;
        }

        FormController.BillingSameAs = data.checked;
        this.setState({ FormController, FormDisableController });
    }

    generateForm = () => {
        const { StepperController, CurrentPhoneCountry, SearchResults, FormController, FormDisableController, SelectedPaymentMethod, CardType } = this.state;

        if (StepperController.Details) {
            return <PersonalDetails FormController={FormController} CurrentPhoneCountry={CurrentPhoneCountry} handleForm={this.handleForm}
                handlePhonenumber={this.handlePhonenumber} />
        }

        if (StepperController.Shipping) {
            return <ShippingDetails FormController={FormController} FormDisableController={FormDisableController} SearchResults={SearchResults}
                handleForm={this.handleForm} handleSelectResult={this.handleSelectResult} handleCountry={this.handleCountry} handleState={this.handleState}
                handleCity={this.handleCity} />
        }

        if (StepperController.Billing) {
            return <BillingDetails SearchResults={SearchResults} FormController={FormController} FormDisableController={FormDisableController}
                SelectedPaymentMethod={SelectedPaymentMethod} CardType={CardType} handleSameAsShipping={this.handleSameAsShipping} handleForm={this.handleForm}
                handleSelectResult={this.handleSelectResult} handleCountry={this.handleCountry} handleState={this.handleState} handleCity={this.handleCity}
                handlePaymentMethod={this.handlePaymentMethod} handleCreditCard={this.handleCreditCard} handleExpiry={this.handleExpiry} />
        }
    }

    render() {
        const { StepperController, StepperDisabledController, IsPreviousButtonVisible, IsNextButtonVisible } = this.state;
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
                                <Step steppertype={"Details"} active={StepperController.Details} disabled={StepperDisabledController.Details}
                                    onClick={this.handleStepperClick}>
                                    <Icon name='user circle' />
                                    <Step.Content>
                                        <Step.Title>Personal Details</Step.Title>
                                        <Step.Description></Step.Description>
                                    </Step.Content>
                                </Step>
                                <Step steppertype={"Shipping"} active={StepperController.Shipping} disabled={StepperDisabledController.Shipping}
                                    onClick={this.handleStepperClick}>
                                    <Icon name='truck' />
                                    <Step.Content>
                                        <Step.Title>Shipping</Step.Title>
                                        <Step.Description>Choose your shipping options</Step.Description>
                                    </Step.Content>
                                </Step>

                                <Step steppertype={"Billing"} active={StepperController.Billing} disabled={StepperDisabledController.Billing}
                                    onClick={this.handleStepperClick}>
                                    <Icon name='payment' />
                                    <Step.Content>
                                        <Step.Title>Billing</Step.Title>
                                        <Step.Description>Enter billing information</Step.Description>
                                    </Step.Content>
                                </Step>

                                <Step steppertype={"Confirm"} active={StepperController.Confirm} disabled={StepperDisabledController.Confirm}
                                    onClick={this.handleStepperClick}>
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
                                        <Grid.Column width={6}>
                                            <Segment placeholder>

                                            </Segment>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={10}></Grid.Column>
                                        <Grid.Column width={6} textAlign='right'>
                                            {
                                                (IsPreviousButtonVisible) ?
                                                    <Button onClick={this.handlePrevious} size='medium' color='red'>
                                                        {(StepperController.Confirm) ? 'Modify' : 'Previous'}
                                                    </Button> : ''
                                            }

                                            {
                                                (IsNextButtonVisible) ?
                                                    <Button size='medium' color='green' onClick={this.handleNext}>
                                                        {(StepperController.Details) ? 'Next' : ''}
                                                        {(StepperController.Shipping) ? 'Confirm' : ''}
                                                        {(StepperController.Billing) ? 'Finish' : ''}
                                                        {(StepperController.Confirm) ? 'Proceed And Pay' : ''}
                                                    </Button> : ''
                                            }
                                        </Grid.Column>
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