import React from 'react';
import {connect} from 'react-redux';

import {getProducts, getProduct, updateProduct} from '../../actions/product_actions';
import {createCartItem, fetchCartItems} from '../../actions/cart_items_actions';
import ProductShow from './product_show';

const mapSTP = (state, ownProps) => ({
    product: state.entities.products[ownProps.match.params.productId],
    userCartItems: Object.values(state.entities.cartItems),
    currentUserId: state.session.id,
    reviews: Object.values(state.entities.reviews)
})

const mapDTP = (dispatch) => ({
    getProducts: products => dispatch(getProducts(products)),
    getProduct:  productId => dispatch(getProduct(productId)),
    createCartItem: (cartItem) => dispatch(createCartItem(cartItem)),
    fetchCartItems: () => dispatch(fetchCartItems()),
    updateProduct: product => dispatch(updateProduct(product))
})

export default connect(mapSTP, mapDTP)(ProductShow)