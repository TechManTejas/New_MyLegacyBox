import { getTimeGreeting } from "../timeUtils";

describe("getTimeGreeting", () => {
  it('should return "Good morning" for hours between 5 and 11', () => {
    expect(getTimeGreeting(5)).toBe("Good morning");
    expect(getTimeGreeting(8)).toBe("Good morning");
    expect(getTimeGreeting(11)).toBe("Good morning");
  });

  it('should return "Good afternoon" for hours between 12 and 16', () => {
    expect(getTimeGreeting(12)).toBe("Good afternoon");
    expect(getTimeGreeting(14)).toBe("Good afternoon");
    expect(getTimeGreeting(16)).toBe("Good afternoon");
  });

  it('should return "Good evening" for hours between 17 and 4', () => {
    expect(getTimeGreeting(17)).toBe("Good evening");
    expect(getTimeGreeting(20)).toBe("Good evening");
    expect(getTimeGreeting(23)).toBe("Good evening");
    expect(getTimeGreeting(0)).toBe("Good evening");
    expect(getTimeGreeting(4)).toBe("Good evening");
  });

  it("should use the current hour if no parameter is provided", () => {
    const currentHour = new Date().getHours();
    let expectedGreeting = "";

    if (currentHour >= 5 && currentHour < 12) {
      expectedGreeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      expectedGreeting = "Good afternoon";
    } else {
      expectedGreeting = "Good evening";
    }

    expect(getTimeGreeting()).toBe(expectedGreeting);
  });
});
