import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-error.js';

class NotFoundError extends CustomAPIError {
	constructor(message) {
		supper(message);
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

export default NotFoundError;