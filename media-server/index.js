//1. import json-server

const jsonServer = require('json-server')

//2. create a server using json server
const mediaPlayerServer = jsonServer.create()

//3.setup path for the server
const router = jsonServer.router("db.json")

//4. return middleWare used by json server
const middleWare = jsonServer.defaults()//json->js conversion

//5. setup port number
const port = 4000 || process.env.port

//6.use middleware and port

mediaPlayerServer.use(middleWare)
mediaPlayerServer.use(router)

//7. to listen server for resolving requests from client
mediaPlayerServer.listen(port,()=>{
  console.log('listening on port '+port);
})