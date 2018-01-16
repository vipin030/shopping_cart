import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { BrowserRouter} from 'react-router-dom';

import reducer from './reducers';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { fetchAllProducts } from './action';

const middleware = [thunk];
if(process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
store.dispatch(fetchAllProducts());
ReactDOM.render(<Provider store={store}>
	<BrowserRouter>
	<App/>
	</BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
