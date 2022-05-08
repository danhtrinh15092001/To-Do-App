export interface FormData {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
}

export interface Task {
    id: number;
    nameTask: string;
    deadline: Date;
    description: string;
    tasksDetail: [];
}

export interface TaskDetail {
    id: number;
    nameTaskDetail: string;
    state: State;
}

export enum State {
    ToDo,
    Done,
}

export enum TaskStatus {
    ToDo = "To Do",
    InProgress = "In Progress",
    Done = "Done",
}
