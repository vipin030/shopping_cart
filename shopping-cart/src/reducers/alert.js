export default function(state={}, action){
	switch(action.type) {
		case 'SUCCESS_MESSAGE':
			return {type:'alert-success', message:action.message};
		case 'ERROR_MESSAGE':
			return {type:'alert-error', message:action.message};
	}
	return state;
}