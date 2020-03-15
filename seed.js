const faker = require('faker')
const MongoClient = require('mongodb').MongoClient

async function generateUsers(db, n = 2) {
  const users = []
  for(let i = 0; i < n; i++) {
    users.push({
      name: faker.internet.userName()
    })
  }
  return await db.collection('users').insertMany(users)
}

async function generateMessages(db, user1, user2, conversationId, n = 10) {
  const messages = []

  for(let i = 0; i < n; i++) {
    messages.push({
      conversationId,
      text: faker.lorem.sentence(),
      senderId: i % 2 === 0 ? user1._id : user2._id,
      recepientId: i % 2 === 0 ? user2._id : user1._id,
      createdAt: new Date()
    })
  }
  return await db.collection('messages').insertMany(messages)
}

async function generateConversation(db, user1, user2) {
  return await db.collection('conversations').insertOne({
    user1Id: user1._id,
    user2Id: user2._id
  })
}

MongoClient.connect('mongodb://localhost:27017', async (err, db) => {
  try {
    const guildChat = db.db('guild-chat')
    const collections = await guildChat.collections()

    if(collections.length) {
      guildChat.dropDatabase()
    } 

    console.log('Seeding database. This could take a few seconds...')
    const usersResult = await generateUsers(guildChat, 2)
    const conversationResult = await generateConversation(guildChat, usersResult.ops[0], usersResult.ops[1])
    await generateMessages(guildChat, usersResult.ops[0], usersResult.ops[1], conversationResult.insertedId, 7)
    console.log('Seeding complete.')
    
    db.close()
  } catch(err) {
    console.error(`Error seeding DB: ${err}`)
  }
})
