import React from 'react';

const Product = ({ id, name, price, image, stock, selectProduct }) => (
	<div className="product-item">
	<img alt="Product" src={require('../images/'+image)} className="product-img" onClick={selectProduct}/>
	<p>
	{name}
	<br/>
	<span>{price}</span>
	</p>
	{(parseInt(stock)<5 && parseInt(stock) >0) ? (<div className="product-stock">Only {stock} left  in stock order soon</div>)
	: ((parseInt(stock) === 0) ? (<div className="product-stock">No Item Left</div>) : '')}
	</div>
)

export default Product;