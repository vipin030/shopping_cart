import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { getVisibleProducts } from '../reducers/product';
import Product from '../components/product';
import { selectProduct } from '../action';

const ProductContainer = ({ products, selectProduct, history }) => {
	const goToProduct = (product) =>{
		selectProduct(product);
		history.push("product-details/"+product.id);
	}
	return(
	<div className="row">
	{products.map((product,index)=> {
		return (
			<div>
			{parseInt(index)%3==0 && (<div className="clearfix"></div>)}
		<div className="col-md-4">
		<Product id={product.id} key={product.id} name={product.name}
		price={product.price} image={product.image} stock={product.inventory} selectProduct={()=>goToProduct(product)} />
		</div>
		</div>
		)
	})
	}
	</div>)
}

const mapStateToProps = state => ({
	products: getVisibleProducts(state.products)
})

export default withRouter(connect(mapStateToProps,{selectProduct})(ProductContainer))

