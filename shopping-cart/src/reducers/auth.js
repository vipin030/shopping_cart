import isEmpty from 'lodash/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {}
}
const auth = (state = initialState, action) => {
	switch(action.type) {
		case 'SET_CURRENT_USER': 
			return {
				isAuthenticated: !isEmpty(action.user),
				user: action.user
			}
		default:
			return initialState;
	}
}

export default auth