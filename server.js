const express=require('express')
const socketio=require('socket.io')
const http=require('http')
const router=require('./routers/router')
const {addUser,getUser,getUsersInRoom,removeUser}=require('./users')
const cors=require('cors')

const app=express()
const server=http.createServer(app)
const io=socketio(server)
app.use(router)
app.use(cors)
const PORT=process.env.PORT||5000
io.on('connect',(socket)=>{
 socket.on('join',({name,room},callback)=>{
  const {error,user}=addUser({id:socket.id,name,room})
  if(error){
    return callback(error)
  }
  socket.join(user.room);
  socket.emit('message',{user:'admin','text':`${user.name} welcome to ${user.room}`})
  socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} was joined in ${user.room}`})
   io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
  callback()
 })
 socket.on('sendMessage',(message,callback)=>{
    const user =getUser(socket.id)
    io.to(user.room).emit('message',{user:user.name,text:message})
    callback()
 });
 socket.on('disconnect',()=>{
  const user =removeUser(socket.id)
  if(user){
   io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left ${user.room}`})}
 })
})

server.listen(PORT,()=>{console.log(`server started at ${PORT}`)})