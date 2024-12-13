let express = require('express');
let app =express();

let http =require('http');
let server=http.Server(app);

let socketIO= require('socket.io');
let io =socketIO(server);

const port = process.env.PORT || 3000;
server.listen(port ,()=>{
  console.log(`Server demmaré sur le port :${port}`)
});

io.on('connexion', (socket)=>{
  socket.on('join',()=>{
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('Utilisateur jointé');

    socket.on('message', ()=>{
      socket.in(data.room).emit('nouveau message ',{user:data.user,message:data.message});
    });
  })
})




