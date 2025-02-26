
export enum Status{
    Pending= 'pending',
    Completed = 'completed'
}

export interface ITodo{
    task: string;
    deadline: string;
    status: Status;
}