
import _product from './products.json';
const TIMEOUT = 100;

export default {
	getProduct: (callback, timeout) => setTimeout(()=>callback(_product),timeout || TIMEOUT),
	buyProduct: (products, callback, timeout) => setTimeout(()=>callback(),timeout || TIMEOUT)
}