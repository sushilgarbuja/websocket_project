import { env } from 'process';
import app from './src/app';
import { envConfig } from './src/config/config';
import connection from './src/config/db';
import { Server } from 'socket.io';




//data receive garda on
//data send garda emit
//request socket
//api event
//req.body=data
//io le sbailai
//socket le conected lai matra


let io:Server | undefined;
function startServer() {
    connection();
    const port = envConfig.port||4000
    
   const server= app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
    io = new Server(server)
}


function getSocketIo(){
    if(!io){
        throw new Error('Socket.io not initialized');
    }
    return io;
}
startServer();
export {getSocketIo};