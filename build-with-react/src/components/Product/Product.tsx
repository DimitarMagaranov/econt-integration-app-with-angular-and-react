import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IProduct } from "../../interfaces/product";
import { ICut } from "../../interfaces/cut";
import Button from '@mui/material/Button';

import {CutList} from "../CutList/CutList";

const Product = ({data}: {data: IProduct}) => {
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProduct>({...data, selectedCut: data.models[0].cuts[0]});

    const onNavigateToCheckout = () => {
        navigate('/checkout', {state: product})
    }

    const onSelectCutHandler = (cut: ICut) => {
        setProduct(oldProduct => ({
            ...oldProduct,
            selectedCut: cut
        }))
    }

    return (
        <div className="product-ctr">
            <div className="img-ctr">
                <img src={data.models[0].img} alt="image" />
            </div>
            <div className="product-description-ctr">
                <h1>{data.mark}</h1>
                <h2>{data.models[0].title}</h2>
                <span>{data.models[0].type}</span>
                <CutList onSelectCutHandler={onSelectCutHandler} cuts={data.models[0].cuts} selectedCut={product.selectedCut!} />
                <Button variant="contained" color="success" onClick={onNavigateToCheckout}>Checkout</Button>
            </div>
        </div>
    )
}

export default Product;