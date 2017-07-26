import io from 'socket.io-client';
export {
	sendMessageWS,
	initConnection,
	addListener,
	addPrivateListener,
	socketRoot,
	socketPrivate,
	disconnect,
	sendChat,
	initPrivateConnection,
	disconnectPrivate,
	sendPrivate
};

let socketRoot;
let socketPrivate;
let listeners = {};
let privateListeners = {};

function initConnection(message, chatName) {
	if (!socketRoot) {
		connect(chatName);
	}

	if (message) {
		send(message);
	}
}

function connect(chatName) {
	socketRoot = io('http://localhost:8081/root');

	socketRoot.on('connect', function() {
		socketRoot
			.on('authenticated', function() {
				console.log('authenticated client');
			})

			.emit('authenticate', {
				token: localStorage.getItem('token')
			})

			.on('join', function(val) {
				console.log('join', val.user);
				onJoin(val.user);
			})

			.on('leave', function(val) {
				console.log('leave', val.user);
				onLeave(val.user);
			})

			.on('message', function(message) {
				onMessage(message);
			})

			.on('chat', function(message) {
				console.log('chat', message);
				onChat(message);
			});
	});
}

function onMessage(msg) {
	console.log('onMessage', msg);
	fireListeners('message', msg);
}

function onChat(msg) {
	console.log('onChat', msg);
	fireListeners('chat', msg);
}

function onJoin(username) {
	console.log('onJoin', username);
	fireListeners('join', username);
}

function onLeave(username) {
	console.log('onLeave');
	fireListeners('leave', username);
}

function send(message) {
	console.log('send to server', message);
	socketRoot.emit('message', message);
}

function sendMessageWS(message) {
	console.log('send message', message);
	initConnection(message);
}

function sendChat(chat) {
	console.log('send to server chat', chat);
	socketRoot.emit('chat', chat);
}

function disconnect(chatName) {
	if (!socketRoot) {
		return;
	}

	socketRoot.disconnect();
	socketRoot = null;
	listeners = {};
}

function fireListeners(event, payload) {
	console.log('event', event);
	console.log('payload', payload);
	console.log('listeners', listeners);

	if (listeners[event]) {
		console.log([...listeners[event]]);
		[...listeners[event]].forEach(listener => {
			listener(payload);
		});
	}
}

function addListener(event, listener) {
	if (!listeners[event]) {
		listeners[event] = [];
	}

	listeners[event].push(listener);
}

function initPrivateConnection(chatName) {
	if (!socketPrivate) {
		connectPrivate(chatName);
	}
}

function connectPrivate(chatName) {
	var userId = JSON.parse(localStorage.getItem('user'))._id;
	socketPrivate = io('http://localhost:8081/privatechat');

	socketPrivate.on('connect', function() {
		socketPrivate.emit('room', chatName, userId);

		socketPrivate
			.on('add-private-message', function(message) {
				console.log('add-private-message');
				onPrivateMessage(message, chatName);
			})
			.on('join room', function(room) {
				console.log('join room', room);
				onJoinPrivate(room);
			});
	});
}

function onPrivateMessage(message, chatName) {
	firePrivateListeners('add-private-message', message, chatName);
}

function sendPrivate(message, room) {
	socketPrivate.emit('add-private-message', message, room);
}

function disconnectPrivate() {
	if (!socketPrivate) {
		return;
	}

	socketPrivate.disconnect();
	socketPrivate = null;
}

function onJoinPrivate(room) {
	console.log('onJoin', room);
	firePrivateListeners('join room', room);
}

function addPrivateListener(event, listener) {
	if (!privateListeners[event]) {
		privateListeners[event] = [];
	}
	if (!privateListeners[event].includes(listener)) {
		privateListeners[event].push(listener);
	}
}

function firePrivateListeners(event, ...payload) {

	if (privateListeners[event]) {
		[...privateListeners[event]].forEach(listener => {
			listener(...payload);
		});
	}
}
