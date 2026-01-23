import {
  getAuthenticatedSession,
  setAuthenticatedSession,
  killAuthenticatedSession,
  getAuthenticatedSessionTokenParsed,
} from "../auth";
import * as SecureStore from "expo-secure-store";
import { kratosClient } from "../../authentication/kratosSdk";

// Mock SecureStore
jest.mock("expo-secure-store");

// Mock kratosSdk
jest.mock("../../authentication/kratosSdk", () => ({
  kratosClient: {
    toSession: jest.fn(),
  },
}));

describe("auth utils", () => {
  const mockToken = "mock-session-token";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAuthenticatedSession", () => {
    it("should return token if it exists", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await getAuthenticatedSession();
      expect(result).toBe(mockToken);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith("user_session");
    });

    it("should return null if it does not exist", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await getAuthenticatedSession();
      expect(result).toBeNull();
    });

    it("should delete item and return null on error", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValue(
        new Error("Error"),
      );

      const result = await getAuthenticatedSession();
      // The implementation catches error, logs it, deletes item and returns null
      expect(result).toBeNull();
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("user_session");
    });
  });

  describe("setAuthenticatedSession", () => {
    it("should set item if token is provided", async () => {
      await setAuthenticatedSession(mockToken);
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "user_session",
        mockToken,
      );
    });

    it("should kill session if token is not provided", async () => {
      await setAuthenticatedSession(undefined);
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("user_session");
    });
  });

  describe("killAuthenticatedSession", () => {
    it("should delete item", async () => {
      await killAuthenticatedSession();
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("user_session");
    });
  });

  // Note: getAuthenticatedSessionTokenParsed is complex due to kratosClient
  // We can test basic flow
  describe("getAuthenticatedSessionTokenParsed", () => {
    it("should return session data on success", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);
      const mockSession = { identity: { id: "123" } };
      (kratosClient.toSession as jest.Mock).mockResolvedValue({
        data: mockSession,
      });

      const result = await getAuthenticatedSessionTokenParsed();
      expect(result).toEqual(mockSession);
    });
  });
});
