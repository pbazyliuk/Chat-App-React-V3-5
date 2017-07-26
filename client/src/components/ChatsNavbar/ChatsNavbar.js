import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import styles from './ChatsNavbar.scss';

class ChatsNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchUser: ''
		};

		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleMenuShow = this.handleMenuShow.bind(this);

		this.handleSearchUserInput = this.handleSearchUserInput.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

		this.clearInput = this.clearInput.bind(this);
	}

	handleSizeChange() {
		this.props.onSizeChange();
	}

	handleMenuShow() {
		this.props.onMenuShow();
	}

	handleSearchUserInput(e) {
		const searchVal = e.target.value;

		this.setState({
			searchUser: searchVal
		});

		this.props.searchUserVal(searchVal);
	}

	handleSearchSubmit(e) {
		e.preventDefault();
	}

	clearInput() {
		this.setState({
			searchUser: ''
		});
	}

	render() {
		const isVisible = {
			display: 'none'
		};

		const rotated = {
			transform: 'rotate(-90deg)',
			justifyContent: 'center'
		};

		const centered = {
			justifyContent: 'center'
		};

		const disabled = {
			pointerEvents: 'none'
		};

		return (
			<div
				className={styles['chat-navbar']}
				style={this.props.data.isToggleOn ? centered : {}}
			>
				<span
					onClick={this.handleSizeChange}
					className={styles['chat-navbar__btn-left-arrow']}
					style={
						!this.props.data.isMenuShown
							? this.props.data.isToggleOn ? rotated : {}
							: disabled
					}
				/>

				<form
					onSubmit={this.handleSearchSubmit}
					action=""
					className={styles['search-form']}
					style={this.props.data.isToggleOn ? isVisible : {}}
				>
					<input
						className={styles['search-form__input']}
						type="text"
						placeholder="Search User/Chat"
						name="search-field"
						value={this.state.searchUser}
						onChange={this.handleSearchUserInput}
					/>
					<span className={styles['search-form__btn-search']} />
				</form>

				<div style={this.props.data.isToggleOn ? isVisible : {}}>
					<span
						onClick={this.handleMenuShow}
						className={styles['chat-navbar__btn-bars']}
						style={this.props.data.isMenuShown ? isVisible : {}}
					/>
					<span
						onClick={this.handleMenuShow}
						className={styles['chat-navbar__btn-close']}
						style={!this.props.data.isMenuShown ? isVisible : {}}
					/>
				</div>
			</div>
		);
	}
}

ChatsNavbar.propTypes = {
	data: PropTypes.object.isRequired,
	isMenuShown: PropTypes.bool,
	isToggleOn: PropTypes.bool,
	onSizeChange: PropTypes.func.isRequired,
	onMenuShow: PropTypes.func.isRequired
};

export default connect(null, actions)(ChatsNavbar);
