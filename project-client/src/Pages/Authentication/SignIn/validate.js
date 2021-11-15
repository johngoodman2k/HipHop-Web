import validator from 'validator';
import toastNotify from '../../../Components/Toast';

const validate = (username, password) => {
	const isID = validator.isEmpty(username);
	if (isID) {
		toastNotify('Please enter your ID', 'error');
		return false;
	}
	const isPassword = validator.isEmpty(password);
	if (isPassword) {
		toastNotify('Please enter your password', 'error');
		return false;
	}
	return {
		username,
		password
	};
};

export default validate;
