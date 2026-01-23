import appTourReducer, {
  setShowHomeTourModal,
  setShowWillTourModal,
  setShowMyCircleTourModal,
} from "../appTour";

describe("appToursSlice", () => {
  const initialState = {
    showHomeTourModal: false,
    showWillTourModal: false,
    showMyCircleTourModal: false,
  };

  it("should return the initial state", () => {
    expect(appTourReducer(undefined, { type: undefined } as any)).toEqual(
      initialState,
    );
  });

  it("should handle setShowHomeTourModal", () => {
    const newState = appTourReducer(initialState, setShowHomeTourModal(true));
    expect(newState.showHomeTourModal).toBe(true);
    expect(newState.showWillTourModal).toBe(false); // Check others stay same
  });

  it("should handle setShowWillTourModal", () => {
    const newState = appTourReducer(initialState, setShowWillTourModal(true));
    expect(newState.showWillTourModal).toBe(true);
  });

  it("should handle setShowMyCircleTourModal", () => {
    const newState = appTourReducer(
      initialState,
      setShowMyCircleTourModal(true),
    );
    expect(newState.showMyCircleTourModal).toBe(true);
  });
});
