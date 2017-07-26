import React from 'react';

import { history } from '../../history/history';

class Logout extends React.Component {
	componentDidMount() {
		
		this.props.logout();
		setTimeout(() => { 
		
			history.push('/');
		}, 2000)
	}

	render() {
		return <div>Sorry to see you go!!!</div>;
	}

}

export default Logout;
