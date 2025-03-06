import { Status } from './todoTypes';
import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from './todoModel';

class Todo {
    private io = getSocketIo();
    
    constructor() {
        this.io.on("connection", (socket: Socket) => {
            console.log("User connected");
            socket.on("addTodo", (data: any) => this.handleAddTodo(socket, data));
        });
    }

    private async handleAddTodo(socket: Socket, data: any) {
        // Handle the addTodo event
       try{
        const {task,deadline,status} = data
        console.log(data);
        await todoModel.create({
            task,
            deadline,
            status,
        })
        const todos=await todoModel.find();
        socket.emit("todos_updated",{
            status:"success",
            data:todos
        })
    
       }catch(error){
        socket.emit("todo_response",{
            status:"error",
            error
       })
    }
}
}

export default new Todo();
