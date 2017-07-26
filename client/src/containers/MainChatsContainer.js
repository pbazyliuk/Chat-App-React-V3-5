import React from 'react';
import { Router } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CommonChatContainer from './CommonChatContainer';

class MainChatsContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Route exact path="/chat" component={CommonChatContainer} />
				<Route
					path="/chat/:id"
					render={props => {
						return <CommonChatContainer {...props} />;
					}}
				/>
			</div>
		);
	}
}

export default MainChatsContainer;
