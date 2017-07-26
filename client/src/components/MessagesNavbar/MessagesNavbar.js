import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/index';

import styles from './MessagesNavbar.scss';

class MessagesNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchMsq: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(e) {
		const searchMsq = e.target.value;

		this.setState({
			searchMsq
		});

		this.props.searchMessageVal(searchMsq);
	}

	render() {
		const chatName = this.props.chatName;
		return (
			<div className={styles['chat-details-navbar']}>
				<Link
					to="/chat"
					className={
						chatName !== 'general'
							? `${styles['btn-back']} ${styles['show']}`
							: `${styles['btn-back']} ${styles['hide']}`
					}
				/>
				<div className={styles['logo']}>
					<Link to="/" className={styles['logo__link']}>
						<img
							className={styles['logo__item']}
							src="../../../images/logo-small.png"
							alt="logo"
						/>
					</Link>
				</div>

				<form action="" className={styles['search-form']}>
					<input
						onChange={this.handleInputChange}
						value={this.state.searchMsq}
						className={styles['search-form__input']}
						type="text"
						placeholder="Search message"
						name="search-message"
					/>
					<span className={styles['search-form__btn-search']} />
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		chatName: state.auth.get('chatName')
	};
};

MessagesNavbar.propTypes = {
	chatName: PropTypes.string.isRequired
};

export default connect(mapStateToProps, actions)(MessagesNavbar);
