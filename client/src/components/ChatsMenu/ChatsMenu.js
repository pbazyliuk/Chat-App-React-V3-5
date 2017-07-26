import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import styles from './ChatsMenu.scss';

function validate(values) {
	const errors = {};

	if (!values.chatName) {
		errors.chatName = 'Chatname is required';
	} else if (values.chatName.length > 15) {
		errors.chatName = 'Must be 15 characters or less';
	} else if (values.chatName.length < 4) {
		errors.chatName = 'Must be at least 4 characters';
	}

	if (!values.users) {
		errors.users = 'Users is required';
	}

	return errors;
}

const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning },
	classNameIn,
	classNameLb,
	LbText,
	placeholder,
	id
}) => {
	return (
		<div>
			<label htmlFor={id} className={classNameLb}>
				{LbText}
			</label>
			<div>
				<input
					{...input}
					placeholder={placeholder}
					type={type}
					className={classNameIn}
					id={id}
				/>
				{touched &&
					((error &&
						<div className="text-has-error">
							{error}
						</div>) ||
						(warning &&
							<span>
								{warning}
							</span>))}
			</div>
		</div>
	);
};

const renderFieldSelect = ({
	input,
	meta: { touched, error, warning },
	classNameSl,
	classNameLb,
	name,
	dataUsers,
	dataCurUser,
	id,
	LbText,
	multiple
}) => {
	dataUsers = dataUsers.filter(
		user => user.firstname !== dataCurUser.get('firstname')
	);
	let usersHtml = dataUsers.map(user => {
		return (
			<option key={user._id} value={JSON.stringify(user)}>
				{user.firstname}
			</option>
		);
	});
	return (
		<div>
			<label htmlFor={id} className={classNameLb}>
				{LbText}
			</label>
			<select
				{...input}
				className={classNameSl}
				size={'5'}
				name={name}
				multiple={multiple}
			>
				{usersHtml}
			</select>
			{touched &&
				((error &&
					<div className="text-has-error">
						{error}
					</div>) ||
					(warning &&
						<span>
							{warning}
						</span>))}
		</div>
	);
};

class ChatsMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleSubmit, valid, pristine, users, curUser, value } = this.props;
		const isVisible = {
			display: 'none'
		};
		return (
			<div
				className="user-menu"
				style={!this.props.data.isMenuShown ? isVisible : {}}
			>
				<div className="user-menu__item">
					<input type="checkbox" id="btn-settings" />
					<label htmlFor="btn-settings" className="btn-arrow-label-sm">
						Add Chat
						<span className="btn-arrow-sm" />
					</label>
					<div className="user-menu__item-info">
						<form className="form-add-chat" action="" onSubmit={handleSubmit}>
							<div className="form-add-chat__container">
								<Field
									classNameIn="form-add-chat__input-field"
									classNameLb="form-add-chat__label"
									type="text"
									name="chatName"
									id="emailId"
									component={renderField}
									placeholder="Chat Name (required)"
									LbText="Chat Name"
								/>
							</div>

							<div className="form-add-chat__container">
								{/* <label htmlFor="usersId" className="form-add-chat__label">
									Select Users
								</label> */}
								<Field
									classNameSl="form-add-chat__select-field"
									classNameLb="form-add-chat__label"
									name="users"
									component={renderFieldSelect}
									dataUsers={users}
									dataCurUser={curUser}
									id="usersId"
									value={curUser}
									LbText="Select Users"
									multiple
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
								type="submit"
								disabled={!valid}
								className="form-add-chat__btn-submit"
							>
								ADD CHAT
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

ChatsMenu.propTypes = {
	data: PropTypes.object.isRequired,
	isMenuShown: PropTypes.bool
};

ChatsMenu = reduxForm({
	form: 'addChat',
	validate
})(ChatsMenu);

ChatsMenu = connect(state => ({
	users: [...state.users],
	curUser: state.auth.get('user')
}))(ChatsMenu);

export default ChatsMenu;
