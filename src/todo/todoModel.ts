import mongoose from "mongoose";
import { Status } from "./todoTypes";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: String,
    deadline: String,
    hello: String,
    status: {
        type:String,
        enum:[Status.Pending,Status.Completed],
        default: Status.Pending,
    },
    }
    );

    export default mongoose.model('Todo',todoSchema);