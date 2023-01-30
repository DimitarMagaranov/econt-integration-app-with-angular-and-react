import React from 'react';
import { IProduct } from '../../interfaces/product';

type CheckoutSelectedProductProps = {
    selectedProduct: IProduct;
    totalPrice: React.ReactNode;
    deliveryPrice: React.ReactNode;
};

const CheckoutSelectedProduct = ({ selectedProduct, totalPrice = 0, deliveryPrice = 0 }: CheckoutSelectedProductProps) => {
    const isSetedTotalPrice = totalPrice != undefined && totalPrice != null && totalPrice > 0;
    return (
        <div className="product-ctr">
            <div className="img-ctr">
                <img src={selectedProduct.models[0].img} alt="" />
            </div>
            <div className="product-desc">
                <h3>
                    {selectedProduct.mark} {selectedProduct.models[0].title}
                </h3>
                <p>
                    {selectedProduct.models[0].type} {selectedProduct.selectedCut!.ml}ml
                </p>
                <p>Price: {selectedProduct.selectedCut!.price}lv</p>
                {isSetedTotalPrice && (
                    <>
                        <p>Delivery price: {deliveryPrice}lv</p>
                        <p>Total price: {totalPrice}lv</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutSelectedProduct;
