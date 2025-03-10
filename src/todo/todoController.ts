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
            
            socket.on("deleteTodo", (data: any) => this.handleDeleteTodo(socket, data));
            socket.on("updateTodoStatus",(data)=>this.handleUpdateTodoStatus(socket,data));
        });
    }

    private async handleAddTodo(socket: Socket, data: any) {
        // Handle the addTodo event
        try {
            const { task, deadline, status } = data;
            console.log(data);
            await todoModel.create({
                task,
                deadline,
                status,
            })
            const todos = await todoModel.find({status :Status.Pending})
            socket.emit("todos_updated", {
                status: "success",
                data: todos
            });
        } catch (error) {
            socket.emit("todo_response", {
                status: "error",
                error
            });
        }
    }

    private async handleDeleteTodo(socket: Socket, data: any) {
        try {
            // Handle the deleteTodo event
        const { id } = data;
        const deletedTodo=await todoModel.findByIdAndDelete(id);
        if(!deletedTodo){
            socket.emit("todo_response", {
                status: "error",
                error: "Todo not found"
            })
            return;
        }
        const todos = await todoModel.find({status:Status.Pending})
        socket.emit("todos_updated", {
            status: "success",
            data: todos
        })
        }
         catch (error) {
            socket.emit("todo_response", {
                status: "error",
                error
            });
        }
    }
    private async handleUpdateTodoStatus(socket:Socket,data:{id:string,status:Status}){
        try{
        const{id,status}=data;
        const todo=await todoModel.findByIdAndUpdate(id,{status});
        if(!todo){
            socket.emit("todo_response", {
                status: "error",
                error: "Todo not found"
            })
            return;
        }
        const todos = await todoModel.find({status:Status.Pending})
        socket.emit("todos_updated", {
            status: "success",
            data: todos
        })
        } catch (error) {
            socket.emit("todo_response", {
                status: "error",
                error
            });
    }
}
}

export default new Todo();
