import React from 'react';
import { Link } from 'react-router-dom';

const WomenIndexItem = ({ product }) => {
    return (
        <div key={product.id}>
            <ul>
                <Link to={`/products/${product.id}`}>{product.product_name}</Link>
                <img src={product.photoUrls ? product.photoUrls[0] : null} height='350px' width='350px'></img>               
                <li>{product.category}</li>
                <li>{product.price}USD</li>
            </ul>
        </div>
    )
}

export default WomenIndexItem;