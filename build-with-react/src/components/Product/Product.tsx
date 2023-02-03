import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

import { CutList } from '../CutList/CutList';

import { IProduct } from '../../interfaces/product';
import { ICut } from '../../interfaces/cut';


const Product = ({ data }: { data: IProduct }) => {
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProduct>({ ...data, selectedCut: data.models[0].cuts[0] });

    const onNavigateToCheckout = () => {
        navigate('/checkout', { state: product });
    };

    const onSelectCutHandler = (cut: ICut) => {
        setProduct((oldProduct) => ({
            ...oldProduct,
            selectedCut: cut,
        }));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '100px' }}>
            <div>
                <img src={data.models[0].img} alt="image" />
            </div>
            <div>
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'baseline'}}>
                    <Typography variant="h4">{data.mark}</Typography>
                    <Typography variant="h5" color="text.secondary" style={{ marginBottom: '10px' }}>
                        {data.models[0].title}
                    </Typography>
                </Box>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                    {data.models[0].type}
                </Typography>
                <CutList onSelectCutHandler={onSelectCutHandler} cuts={data.models[0].cuts} selectedCut={product.selectedCut!} />
                <Button variant="contained" color="success" onClick={onNavigateToCheckout}>
                    Checkout
                </Button>
            </div>
        </Box>
    );
};

export default Product;
