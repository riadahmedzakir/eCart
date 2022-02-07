import React from "react";
import { Divider, Grid, Icon } from "semantic-ui-react";


class ConfirmDetails extends React.Component {
    render() {
        const { FormController, SelectedPaymentMethod } = this.props;
        return (
            <div>
                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Personal Details</p>
                <p style={{ marginBottom: '5px' }}>First Name : {FormController.FirstName}</p>
                <p style={{ marginBottom: '5px' }}>Last Name : {FormController.LastName}</p>
                <p style={{ marginBottom: '5px' }}>Email : {FormController.Email}</p>
                <p>Mobile No : {FormController.Mobile}</p>

                <Divider />

                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Shipping Details</p>
                            <p style={{ marginBottom: '5px' }}>Street : {FormController.ShippingStreet}</p>
                            <p style={{ marginBottom: '5px' }}>Country : {FormController.ShippingCountry.title}</p>
                            <p style={{ marginBottom: '5px' }}>City : {FormController.ShippingCity.title}</p>
                            <p style={{ marginBottom: '5px' }}>State : {FormController.ShippingState.title}</p>
                            <p style={{ marginBottom: '5px' }}>Street : {FormController.ShippingStreet}</p>
                            <p style={{ marginBottom: '5px' }}>Zip : {FormController.ShippingZip}</p>
                            <p style={{ marginBottom: '5px' }}>House : {FormController.ShippingHouse}</p>
                            <p>Shipping Flat : {FormController.ShippingFlat}</p>
                        </Grid.Column>

                        <Grid.Column>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Billing Details</p>
                            <p style={{ marginBottom: '5px' }}>Street : {FormController.BillingStreet}</p>
                            <p style={{ marginBottom: '5px' }}>Country : {FormController.BillingCountry.title}</p>
                            <p style={{ marginBottom: '5px' }}>City : {FormController.BillingCity.title}</p>
                            <p style={{ marginBottom: '5px' }}>State : {FormController.BillingState.title}</p>
                            <p style={{ marginBottom: '5px' }}>Street : {FormController.BillingStreet}</p>
                            <p style={{ marginBottom: '5px' }}>Zip : {FormController.BillingZip}</p>
                            <p style={{ marginBottom: '5px' }}>House : {FormController.BillingHouse}</p>
                            <p>Billing Flat : {FormController.BillingFlat}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Divider />

                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Payment Method</p>
                <p style={{ marginBottom: '5px' }}>
                    {
                        SelectedPaymentMethod === "Cash" ?
                            <Icon name="money bill alternate outline" /> :
                            <Icon name="credit card" />
                    }

                    <span style={{ paddingLeft: '20px' }}>{SelectedPaymentMethod}</span>

                    {
                        SelectedPaymentMethod === "Cash" ?
                            <span> - Pay the delivery man upon recieving your order</span> :
                            <span> - Paying with card **** **** **** {FormController.CardNumber.slice(-4)} </span>
                    }
                </p>
            </div>
        )
    }
}

export default ConfirmDetails;