var roomRouter = require("../routers/roomRouter");

const emailSocketID = {}
let listUserAwait = []
let examing = {}
let socketIdOfRoom = {}

module.exports = (io) => {

    io.on('connection', (socket)=> {
        socket.on('email', async ({email}) => {
            emailSocketID[socket.id] = email;
            if ( listUserAwait.length === 0 ) {
                listUserAwait.push(socket.id);
            } else {
                const userAwait = listUserAwait.shift()
                const data = await roomRouter.createRoom({
                    body: {
                        emailA: emailSocketID[userAwait],
                        emailB: email,
                    }
                }, {});

                console.log('LIST USER', listUserAwait);
                console.log('LIST SOCKET USER', emailSocketID);

                io.sockets.clients().connected[userAwait].join(data._id)
                io.sockets.clients().connected[socket.id].join(data._id)
                io.sockets.in(data._id).emit('createRoom', data)
                socketIdOfRoom[userAwait] = data._id
                socketIdOfRoom[socket.id] = data._id
                examing[data._id] = []
            }
        });

        socket.on('examing', (data) => {
            examing[data.roomId].push(data.indexQuestion)
            let count = 0
            examing[data.roomId].map(item => {
                if(item.toString() === (data.indexQuestion+'')) {
                    count++;
                }
            })

            // lose
            if(examing[data.roomId].indexOf(-1) !== -1) {
                console.log('-1 -1 -1')
                io.sockets.in(data.roomId).emit('startExaming', {
                    indexQuestion: -1
                })
            }

            // out
            if(examing[data.roomId].indexOf(-2) !== -1) {
                io.sockets.in(data.roomId).emit('startExaming', {
                    indexQuestion: -2
                })
            }

            if(count === 2) {
                io.sockets.in(data.roomId).emit('startExaming', {
                    indexQuestion: data.indexQuestion
                })
            }
            console.log('LIST examing', examing);
        });


        socket.on('doneExaming', (data) => {
            delete socketIdOfRoom[socket.id]
            delete examing[data.roomId]
            console.log('Room doneExaming', socketIdOfRoom);
            console.log('examing doneExaming', examing);
        })

        socket.on('disconnect', ()=>{
            io.sockets.in(socketIdOfRoom[socket.id]).emit('startExaming', {
                indexQuestion: -2
            })

            const index = listUserAwait.indexOf(socket.id);
            if (index > -1) {
                listUserAwait.splice(index, 1);
            }
            delete socketIdOfRoom[socket.id]
            delete emailSocketID[socket.id];
            console.log('Room disconnected', socketIdOfRoom);
            console.log('listUserAwait disconnected', listUserAwait);
        });
    });
};