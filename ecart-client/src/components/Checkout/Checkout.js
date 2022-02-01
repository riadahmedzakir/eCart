import './../../App.css';

import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Checkbox, Container, Divider, Grid, Icon, Image, Input, Search, Segment, Step } from "semantic-ui-react";

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
        IsPreviousButtonVisible: false,
        IsNextButtonVisible: true,
        Form: {
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
            BillingFlat: ''
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
        const { Form } = this.state;
        const phoneNumber = parsePhoneNumber(event.target.value);
        Form.Mobile = event.target.value;

        if (phoneNumber) {
            this.setState({ CurrentPhoneCountry: phoneNumber.country, Form: Form });
        } else {
            this.setState({ Form: Form });
        }
    }

    handleCountry = (event, data) => {
        const { SearchResults, Form } = this.state;
        const allCountry = Country.getAllCountries();
        const countryList = allCountry.filter((country) => country.name.toLowerCase().includes(data.value.toLowerCase()));
        SearchResults[data.uniqueidentifier + 'Result'] = countryList.map(country => ({ title: country.name, code: country.isoCode }));
        Form[data.uniqueidentifier] = data.value;
        this.setState({ SearchResults, Form });
    }

    handleState = (event, data) => {
        const { SearchResults, Form } = this.state;
        const allState = State.getStatesOfCountry(Form[data.uniqueidentifier.replace('State', 'Country')].code);
        const stateList = allState.filter((state) => state.name.toLowerCase().includes(data.value.toLowerCase()));
        SearchResults[data.uniqueidentifier + 'Result'] = stateList.map(state => ({ title: state.name, code: state.isoCode }));
        Form[data.uniqueidentifier] = data.value;
        this.setState({ SearchResults });
    }

    handleCity = (event, data) => {
        const { SearchResults, Form } = this.state;
        const allCity = City.getCitiesOfState(Form[data.uniqueidentifier.replace('City', 'Country')].code, Form[data.uniqueidentifier.replace('City', 'State')].code);
        const cityList = allCity.filter((city) => city.name.toLowerCase().includes(data.value.toLowerCase()));
        SearchResults[data.uniqueidentifier + 'Result'] = cityList.map(city => ({ title: city.name }));
        Form[data.uniqueidentifier] = data.value;
        this.setState({ SearchResults });
    }

    handleForm = (event, data) => {
        const { Form } = this.state;
        Form[data.uniqueidentifier] = data.value;
        this.setState({ Form });
    }

    handleSelectResult = (event, data) => {
        const { Form, FormDisableController } = this.state;
        Form[data.uniqueidentifier] = data.result;

        if (data.uniqueidentifier.includes('Country')) {
            FormDisableController[data.uniqueidentifier.replace('Country', 'State')] = false;
        }

        if (data.uniqueidentifier.includes('State')) {
            FormDisableController[data.uniqueidentifier.replace('State', 'City')] = false;
        }

        this.setState({ Form, FormDisableController });
    }

    handleSameAsShipping = (event, data) => {
        const { Form, FormDisableController } = this.state;
        if (!data.checked) {
            Form.BillingStreet = '';
            Form.BillingCountry = {
                title: '',
                code: ''
            };
            Form.BillingCity = {
                title: '',
                code: ''
            };
            Form.BillingState = {
                title: '',
                code: ''
            };
            Form.BillingZip = '';
            Form.BillingHouse = '';
            Form.BillingFlat = '';

            FormDisableController.BillingStreet = false;
            FormDisableController.BillingCountry = false;
            FormDisableController.BillingZip = false;
            FormDisableController.BillingHouse = false;
            FormDisableController.BillingFlat = false;
        } else {
            Form.BillingStreet = Form.ShippingStreet;
            Form.BillingCountry = Form.ShippingCountry;
            Form.BillingCity = Form.ShippingCity;
            Form.BillingState = Form.ShippingState;
            Form.BillingZip = Form.ShippingZip;
            Form.BillingHouse = Form.ShippingHouse;
            Form.BillingFlat = Form.ShippingFlat;

            FormDisableController.BillingStreet = true;
            FormDisableController.BillingCountry = true;
            FormDisableController.BillingCity = true;
            FormDisableController.BillingState = true;
            FormDisableController.BillingZip = true;
            FormDisableController.BillingHouse = true;
            FormDisableController.BillingFlat = true;
        }

        Form.BillingSameAs = data.checked;
        this.setState({ Form, FormDisableController });
    }

    generateForm = () => {
        const { StepperController, CurrentPhoneCountry, SearchResults, Form, FormDisableController } = this.state;

        if (StepperController.Details) {
            return (
                <div>
                    <Input style={{ marginBottom: '10px' }} fluid icon="user" placeholder='First Name'
                        uniqueidentifier="FirstName" value={Form.FirstName} onChange={this.handleForm} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="user" placeholder='Last Name'
                        uniqueidentifier="LastName" value={Form.LastName} onChange={this.handleForm} />

                    <Input type='email' style={{ marginBottom: '10px' }} fluid icon="mail" placeholder='Email'
                        uniqueidentifier="Email" value={Form.Email} onChange={this.handleForm} />

                    <Input className='flag-icons' onChange={this.handlePhonenumber} labelPosition='left'
                        label={{ content: <Image src={`country-flag/${CurrentPhoneCountry}-flag.jpg`} /> }}
                        fluid icon="phone" placeholder='Mobile No.' uniqueidentifier="Mobile" value={Form.Mobile} />
                </div>
            )
        }

        if (StepperController.Shipping) {
            return (
                <div>
                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Street'
                        uniqueidentifier="ShippingStreet" value={Form.ShippingStreet} onChange={this.handleForm} />

                    <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.ShippingCountryResult}
                        icon="location arrow" uniqueidentifier="ShippingCountry" placeholder="Country" onSearchChange={this.handleCountry}
                        onResultSelect={this.handleSelectResult} value={Form.ShippingCountry.title} />

                    <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.ShippingStateResult}
                        icon="location arrow" uniqueidentifier="ShippingState" placeholder="State" onSearchChange={this.handleState}
                        onResultSelect={this.handleSelectResult} value={Form.ShippingState.title} disabled={FormDisableController.ShippingState} />

                    <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.ShippingCityResult}
                        icon="location arrow" uniqueidentifier="ShippingCity" placeholder="City" onSearchChange={this.handleCity}
                        onResultSelect={this.handleSelectResult} value={Form.ShippingCity.title} disabled={FormDisableController.ShippingCity} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Zip'
                        uniqueidentifier="ShippingZip" value={Form.ShippingZip} onChange={this.handleForm} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='House name (Optional)'
                        uniqueidentifier="ShippingHouse" value={Form.ShippingHouse} onChange={this.handleForm} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='Flat no. (Optional)'
                        uniqueidentifier="ShippingFlat" value={Form.ShippingFlat} onChange={this.handleForm} />
                </div>
            )
        }

        if (StepperController.Billing) {
            return (
                <div>
                    <Checkbox style={{ marginBottom: '10px' }} label='Same as shipping' onChange={this.handleSameAsShipping}
                        checked={Form.BillingSameAs} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Street'
                        uniqueidentifier="BillingStreet" value={Form.BillingStreet} onChange={this.handleForm}
                        disabled={FormDisableController.BillingStreet} />

                    <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.BillingCountryResult}
                        icon="location arrow" uniqueidentifier="BillingCountry" placeholder="Country" onSearchChange={this.handleCountry}
                        onResultSelect={this.handleSelectResult} value={Form.BillingCountry.title}
                        disabled={FormDisableController.BillingCountry} />

                    <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.BillingStateResult}
                        icon="location arrow" uniqueidentifier="BillingState" placeholder="State" onSearchChange={this.handleState}
                        onResultSelect={this.handleSelectResult} value={Form.BillingState.title}
                        disabled={FormDisableController.BillingState} />

                    <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.BillingCityResult}
                        icon="location arrow" uniqueidentifier="BillingCity" placeholder="City" onSearchChange={this.handleCity}
                        onResultSelect={this.handleSelectResult} value={Form.BillingCity.title}
                        disabled={FormDisableController.BillingCity} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Zip'
                        uniqueidentifier="BillingZip" value={Form.BillingZip} onChange={this.handleForm}
                        disabled={FormDisableController.BillingZip} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='House name (Optional)'
                        uniqueidentifier="BillingHouse" value={Form.BillingHouse} onChange={this.handleForm}
                        disabled={FormDisableController.BillingHouse} />

                    <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='Flat no. (Optional)'
                        uniqueidentifier="BillingFlat" value={Form.BillingFlat} onChange={this.handleForm}
                        disabled={FormDisableController.BillingFlat} />

                    <p>Payment Methods</p>
                </div>
            )
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