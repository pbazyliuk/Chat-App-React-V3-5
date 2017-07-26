const Chat = require('../models/chat');

exports.getAllChats = function(req, res) {
    Chat.find({}, function(err, chats) {
      if(err) return err;
      res.send(chats);
    })
  }

exports.createChat = function(req, res) {
    var usersNames = [];
    var usersIds = [];

    var users = req.body.users.map(user => {
        return JSON.parse(user);
    })

    Chat.find({name: req.body.chatName})
      .then((chat) => {
        if(chat.length) {
          res.status(422).send({error: 'this chat name is already been taken'})
        }
        else {
          users.forEach((user) => {
            for(var key in user) {
              if(key === '_id') {
                usersIds.push(user[key]);
              }
              if(key === 'firstname') {
                usersNames.push(user[key]);
              }
            }
          })
          Chat.find({usersNames: usersNames}, function(err, chats) {
            if(err) return res.status(422).send({error: 'these users have been already connected to private chat'});
            if(!chats.length) {
              var chatObj = {
                name: req.body.chatName,
                privateMessages: [],
                usersIds: usersIds,
                usersNames: usersNames
              }
              Chat.create(chatObj, function(err, chat) {
                if (err) return err;
                res.send(chat);
              })
            }
            else {
                res.status(422).send({error: 'these users have been already connected to private chat'})
            }
            })
          }
      })
  }

  exports.createPrivateMessage = function(req, res) {
    var messagesObj = {};
    messagesObj.privateMessages = [];
    messagesObj.privateMessages.push(req.body)
    Chat.findOneAndUpdate({name: req.params.id},  {$push: {privateMessages: req.body}}, function(err, chat) {
      if(err) return err;
      res.send({message: `message added to chat: ${req.params.id}`});
    })
  }

   exports.getPrivateMessages = function(req, res) {
    Chat.findOne({name: req.params.id}, function(err, chat) {
      if(err) return err;
      res.send(chat);
    })
  }