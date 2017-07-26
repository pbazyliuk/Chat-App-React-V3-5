import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Map } from 'immutable';
import styles from './Login.scss';

function validate(values) {
	const errors = {};

	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	} else if (values.email.length > 30) {
		errors.email = 'Must be 30 characters or less';
	}

	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Must be at least 6 characters';
	}

	return errors;
}

const renderField = ({
	input,
	LbText,
	htmlFor,
	type,
	id,
	meta: { touched, error, warning },
	classNameIn,
	classNameLb,
	placeholder
}) => {
	return (
		<div>
			<label htmlFor={id} className={classNameLb}>
				{LbText}
			</label>

			<input
				id={id}
				{...input}
				placeholder={placeholder}
				type={type}
				className={classNameIn}
			/>
			{touched &&
				((error &&
					<div className={styles['text-has-error']}>
						{error}
					</div>) ||
					(warning &&
						<span>
							{warning}
						</span>))}
		</div>
	);
};

let Login = props => {
	const { handleSubmit, valid, pristine, value } = props;

	return (
		<div className={styles['form__wrapper']}>
			<form className={styles['form-sign-in']} onSubmit={handleSubmit}>
				<h4 className={styles['form-sign-in__header']}>Login Form</h4>

				<div className={styles['form-sign-in__container']}>
					<Field
						classNameIn={styles['form-sign-in__input-field']}
						classNameLb={styles['form-sign-in__label']}
						id="email"
						component={renderField}
						LbText="Email"
						type="text"
						name="email"
						placeholder="Email Address (required)"
					/>
				</div>

				<div className={styles['form-sign-in__container']}>
					<Field
						classNameIn={styles['form-sign-in__input-field']}
						classNameLb={styles['form-sign-in__label']}
						LbText="Password"
						id="passwordId"
						type="password"
						component={renderField}
						name="password"
						placeholder="Password (required)"
						required
						pattern=".{6,}"
					/>
				</div>

				<div
					className={
						!value
							? `${styles['hidden']}`
							: `${styles['isShown']} ${styles['login-error']}`
					}
				>
					{value}
				</div>

				<button
					className={styles['form-sign-in__btn-login']}
					disabled={!valid}
					type="submit"
				>
					Sign In
				</button>
			</form>
		</div>
	);
};

Login = reduxForm({
	form: 'login',
	validate
})(Login);

Login = connect(state => ({
	value: state.auth.get('error')
}))(Login);

export default Login;
