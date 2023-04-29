import { appActions, appReducer } from "app/appSlice";


let startState = {} as ReturnType<typeof appReducer>

beforeEach(() => {
  startState = { status: "idle", error: null, isInitialized: false };
});

test("correct error message should be set", () => {
  const endState = appReducer(startState, appActions.setAppError({ error: "some error" }));
  expect(endState.error).toBe("some error");
});

test("isInitialized should be changed", () => {
  const endState = appReducer(startState, appActions.setAppInitialized({ isInitialized: true }));
  expect(endState.isInitialized).toBe(true);
});



