import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "../features/TodolistsList/tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ]
    };
})

test("correct task should be deleted from correct array", () => {
    const action = removeTaskAC("todolistId2", "2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
    let newTask = {
        description: "",
        title: "Homeworks",
        status: 0,
        priority: 0,
        startDate: "",
        deadline: "",
        id: "someId",
        todoListId: "todolistId2",
        order: 1,
        addedDate: ""
    }

    const action = addTaskAC("todolistId2", newTask);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("Homeworks");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test("status of specified task should be changed", () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});

test("title of specified task should be changed", () => {
    const action = changeTaskTitleAC("2", "Milkyway", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test("new property with new array should be added when new todolist is added", () => {
    const action = addTodolistAC("title no matter", "some-ID");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test("property with todolistId should be deleted", () => {


    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});




