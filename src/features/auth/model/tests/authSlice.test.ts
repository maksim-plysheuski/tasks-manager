import { authSlice, authThunks } from "features/auth/model/authSlice";


let startState = {} as ReturnType<typeof authSlice>;

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    userProfile: {
      id: 123,
      email: "alex@gmail.com",
      login: "alex"
    }
  };
});


describe("Auth Reducer", () => {
  it("should set user profile when initializeApp.fulfilled is dispatched", () => {
    const profile = { id: 789, email: "alex@tests.com", login: "alex007" };

    const endState = authSlice(startState, authThunks.initializeApp.fulfilled({
      profile,
      isLoggedIn: true
    }, "requestId"));

    expect(endState.userProfile).toEqual(profile);
    expect(endState.isLoggedIn).toBe(true);
  });


  it("should set isLoggedIn to false when logout.fulfilled is dispatched", () => {
    const endstate = authSlice(startState, authThunks.logout.fulfilled({ isLoggedIn: false }, "requestId"));

    expect(endstate.isLoggedIn).toBe(false);
  });
});
