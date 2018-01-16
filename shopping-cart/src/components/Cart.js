import React from 'react';

const Cart = ({props, total, isDialogOpen, close, removeFromCart, onCheckout}) => { 
	const data = props.length > 0 ? (	
		<div>
		<div className="cart-container">
		{props.map((data)=>(
		
		<div className="cart-items" key={data.id}>{data.name}&nbsp;&nbsp;  {data.price}&nbsp;&nbsp; {data.inventory}&nbsp;Item
		&nbsp;&nbsp;<span className="cart-item-remove" onClick={()=>removeFromCart({'productId':data.id,'inventory':data.inventory})}>X</span></div>
		))
		}
		</div>
		<div className="cart-footer">
		<div className="cart-total"> 
		Total: &nbsp; {total}{isDialogOpen}
		</div>
		<div className="cart-checkout">
		&nbsp;&nbsp;<button className="btn btn-default checkout-btn" onClick={onCheckout}>Checkout</button></div>
		</div>
		</div>): (<div>Your cart is empty</div>)
	
		return (
		<div>
		{isDialogOpen && (<div className="cart">
		<div onClick={close} className="close-icon"></div>{data}</div>)}
		</div>
		)
}

export default Cart