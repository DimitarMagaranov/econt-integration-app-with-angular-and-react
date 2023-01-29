import Product from '../Product/Product';

import { products } from '../../constants';

const ProductList = () => {
    return (
        <div className="product-list">
            {products.map(x => <Product key={x.mark} data={x}/>)}
        </div>
    );
};

export default ProductList;
