import {todolistReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListsType} from "../App";

test("correct todolist should be removed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, {type: "ADD-TODOLIST", title: newTodolistTitle})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

