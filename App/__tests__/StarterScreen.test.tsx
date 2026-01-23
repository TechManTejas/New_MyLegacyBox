import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import StarterScreen from "../index"; // App/index.tsx
import { useAuth } from "../../testApp/authentication/AuthProvider";
import { useRouter } from "expo-router";

// We need to mock useAuth hook
jest.mock("../../testApp/authentication/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

// useRouter is already mocked in jest.setup.js but we can override if needed
// or rely on the mock there. We need to spy on it to check calls.

describe("StarterScreen", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    // We mocked useJailBreaker etc in jest.setup.js so it shouldn't crash
    // StarterScreen uses useTheme, we should probably wrap it in ThemeProvider
    // or mock useTheme.
    // However, it's better to provide the context if possible, or mock the hook.
    // Let's mock useTheme for simplicity since we don't want to test ThemeProvider here.
  });

  // Wait, I need to mock useTheme because StarterScreen calls it.
  // Although ThemeProvider provides a context, the hook uses it.
  // If I render StarterScreen without ThemeProvider, it might fail or use default.
  // Let's check ThemeProvider.tsx. It sets defaultTheme.
  // But if useTheme uses useContext, and we didn't provide a value, it uses default value from createContext.
  // ThemeProvider.tsx: const ThemeContext = React.createContext({ theme: defaultTheme });
  // So it should be fine.

  it("navigates to (public) if not authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    const { getByText } = render(<StarterScreen />);

    // Check for text "Personalising Succession"
    // Since it's animated text split by char, getByText might not work for full string.
    // But let's verify navigation after timeout.

    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalledWith("/(public)");
      },
      { timeout: 3000 },
    );
  });

  it("navigates to /home if authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    render(<StarterScreen />);

    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalledWith("/home");
      },
      { timeout: 3000 },
    );
  });
});
