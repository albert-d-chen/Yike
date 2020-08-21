import React from 'react';
import CasualIndexItem from './casual_index_item';

class CasualIndex extends React.Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const products = this.props.products;
        const casual = products.filter(product => product.gender === 'M' && product.category === 'casual');

        return (
            <div>
                <div className='index'>
                    <h1>casual's:</h1>
                    {casual.map(product => <CasualIndexItem key={product.id} product={product} />)}
                </div>
            </div>
        )
    }
}

export default CasualIndex;