const bodyParser = require('body-parser')
const express = require('express');
const io = require('socket.io')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;

function init(db) {
  const app = express(),
    guildChat = db.db('guild-chat'),
    port = 5000,
    server = app.listen(port, () => console.log(`GuildChat listening on port: ${port}`)),
    socket = io.listen(server)

  app.use(bodyParser.json())
  
  // Prevent duplicate recrods
  guildChat.collection('users').createIndex({ name: 1 }, { unique: true })

  return {
    guildChat,
    app,
    socket
  }
}

// TODO: search for conversations by userId
async function getConversations(db, userId) {
  // need try/catch error handling here
  const conversations = await db.collection('conversations').find().toArray()
  return { conversations }
}

async function getUsers(db) {
  // need try/catch error handling here
  const users = await db.collection('users').find().toArray()
  return { users }
}

// TODO: search for messages by conversationId
async function getMessages(db) {
  // need try/catch error handling here
  const messages = await db.collection('messages').find().sort({ createdAt: 1 }).toArray()

  for(let i = 0; i < messages.length; i++) {
    const id = messages[i].senderId
    const sender = await db.collection('users').findOne(id)
    messages[i].senderName = sender.name
  }

  return { messages }
}

async function createMessage(conversationId, senderId, recepientId, message, db) {
  let result 
  
  // need try/catch error handling here
  if(senderId && recepientId && conversationId) {
    result = await db.collection('messages').insertOne({
      conversationId: new ObjectId(conversationId),
      senderId: new ObjectId(senderId),
      recepientId: new ObjectId(recepientId),
      text: message,
      createdAt: new Date,
      reaction: null,
    })
  }

  return result
}

MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true }, (err, db) => {
  const { app, socket, guildChat } = init(db)

  app.post('/api/message', async (req, res) => {
    const { recepientId, senderId, conversationId, message } = req.body
    const msg =  await createMessage(conversationId, senderId, recepientId, message, guildChat)

    if(msg.ops) {
      socket.emit('newMessage', msg.ops[0])
    }

    res.status(200).json(msg.ops[0])
  })
  
  app.get('/api/users', async (req, res) => {
    const result = await getUsers(guildChat)  
    res.status(200).json(result.users);
  });

  app.get('/api/messages/:conversationId', async (req, res) => {
    const result = await getMessages(guildChat, req.params.converastionId)  
    res.status(200).json(result.messages);
  });

  app.get('/api/conversations/:userId', async (req, res) => {
    const result = await getConversations(guildChat, req.params.userId)  
    res.status(200).json(result.conversations);
  });
})
