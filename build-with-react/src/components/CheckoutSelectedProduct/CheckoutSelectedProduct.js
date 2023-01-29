const CheckoutSelectedProduct = ({ selectedProduct, totalPrice, deliveryPrice }) => {
    return (
        <div className="product-ctr">
            <div className="img-ctr">
                <img src={selectedProduct.models[0].img} alt="" />
            </div>
            <div className="product-desc">
                <h3>
                    {selectedProduct.mark} {selectedProduct.models[0].model}
                </h3>
                <p>
                    {selectedProduct.models[0].type} {selectedProduct.selectedCut.ml}ml
                </p>
                <p>Price: {selectedProduct.selectedCut.price}lv</p>
                {totalPrice > 0 && (
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
