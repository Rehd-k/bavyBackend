const socket_io = require('socket.io');
const { userJoin, getCurrentUser, userLeaves, getRoomUsers } = require('./utilities/users');
const { formatMessage } = require('./utilities/messages');
let io = socket_io()
socketAPI = {}

const CompanyUser = "Chioma"
const CompanyBot = "Mr Bavi"
io.on('connection', socket => {
    socket.on('set-user', (username, room) => {
        const user = userJoin(socket.id, room, username);
        socket.join(user.room);

        // Welcome current user
        socket.emit('users-changed', formatMessage(CompanyUser, `Hi am ${CompanyUser} happy to speak with you today how may i help ?`));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('users-changed', formatMessage(CompanyBot, `${username} joined`))
            

            // send users and room info 
            io.to(user.room).emit('roomUser', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        })

    // Listen for chat
    socket.on('send-message', (message) => {

        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('chat-message', formatMessage(user.username, message));
    })
    socket.on('disconnect', () => {

        const user = userLeaves(socket.id);

        if (user) {
            io.to(user.room).emit('users-changed', formatMessage(CompanyBot, `${user.username} left`))
        
        }

         // send users and room info 
         io.to(user.room).emit('roomUser', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
})

socketAPI.io = io;
module.exports = socketAPI;


