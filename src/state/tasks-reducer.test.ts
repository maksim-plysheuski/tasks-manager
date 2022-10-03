import {TasksStateType} from "../App"
import {v1} from "uuid";
import {addTaskAC, tasksReducer} from "./tasks-reducer"


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
