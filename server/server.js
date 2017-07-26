const Message = require('./models/message');
const Chat = require('./models/chat');

//Main starting point
const express = require('express');
// import express from 'express';
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const User = require('./models/user');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
mongoose.connect('mongodb://localhost:chat-app/chat-app');

//App Setup
// app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 8081;
const server = http.createServer(app);

const socketioJwt = require('socketio-jwt');
const io = require('socket.io')(server);
const config = require('./config');

//Web Sockets goes here
io
	.of('/root')
	.on(
		'connection',
		socketioJwt.authorize({
			secret: config.secret,
			timeout: 15000 // 15 seconds to send the authentication message
		})
	)
	.on('authenticated', function(socket) {
		var obj = { isLogged: true };
		User.findOneAndUpdate({ _id: socket.decoded_token.sub }, obj, function(
			err,
			user
		) {
			io.of('/root').emit(
				'join',
				{
					user: user.firstname,
					time: Date.now()
				},
				console.log('join', user.firstname)
			);
		});

		socket
			.on('message', chatMessageHandler)
			.on('chat', chatHandler)
			.on('disconnect', disconnectHandler);

		function chatHandler(chat) {
			console.log('chat', chat);

			var obj = {
				name: chat.chatName,
				privateMessages: [],
				usersIds: [],
				usersNames: []
			};

			chat.users = chat.users
				.map(user => {
					return JSON.parse(user);
				})
				.forEach(user => {
					obj.usersIds.push(user._id);
					obj.usersNames.push(user.firstname);
				});

			Chat.find({ name: chat.chatName }).then(chatS => {
				console.log('chatS', chatS);
				if (chatS.length) {
					return res
						.status(422)
						.send({ error: 'this chat name is already been taken' });
				} else {
					Chat.find({ usersNames: obj.usersNames }, function(err, chats) {
						if (err)
							return res.status(422).send({
								error: 'these users have been already connected to private chat'
							});
						if (!chats.length) {
							Chat.create(obj, function(err, chat) {
								if (err) return err;
							});
							io.of('/root').emit('chat', {
								name: obj.name,
								privateMessages: [],
								usersIds: obj.usersIds,
								usersNames: obj.usersNames
							});
						} else {
							res.status(422).send({
								error: 'these users have been already connected to private chat'
							});
						}
					});
				}
			});
		}

		function chatMessageHandler(message) {
			console.log('message', message);

			Message.create(message, function(err, msg) {
				if (err) return err;
			});

			io.of('/root').emit('message', {
				userId: message.userId,
				text: message.text,
				timestamp: message.timestamp,
				userName: message.userName
			});
		}

		function disconnectHandler(val) {
			console.log('disconnect');

			var obj = { isLogged: false };
			User.findOneAndUpdate({ _id: socket.decoded_token.sub }, obj, function(
				err,
				user
			) {
				return io.of('/root').emit(
					'leave',
					{
						user: user.firstname,
						time: Date.now()
					},
					console.log('leave', user.firstname)
				);
			});
		}
	});

//Privatechat namespaces for socket.io
io.of('/privatechat').on('connection', function(socket) {
	console.log('ws room connection');

	socket.on('room', function(room, userId) {
		console.log('user joined room', room);
		socket.join(room);

		socket.emit('join room', room);

		var obj = { isLogged: true };
		User.findOneAndUpdate({ _id: userId }, obj, function(err, user) {});
	});

	socket.on('add-private-message', addPrivateMessage);
	socket.on('disconnect', disconnectPrivateChat);

	function addPrivateMessage(message, room) {
		console.log('private message', message, room);

		Chat.findOneAndUpdate(
			{ name: room },
			{ $push: { privateMessages: message } },
			function(err, chat) {
				if (err) return err;
			}
		);

		io.of('/privatechat').to(room).emit('add-private-message', message, room);
	}

	function disconnectPrivateChat(val) {
		console.log('disconnect user from room');
		socket.disconnect();
	}
});

server.listen(port);
console.log('server is listening on: ', port);
