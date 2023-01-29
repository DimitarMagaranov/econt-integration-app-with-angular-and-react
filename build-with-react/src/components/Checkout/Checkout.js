import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { createLabelDocument } from '../../utils/label';
import CheckoutSelectedProduct from '../CheckoutSelectedProduct/CheckoutSelectedProduct';
import SelectedOfficeInfo from '../SelectedOfficeInfo/SelectedOfficeInfo';
import CityList from '../CityList/CityList';

import * as econtService from '../../services/econtService';

const Checkout = () => {
    const location = useLocation();

    const [selectedCity, setCity] = useState(0);
    const [selectedOffice, setOffice] = useState(null);
    const [selectedProduct, setProduct] = useState(location.state);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [label, setLabel] = useState({});
    const [shipmentNumber, setShipmentNumber] = useState(0);
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
    const [labelStatus, setLabelStatus] = useState('');

    const onCheckoutSubmitHandler = () => {};

    const validateLabel = (e) => {
        e.preventDefault();

        const recipient = {
            name: e.target.name.value,
            phones: [e.target.phoneNumber.value]
        };

        const label = createLabelDocument(recipient, selectedOffice, selectedProduct);
        setLabel(() => label);

        econtService.createOrValidateLabel(label, 'validate')
        .then(data => {
            setDeliveryPrice(() => Number(data.label.totalPrice),
            setTotalPrice(Number(selectedProduct.selectedCut.price) + Number(data.label.totalPrice)));
        })
    }

    const createLabel = () => {
        econtService.createOrValidateLabel(label, 'create')
        .then(data => setShipmentNumber(data.label.shipmentNumber));
    }

    const getShipmentStatus = () => {
        econtService.getShipmentStatus(shipmentNumber)
        .then(data => {
            const expectedDeliveryDate = new Date(data.shipmentStatuses[0].status.expectedDeliveryDate);
            setExpectedDeliveryDate(() => `${expectedDeliveryDate.getDate()}/${expectedDeliveryDate.getMonth() + 1}/${expectedDeliveryDate.getFullYear()}`);
            setLabelStatus(() => data.shipmentStatuses[0].status.trackingEvents[0].destinationDetailsEn);
        })
    }

    return (
        <div className="checkout-ctr">
            <div className="select-location-dropdowns">
                <form onSubmit={onCheckoutSubmitHandler}>
                    <CityList setCity={setCity} selectedCity={selectedCity} setOffice={setOffice} />
                </form>
                <SelectedOfficeInfo selectedOffice={selectedOffice} />
            </div>
            <CheckoutSelectedProduct selectedProduct={selectedProduct} totalPrice={totalPrice} deliveryPrice={deliveryPrice} />

            {selectedOffice ? (
                <div className="recipient-data-ctr">
                    <h2>Recipient details</h2>
                    <form onSubmit={validateLabel}>
                        <fieldset>
                            <label htmlFor="name"></label>
                            <input type="text" name="name" id="name" placeholder="Name" />
                    
                            <label htmlFor="phoneNumber"></label>
                            <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone number" />
                    
                            <button>Calculate delivery price</button>
                        </fieldset>
                    </form>
                    {deliveryPrice > 0 && (<button id="order-btn" onClick={createLabel}>Order</button> )}
                    {shipmentNumber > 0 && (<button id="order-btn" onClick={getShipmentStatus}>Get shipment status</button>)}
                    {labelStatus && (<h3>{labelStatus} and the expected delivery date is {expectedDeliveryDate}.</h3>)}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Checkout;
