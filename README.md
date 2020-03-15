# Getting Started
`npm install`\
`npm run client-install`\
`npm run seed`\

**Start the Dev Server**
`npm run dev`
(runs both server and client)

or

**Start the Server**
`npm start`

**Start the Client**
`npm run client`


Server runs on http://localhost:5000 and client on http://localhost:3000

# General Info
After seeding the database, two users will exist. When you visit `localhost:3000` you can select a user to login in as. The next screen will have a single card representing a conversation between you and the other generate user. Clicking that card will take you to the chat interface which is prepopulated with  lorem ipsum messages. 

The bottom of the chat interface features a text input field and a submit button. Submitting a message creates a new record in the database. After successfully saving the new message record, the server emits a `newMessage` event. Active clients have corresponding listeners the take the new message data and update the state of the chat UI.

# Technology
- React
- MongoDB
- Express
- Node
- Socket.io
- React-Express-Starter\
  https://github.com/bradtraversy/react_express_starter \
  Provided basic file structure and foundational packages

# Future Additions + Current Limitations
## Testing
In a production environment I fully support testing. Testing is necessary to confidently build applications that behave in reliable ways. The absence of tests here *does not* indicate an ambivalence toward testing on my part. I chose not to include tests in this exercise because of time considerations.
## Smooth Scroll to Latest Message
When a new message is entered, the view immediately jumps to the latest message. This should happen with smooth scroll. Similarly, when logging into an existing chat the view should be scrolled to the most recent messages.
## User CRUD
Rather than just logging in with dummy users, there needs to be a UI flow for creating new users within the application.
## User Search + New Conversations
When logging in as a user, you should be presented with the ability to search for users to create new conversations with.
## Message Reactions
Originally, I planned on including the ability to "Like" or "Dislike" a message. It would be relatively easy to implement and would follow a similar pattern to sending a new message. This was dropped for time considerations around building the additional UI components.
## Error Handling + API Responses
Need to add `try/catch` blocks to all of the methods than handle interacting with the database. If an error is thrown, that data would need to be returned to the endpoint so that the proper status code and error message could be passed to the front end. Currently all endpoints return `200`.





