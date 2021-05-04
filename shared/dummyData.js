import Task from "./models/task";
const taskList = [
    new Task(new Date().getTime(), "Write an App"),
    new Task(new Date().getTime() + 1, "Write App 2"),
    new Task(new Date().getTime() + 12, "Write App 3 "),
    new Task(new Date().getTime() + 33, "Lunch"),
    new Task(new Date().getTime() + 24, "Second Lunch"),
    new Task(new Date().getTime() + 55, "Linner"),
];

export default taskList;
