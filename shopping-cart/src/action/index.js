import Axios, { post } from 'axios';
import jwt from 'jsonwebtoken';

import api from '../api/api';
import setAuthToken from '../util/setAuthToken';
import { success, errorMessage } from './alert-action'

const apiUrl = "http://localhost:3000/";
export const receiveProducts = products =>{
	return {
		type: 'RECEIVE_PRODUCTS',
		products
	}
}
export const fetchAllProducts = () => dispatch =>{
	return Axios.get(apiUrl+'products')
	.then(response => {
		dispatch(receiveProducts(response.data));
	})
	.catch(error => {
		console.log("Product error",error);
		throw(error);
	})
}

export const selectProduct = product => {
	return {
		type: 'GET_PRODUCT_BY_ID',
		payload:product
	}
}

export const addToCartUnSafe = productId => {
	return {
		type: 'ADD_TO_CART',
		productId
	}
}

export const addToCart = productId => (dispatch, getState) => {
	if(getState().products.byId[productId].inventory > 0)
		dispatch(addToCartUnSafe(productId))
}

export const removeFromCart = (product) => { 
	return {
		type: 'REMOVE_FROM_CART',
		productId: product.productId,
		inventory: product.inventory
	}
}

export const closeCart = () => {
	return {
		type: 'CLOSE_DIALOG',
		payload: false
	}
}

export const openCart = () => {
	console.log("testing....")
	return {
		type: 'OPEN_DIALOG',
		payload:true
	}
}

export const checkout = (products) => (dispatch)=> {
	dispatch({type: 'CHECKOUT_REQUEST'});
	api.buyProduct(products, () => {
			console.log("Success");
	})
}

export const loginSuccess = (token) =>
{
	console.log("Token is ", token);
	return {
		type:'SET_CURRENT_USER',
		token
	}
}
export const authAction = (user) => {
	console.log("Testing my auth")
	return (dispatch) => {
		return Axios.post(`${apiUrl}login`, user)
		.then(response => {
			localStorage.setItem("jwtToken",response.data.token);
			setAuthToken(response.data.token);
			console.log("Token",jwt.decode(response.data.token));
			dispatch(loginSuccess(jwt.decode(response.data.token)));
		})
		.catch(error => {
			console.log("Error:", error)
			throw(error);
		})
	}
}

export function uploadSuccess({ data }) {
	console.log(data);
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

export function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export function uploadDocumentRequest(data) {  
  //let data = new FormData();
  //data.append('file', document);
  //data.append('name', name);
  console.log("U are in upload request ")
  const config = {
    headers: {
    	'content-type': 'multipart/form-data'
    }
  }
  return (dispatch) => {
    return Axios.post(`${apiUrl}products`, data, config)
      .then(response => dispatch(success("Saved Succesfully")))
      .catch(error => dispatch(errorMessage(error.message)))
  }
}