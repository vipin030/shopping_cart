import { combineReducers } from 'redux';

export const product = (state={},action) => {
	switch(action.type){
		case 'ADD_TO_CART':
			return {
				...state,
				inventory: state.inventory-1
			};
		case 'REMOVE_FROM_CART':
			return {
				...state,
				inventory: state.inventory += action.inventory
			};
		default:
			return state;
	}
}

export const byId = (state = {}, action) => {
	switch(action.type) {
		case 'RECEIVE_PRODUCTS':
			return {
				...state,
				...action.products.reduce((obj, product) =>{
					obj[product.id] = product;
					return obj
				},{})
			}
		default:
			const { productId } = action;
			if(productId){
				return {
					...state,
					[productId]: product(state[productId],action)
				}
			}
			return state;
	}
}

export const selectedProduct = (state={}, action) => {
	switch(action.type){
		case 'GET_PRODUCT_BY_ID':
			return action.payload;
		default:
			return state;
	}
}

export const visibleIds = (state=[], action) =>{
	switch(action.type){
		case "RECEIVE_PRODUCTS":
			return action.products.map(product => product.id);
		default:
			return state;
	}
}

export default combineReducers({
  byId,
  visibleIds,
  selectedProduct
})

export const getProduct = (state,id) =>{
	return state.byId[id];
}

export const getVisibleProducts = (state) => {
	return state.visibleIds.map(id => getProduct(state,id))
}

export const getSelectedProduct = (state,id) => {
	console.log("test id",state.byId[id]);
	return state.byId[id];
}
