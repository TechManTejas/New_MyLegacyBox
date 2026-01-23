import authReducer, {
  setSessionRedux,
  clearSessionRedux,
} from "../authentication";

describe("authSlice", () => {
  const initialState = {
    session: null,
    sessionToken: null,
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: undefined } as any)).toEqual(
      initialState,
    );
  });

  it("should handle setSessionRedux", () => {
    const mockPayload = {
      session: { user: "test-user" },
      session_token: "test-token",
    };

    // cast payload to any because the slice is loosely typed in source
    const newState = authReducer(initialState, setSessionRedux(mockPayload));

    expect(newState).toEqual({
      session: mockPayload.session,
      sessionToken: mockPayload.session_token,
    });
  });

  it("should handle clearSessionRedux", () => {
    // Setup a state that has data
    const currentState = {
      session: { user: "test" },
      sessionToken: "token",
    };

    // Unfortunately, the clearSessionRedux implementation in the source file:
    // clearSessionRedux: (state) => {
    //   state = initialState;
    // },
    // This mutates 'state' local variable but because it assigns a new object to 'state', it might not work as intended with Immer
    // if it doesn't return the new state.
    // Immer expects you to either mutate the existing draft OR return a new state.
    // Reassigning the 'state' argument variable itself does nothing in JS.
    // Let's test this behavior. If it fails, we found a bug!

    const newState = authReducer(currentState as any, clearSessionRedux());

    // If the bug exists, newState will still be currentState.
    // If it works (meaning my understanding of the specific implementation details vs Immer is slightly off or it was fixed), it will be initialState.

    // Based on common Redux Toolkit mistakes: `state = initialState` does NOT work.
    // It should be `return initialState;`

    // Let's write the expectation for what it SHOULD be, and see if it fails.
    expect(newState).toEqual(initialState);
  });
});
