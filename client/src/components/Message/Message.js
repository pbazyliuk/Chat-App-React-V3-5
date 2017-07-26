import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './Message.scss';

class Message extends React.Component {
	render() {
		const { text, userName, isLogged, firstname, timestamp } = this.props;

		var dateFull = new Date(timestamp);
		var date = dateFull.getDate();
		var day = dateFull.getMonth();
		var year = dateFull.getFullYear();

		var dateFormat = '' + date + '/' + day + '/' + year;

		return (
			<li
				className={
					firstname === userName
						? styles['user-message-author']
						: styles['user-message-friend']
				}
			>
				<div className={styles['user-message-wrapper']}>
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
					<div
						className={
							isLogged === true
								? firstname === userName
									? styles['user-message__text-cotainer-active-author']
									: styles['user-message__text-cotainer-active']
								: styles['user-message__text-cotainer']
						}
					>
						<span className={styles['user-message__text-author']}>
							{userName}
						</span>
						<div
							className={
								firstname === userName
									? styles['user-message__text-message-author']
									: styles['user-message__text-message']
							}
						>
							{text}
						</div>
					</div>
				</div>

				<div className={styles['user-message__date-container']}>
					<span className={styles['user-message__date']}>
						{dateFormat}
					</span>
					<br />
					<span className={styles['user-message__time']}>
						{moment(timestamp).format('h:mm a')}
					</span>
				</div>
			</li>
		);
	}
}

Message.propTypes = {
	text: PropTypes.string.isRequired,
	timestamp: PropTypes.number.isRequired,
	userName: PropTypes.string.isRequired,
	isLogged: PropTypes.bool.isRequired,
	firstname: PropTypes.string.isRequired
};

export default Message;
