import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { IProduct } from '../../interfaces/product';

type CheckoutSelectedProductProps = {
    selectedProduct: IProduct;
    totalPrice: React.ReactNode;
    deliveryPrice: React.ReactNode;
};

const CheckoutSelectedProduct = ({ selectedProduct, totalPrice = 0, deliveryPrice = 0 }: CheckoutSelectedProductProps) => {
    const isSetedTotalPrice = totalPrice != undefined && totalPrice != null && totalPrice > 0;
    return (
        <Card elevation={0} sx={{ height: '100%', border: 'none', boxShadow: 'none' }}>
            <CardActionArea>
                <CardMedia component="img" image={selectedProduct.models[0].img} alt="product" sx={{width: '150px', margin: 'auto'}} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {selectedProduct.mark} {selectedProduct.models[0].title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {selectedProduct.models[0].type} {selectedProduct.selectedCut!.ml}ml
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Price: {selectedProduct.selectedCut!.price}lv
                    </Typography>
                    {isSetedTotalPrice && (
                        <>
                            <Typography variant="h6" color="text.secondary">
                                Delivery price: {deliveryPrice}lv
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Total price: {totalPrice}lv
                            </Typography>
                        </>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CheckoutSelectedProduct;
