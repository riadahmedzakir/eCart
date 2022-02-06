import './../../App.css';

import React from "react";
import { Input, Search } from 'semantic-ui-react';


class ShippingDetails extends React.Component {
    state = {}

    render() {
        const { FormController, FormDisableController, SearchResults, handleForm, handleSelectResult, handleCountry, handleState, handleCity } = this.props;
        return (
            <div>
                <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Street'
                    uniqueidentifier="ShippingStreet" value={FormController.ShippingStreet} onChange={handleForm} />

                <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.ShippingCountryResult}
                    icon="location arrow" uniqueidentifier="ShippingCountry" placeholder="Country" onSearchChange={handleCountry}
                    onResultSelect={handleSelectResult} value={FormController.ShippingCountry.title} />

                <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.ShippingStateResult}
                    icon="location arrow" uniqueidentifier="ShippingState" placeholder="State" onSearchChange={handleState}
                    onResultSelect={handleSelectResult} value={FormController.ShippingState.title} disabled={FormDisableController.ShippingState} />

                <Search className='search-input' fluid style={{ marginBottom: '10px' }} results={SearchResults.ShippingCityResult}
                    icon="location arrow" uniqueidentifier="ShippingCity" placeholder="City" onSearchChange={handleCity}
                    onResultSelect={handleSelectResult} value={FormController.ShippingCity.title} disabled={FormDisableController.ShippingCity} />

                <Input style={{ marginBottom: '10px' }} fluid icon="location arrow" placeholder='Zip'
                    uniqueidentifier="ShippingZip" value={FormController.ShippingZip} onChange={handleForm} />

                <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='House name (Optional)'
                    uniqueidentifier="ShippingHouse" value={FormController.ShippingHouse} onChange={handleForm} />

                <Input style={{ marginBottom: '10px' }} fluid icon="home" placeholder='Flat no. (Optional)'
                    uniqueidentifier="ShippingFlat" value={FormController.ShippingFlat} onChange={handleForm} />
            </div>
        )
    }
}

export default ShippingDetails;