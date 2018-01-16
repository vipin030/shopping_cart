import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { getCartDetails, getCartPrice } from '../reducers';
import { closeCart, removeFromCart, checkout } from '../action';
import Cart from '../components/Cart';

const CartContainer = ({ cart, total, dialogBoxStatus, closeCart, removeFromCart, checkout }) => (
	<div>
	<Cart props={cart} total={total} isDialogOpen={dialogBoxStatus} close={()=>closeCart()} 
	removeFromCart={removeFromCart} onCheckout={()=>checkout(cart)}/>
	</div>
)

const mapStateToProps = (state) => ({
	cart: getCartDetails(state),
	total: getCartPrice(state),
	dialogBoxStatus: state.cart.dialogBoxStatus
})

export default connect(mapStateToProps, { closeCart, removeFromCart, checkout })(CartContainer)