import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import product, * as fromProducts from './product';
import cart from './cart';
import auth from './auth';
import alert from './alert';

export default combineReducers({
  products:product,
  cart,
  auth,
  routing: routerReducer,
  form: formReducer,
  alert
})

export const getCartDetails = (state) =>{
	return state.cart.addedIds.map(id=>({
		...fromProducts.getProduct(state.products,id),inventory:state.cart.productQuantities[id]
	}));
}

export const getCartPrice = (state) => {
	return getCartDetails(state).reduce((total, item)=>{
		total += (parseFloat(item.price)*parseFloat(item.inventory));
		return total;
	},0).toFixed(2);
}
