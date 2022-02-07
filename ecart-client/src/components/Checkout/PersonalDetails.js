import React from "react";
import { Image, Input } from 'semantic-ui-react';


class PersonalDetails extends React.Component {
    render() {
        const { FormController, CurrentPhoneCountry, handleForm, handlePhonenumber } = this.props;
        return (
            <div>
                <Input style={{ marginBottom: '10px' }} fluid icon="user" placeholder='First Name'
                    uniqueidentifier="FirstName" value={FormController.FirstName} onChange={handleForm} />

                <Input style={{ marginBottom: '10px' }} fluid icon="user" placeholder='Last Name'
                    uniqueidentifier="LastName" value={FormController.LastName} onChange={handleForm} />

                <Input type='email' style={{ marginBottom: '10px' }} fluid icon="mail" placeholder='Email'
                    uniqueidentifier="Email" value={FormController.Email} onChange={handleForm} />

                <Input className='flag-icons' onChange={handlePhonenumber} labelPosition='left'
                    label={{ content: <Image src={`country-flag/${CurrentPhoneCountry}-flag.jpg`} /> }}
                    fluid icon="phone" placeholder='Mobile No.' uniqueidentifier="Mobile" value={FormController.Mobile} />
            </div>
        )
    }
}

export default PersonalDetails;