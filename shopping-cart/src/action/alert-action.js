export function errorMessage(message) {
	return {
		type: 'SUCCESS_MESSAGE',
		message: message
	}
}

export function success(message) {
	return {
		type: 'ERROR_MESSAGE',
		message: message
	}
}