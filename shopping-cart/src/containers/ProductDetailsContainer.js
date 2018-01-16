import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { getSelectedProduct } from '../reducers/product';
import ProductDetails from '../components/ProductDetails';
import { addToCart } from '../action';

const ProductDetailsContainer = ({product, match, addToCart}) => (
	<div>
	{(product) && (<ProductDetails props={product} addToCart={()=>addToCart(product.id)}/>)}
	
	</div>
)

const mapStateToProps = (state,{match}) => ({
	product: getSelectedProduct(state.products,match.params.id)
})

export default withRouter(connect(mapStateToProps,{addToCart})(ProductDetailsContainer))