import React, { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { createLabelDocument } from '../../utils/label';
import CheckoutSelectedProduct from '../CheckoutSelectedProduct/CheckoutSelectedProduct';
import SelectedOfficeInfo from '../SelectedOfficeInfo/SelectedOfficeInfo';
import CityList from '../CityList/CityList';

import * as econtService from '../../services/econtService';
import { IOffice } from '../../interfaces/office';
import { ILabel } from '../../interfaces/label';
import { IProduct } from '../../interfaces/product';
import OfficeList from '../OfficeList/OfficeList';

import Stack from '@mui/material/Stack';
import { Box, Button, TextField, Typography } from '@mui/material';

interface CustomElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    phoneNumber: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}

const Checkout = () => {
    const location = useLocation();

    const [selectedCity, setCity] = useState(0);
    const [selectedOffice, setOffice] = useState({} as IOffice);
    const [selectedProduct, setProduct] = useState(location.state as IProduct);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [label, setLabel] = useState({} as ILabel);
    const [shipmentNumber, setShipmentNumber] = useState(0);
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
    const [labelStatus, setLabelStatus] = useState('');

    const validateLabel = (e: React.FormEvent<CustomForm>) => {
        e.preventDefault();

        const target = e.currentTarget.elements;

        const recipient = {
            name: target.name.value,
            phones: [target.phoneNumber.value],
        };

        const label = createLabelDocument(recipient, selectedOffice!, selectedProduct) as unknown as ILabel;
        setLabel(() => label);

        econtService.createOrValidateLabel(label, 'validate').then((data) => {
            setDeliveryPrice(() => Number(data.label.totalPrice));
            setTotalPrice(Number(selectedProduct.selectedCut!.price) + Number(data.label.totalPrice));
        });
    };

    const createLabel = () => {
        econtService.createOrValidateLabel(label, 'create').then((data) => setShipmentNumber(data.label.shipmentNumber));
    };

    const getShipmentStatus = () => {
        econtService.getShipmentStatus(shipmentNumber).then((data) => {
            const expectedDeliveryDate = new Date(data.shipmentStatuses[0].status.expectedDeliveryDate);
            setExpectedDeliveryDate(
                () => `${expectedDeliveryDate.getDate()}/${expectedDeliveryDate.getMonth() + 1}/${expectedDeliveryDate.getFullYear()}`
            );
            setLabelStatus(() => data.shipmentStatuses[0].status.trackingEvents[0].destinationDetailsEn);
        });
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '50px' }}>
                <div>
                    <Stack spacing={2} width="500px" margin="20px auto">
                        <CityList setCity={setCity} />
                        <OfficeList setOffice={setOffice} selectedCity={selectedCity} />
                    </Stack>
                    <SelectedOfficeInfo selectedOffice={selectedOffice} />
                </div>
                <CheckoutSelectedProduct selectedProduct={selectedProduct} totalPrice={totalPrice} deliveryPrice={deliveryPrice} />
            </Box>

            {selectedOffice.name && (
                <div>
                    <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '10px' }}>
                        Recipient details:
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="on"
                        onSubmit={validateLabel}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}
                    >
                        <TextField id="name" label="Name" />
                        <TextField id="phoneNumber" label="Phone number" />
                        <Button type="submit" variant="contained" color="success">
                            <Typography>Calculate delivery price</Typography>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {deliveryPrice > 0 && (
                            <Button onClick={createLabel} variant="contained" color="success" sx={{ marginBottom: '20px' }}>
                                <Typography>Order</Typography>
                            </Button>
                        )}
                        {shipmentNumber > 0 && (
                            <Button sx={{ marginBottom: '20px' }} onClick={getShipmentStatus} variant="contained" color="success">
                                <Typography>Get shipment status</Typography>
                            </Button>
                        )}
                        {labelStatus && (
                            <Typography variant="h4">
                                {labelStatus} and the expected delivery date is {expectedDeliveryDate}.
                            </Typography>
                        )}
                    </Box>
                </div>
            )}
        </>
    );
};

export default Checkout;
