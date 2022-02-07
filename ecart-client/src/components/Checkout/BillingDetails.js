import React from "react";
import { Button, Checkbox, Divider, Grid, Icon, Input, Search } from 'semantic-ui-react';


class BillingDetails extends React.Component {
    render() {
        const { SearchResults, FormController, FormDisableController, SelectedPaymentMethod, CardType,
            handleSameAsShipping, handleForm, handleSelectResult, handleCountry, handleState, handleCity, handlePaymentMethod, handleCreditCard, handleExpiry } = this.props;
        return (
            <div>
                <Checkbox style={{ marginBottom: '10px' }} label='Same as shipping' onChange={handleSameAsShipping}
                    checked={FormController.BillingSameAs} />

                <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Street'
                    uniqueidentifier="BillingStreet" value={FormController.BillingStreet} onChange={handleForm}
                    disabled={FormDisableController.BillingStreet} />

                <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.BillingCountryResult}
                    icon="location arrow" uniqueidentifier="BillingCountry" placeholder="Country" onSearchChange={handleCountry}
                    onResultSelect={handleSelectResult} value={FormController.BillingCountry.title}
                    disabled={FormDisableController.BillingCountry} />

                <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.BillingStateResult}
                    icon="location arrow" uniqueidentifier="BillingState" placeholder="State" onSearchChange={handleState}
                    onResultSelect={handleSelectResult} value={FormController.BillingState.title}
                    disabled={FormDisableController.BillingState} />

                <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.BillingCityResult}
                    icon="location arrow" uniqueidentifier="BillingCity" placeholder="City" onSearchChange={handleCity}
                    onResultSelect={handleSelectResult} value={FormController.BillingCity.title}
                    disabled={FormDisableController.BillingCity} />

                <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Zip'
                    uniqueidentifier="BillingZip" value={FormController.BillingZip} onChange={handleForm}
                    disabled={FormDisableController.BillingZip} />

                <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='House name (Optional)'
                    uniqueidentifier="BillingHouse" value={FormController.BillingHouse} onChange={handleForm}
                    disabled={FormDisableController.BillingHouse} />

                <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='Flat no. (Optional)'
                    uniqueidentifier="BillingFlat" value={FormController.BillingFlat} onChange={handleForm}
                    disabled={FormDisableController.BillingFlat} />

                <p style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>Payment Methods</p>
                <Divider />

                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Button uniqueidentifier="Cash" toggle icon active={SelectedPaymentMethod === 'Cash'}
                                onClick={handlePaymentMethod}>
                                <Icon color={SelectedPaymentMethod === 'Cash' ? null : 'black'} name='money bill alternate outline' />
                            </Button>
                        </Grid.Column>

                        <Grid.Column>
                            <Button uniqueidentifier="Card" toggle icon active={SelectedPaymentMethod === 'Card'}
                                onClick={handlePaymentMethod}>
                                <Icon color={SelectedPaymentMethod === 'Card' ? null : 'black'} name='credit card' />
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {
                    (SelectedPaymentMethod === 'Cash') ?
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <p style={{ fontWeight: 'bold', marginBottom: '0px' }}>PAY BY CASH</p>
                                    <p style={{ fontSize: '12px', color: '#a5a7a8' }}>Consider payment upon ordering for contactless delivery. You can't pay by a card to the rider upon delivery.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid> : ''
                }

                {
                    (SelectedPaymentMethod === 'Card') ?
                        <Grid columns={1}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input style={{ marginBottom: '10px' }} fluid icon="user" placeholder='Cardholders Name'
                                        uniqueidentifier="CardHolderName" value={FormController.CardHolderName} onChange={handleForm}
                                    />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                    <Grid columns={3}>
                                        <Grid.Row>
                                            <Grid.Column width={10}>
                                                <Input style={{ marginBottom: '10px' }} fluid icon={CardType} placeholder='Card Number'
                                                    uniqueidentifier="CardNumber" value={FormController.CardNumber} onChange={handleCreditCard}
                                                />
                                            </Grid.Column>

                                            <Grid.Column width={3}>
                                                <Input style={{ marginBottom: '10px' }} fluid placeholder='Expiry Date'
                                                    uniqueidentifier="CardExpiryDate" value={FormController.CardExpiryDate} maxLength={5} onChange={handleExpiry}
                                                />
                                            </Grid.Column>

                                            <Grid.Column width={3}>
                                                <Input style={{ marginBottom: '10px' }} fluid placeholder='CCV/CCV'
                                                    uniqueidentifier="CardSecret" value={FormController.CardSecret} onChange={handleForm}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid> : ''
                }
            </div>
        )
    }
}

export default BillingDetails;