import {TasksStateType} from "../App"
import {v1} from "uuid";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer"


test("task should be added in correct todolist", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let newTitle: string = "React"

    let startState: TasksStateType = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Butter", isDone: true},
        ]
    };

    let endState: TasksStateType = tasksReducer(startState, addTaskAC(todolistID1, newTitle))

    expect(endState[todolistID1].length).toBe(3)
    expect(endState[todolistID1][0].title).toBe(newTitle)

})


test("correct task should be removed", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: "1", title: "Milk", isDone: false},
            {id: "2", title: "Butter", isDone: true},
            {id: "3", title: "Sugar", isDone: false},
        ]
    };

    let endState: TasksStateType = tasksReducer(startState, removeTaskAC(todolistID2, "3"))

    expect(endState[todolistID2].length).toBe(2)
})

test("correct task should change status", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: "1", title: "Milk", isDone: false},
            {id: "2", title: "Butter", isDone: true},
        ]
    };

    let endState: TasksStateType = tasksReducer(startState, changeTaskStatusAC(todolistID2, "1", true))

    expect(endState[todolistID2]['1'].isDone).toBe(true)
})