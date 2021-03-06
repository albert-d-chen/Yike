import React from 'react';
import {Link} from 'react-router-dom';
import PopupCheckout from './popup_checkout';
import PopupVenmo from './popup_venmo';
import PopupEmptyCheckout from './popup_emptycheckout';

class CartItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopupCheckout: false,
            showPopupVenmo: false,
            showPopupEmptyCheckout: false
        }

        this.inCart = this.inCart.bind(this);
        this.emptyCart = this.emptyCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sumCartTotal = this.sumCartTotal.bind(this);
        this.sumItemTotal = this.sumItemTotal.bind(this);

        this.togglePopUpCheckout = this.togglePopUpCheckout.bind(this);
        this.togglePopUpVenmo = this.togglePopUpVenmo.bind(this);
        this.togglePopUpEmptyCheckout = this.togglePopUpEmptyCheckout.bind(this);

        this.clearCart = this.clearCart.bind(this);
    }

    togglePopUpCheckout(){
        this.setState({
            showPopupCheckout: !this.state.showPopupCheckout
        })
    }

    togglePopUpVenmo(){
        this.setState({
            showPopupVenmo: !this.state.showPopupVenmo
        })
    }

    togglePopUpEmptyCheckout(){
        this.setState({
            showPopupEmptyCheckout: !this.state.showPopupEmptyCheckout
        })
    }

    componentDidMount() {
        this.props.fetchCartItems();
    }

    componentDidUpdate(prevProps) {
        if (Object.values(prevProps.userCartItems).length !== Object.values(this.props.userCartItems).length){
            this.props.fetchCartItems();
        }
    }

    sumCartTotal() {
        let cartItemQuantity = Object.keys(this.props.cartItems);
        let total = 0;
       
        let totalProductsPrice = cartItemQuantity.map(itemId => {
            let productId = this.props.cartItems[itemId].product_id; //products object product id
            total = total + this.props.products[productId].price * this.props.cartItems[itemId].quantity;
            return total;
        })

        return total;
    }

    sumItemTotal(itemId, productId) {
            let total = 0;
            total = total + this.props.products[productId].price * this.props.cartItems[itemId].quantity;
            return total;

    }

    clearCart(){
        let cartItemQuantity = Object.keys(this.props.cartItems);
        cartItemQuantity.map(itemId => {
            this.props.deleteCartItem(itemId);
        })
    }
    
    handleChange(idx){
        event.preventDefault();
        let updatedItem = {id: idx, quantity: event.target.value};
        this.props.updateCartItem(updatedItem);
    }

    inCart() {
        let cartItemIds = Object.keys(this.props.cartItems);//these are cart item ids 
        let fullProducts = cartItemIds.map(itemId => {
                let productId = this.props.cartItems[itemId].product_id;
    
                return (
                <div key={itemId} className='cart-product-container'>
                    <div className='cart-image-wrapper'>
                        <Link to={`/products/${productId}`}><img className='cart-image' src={this.props.products[productId].photoUrls ? this.props.products[productId].photoUrls[0] : null} ></img></Link>
                    </div>
                    <div className='cart-info-wrapper'>
                        <div className='cart-product-price'>
                            <div className='cart-item-name'>{this.props.products[productId].product_name}</div>
                            <div className='cart-item-price'>${this.sumItemTotal(itemId, productId)}.00</div>
                        </div>

                        <div className='cart-gender-color'>
                            <div className='cart-item-gender'>{this.props.products[productId].gender} Shoe</div>
                            <div className='cart-item-color'>Color: {this.props.products[productId].color}</div>
                        </div>

                        <div className='size-quantity-box'>
                            <div className='size-cart'>Size  {this.props.products[productId].size}</div>

                            <div className='quantity-select' > Quantity &nbsp;
                                <select className='select-dropdown' onChange={(() => { this.handleChange(itemId) })} value={this.props.cartItems[itemId].quantity}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                        
                        <button className='delete-button' onClick={() => { this.props.deleteCartItem(itemId); }}>Remove</button>
                    </div>
                </div>
        )})
        return (
            <div className='cart-items-container'>
                <div className='cart-left'>
                    <div className='cart-header'>Cart</div>
                    <div className='cart-products'>{fullProducts}</div>
                </div>

                <div className='cart-right'>
                    <div className='summary'>Summary</div>
                    <div className='subtotal'>
                        <div className='subtotal-title'>Subtotal <i className="fas fa-question-circle fa-sm"></i></div>
                        <div className='subtotal-price'>${this.sumCartTotal()}.00</div>
                    </div>
                    <div className='shipping'>
                        <div className='estimated-shipping'>Estimated Shipping &#38; Handling</div>
                        <div className='shipping-price'>$0.00</div>
                    </div>
                    <div className='tax'>
                        <div className='estimated-tax'>Estimated Tax <i className="fas fa-question-circle fa-sm"></i></div>
                        <div className='tax-price'>--</div>
                    </div>
                    <div className='total'>
                        <div className= 'total-header'>Total</div>
                        <div className='total-price'>${this.sumCartTotal()}.00</div>
                    </div>

                    <div className='checkout'><button onClick={() => {this.togglePopUpCheckout();}} className='checkoutButton'>Checkout</button></div>
                    <div className='paypal'><button onClick={this.togglePopUpVenmo} className='checkout-paypal'><i className='fab fa-paypal fa-3x' style={{ color: 'blue' }}></i></button></div>
                    {this.state.showPopupCheckout ?
                        <PopupCheckout closePopup={this.togglePopUpCheckout} clearCart={this.clearCart}/> : null}
                    {this.state.showPopupVenmo ?
                        <PopupVenmo closePopup={this.togglePopUpVenmo} /> : null}
                </div>
            </div>
        )
    }

    emptyCart() {
        return (
            <div className='cart-items-container'>
                <div className='cart-left1'>
                    <div className='cart-header1'>Your Cart Is Empty</div>
                    <div className='kobe-gif'><iframe src="https://giphy.com/embed/ksijjzCkg1kly" width="480" height="372" frameBorder="0" allowFullScreen ></iframe></div>
                </div>

                <div className='cart-right'>
                    <div className='summary'>Summary</div>
                    <div className='subtotal'>
                        <div className='subtotal-title'>Subtotal <i className="fas fa-question-circle fa-sm"></i></div>
                        <div className='subtotal-price'>$0.00</div>
                    </div>
                    <div className='shipping'>
                        <div className='estimated-shipping'>Estimated Shipping &#38; Handling</div>
                        <div className='shipping-price'>$0.00</div>
                    </div>
                    <div className='tax'>
                        <div className='estimated-tax'>Estimated Tax <i className="fas fa-question-circle fa-sm"></i></div>
                        <div className='tax-price'>--</div>
                    </div>
                    <div className='total'>
                        <div className='total-header'>Total</div>
                        <div className='total-price'>$0.00</div>
                    </div>

                    <div className='checkout'><button onClick={() => {this.togglePopUpEmptyCheckout()}} className='checkoutButton'>Checkout</button></div>
                    <div className='paypal'><button onClick={this.togglePopUpVenmo} className='checkout-paypal'><i className='fab fa-paypal fa-3x' style={{ color: 'blue' }}></i></button></div>

                    {this.state.showPopupEmptyCheckout ?
                        <PopupEmptyCheckout closePopup={this.togglePopUpEmptyCheckout} /> : null}
                    {this.state.showPopupVenmo ?
                        <PopupVenmo closePopup={this.togglePopUpVenmo} /> : null}
                </div>
            </div>
        )
    }

    render() {
        return (this.props.userCartItems.length === 0 || this.props.currentUserId === null) ? this.emptyCart() : this.inCart();
    }
}

export default CartItems;