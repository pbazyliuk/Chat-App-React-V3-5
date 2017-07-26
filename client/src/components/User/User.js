import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './User.scss';

class User extends React.Component {
	render() {
		const { _id, firstname, isLogged } = this.props;
		return (
			<div className={styles['chat-list__link']}>
				<li className={styles['chat-list__item']}>
					<div className={styles['avatar']}>
						<img
							className={
								isLogged === true
									? `${styles['avatar__img']} ${styles['hide']}`
									: `${styles['avatar__img']} ${styles['show']}`
							}
							src="../../../images/user-off-avatar.png"
							alt="avatar-image"
						/>

						<img
							className={
								isLogged === true
									? `${styles['avatar__img']} ${styles['show']}`
									: `${styles['avatar__img']} ${styles['hide']}`
							}
							src="../../../images/user-on-avatar.png"
							alt="avatar-image"
						/>
					</div>
					<div className={styles['chat-info']}>
						<h4 className={styles['chat-name__heading']}>
							{firstname}
						</h4>
					</div>
					<div
						className={
							isLogged === true
								? `${styles['online']} ${styles['chat-last-activity']}`
								: `${styles['off']} ${styles['chat-last-activity']}`
						}
					>
						<span
							className={
								isLogged === true ? `${styles['show']}` : `${styles['hide']}`
							}
						>
							on
						</span>
						<span
							className={
								isLogged === true ? `${styles['hide']}` : `${styles['show']}`
							}
						>
							off
						</span>
					</div>
				</li>
			</div>
		);
	}
}

User.propTypes = {
	_id: PropTypes.string.isRequired,
	firstname: PropTypes.string.isRequired,
	isLogged: PropTypes.bool.isRequired
};

export default User;
