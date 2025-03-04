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

function startServer() {
    connection();
    const port = envConfig.port||4000
    
   const server= app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
    const io = new Server(server)
    io.on("connection",(socket)=>{
        socket.on("haha",(data)=>{
            console.log(data) 
            io.emit("response",{
            message:"sushil"
        })
    })
        console.log("socket connected")
    })

}

startServer();