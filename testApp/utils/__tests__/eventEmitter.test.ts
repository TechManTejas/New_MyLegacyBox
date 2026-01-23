import { EventEmitter } from "../eventEmitter";

describe("EventEmitter", () => {
  it("should emit events to subscribers", () => {
    const emitter = new EventEmitter();
    const callback = jest.fn();

    emitter.on("test", callback);
    emitter.emit("test", "payload");

    expect(callback).toHaveBeenCalledWith("payload");
  });

  it("should unsubscribe correctly", () => {
    const emitter = new EventEmitter();
    const callback = jest.fn();

    const unsubscribe = emitter.on("test", callback);
    unsubscribe();
    emitter.emit("test");

    expect(callback).not.toHaveBeenCalled();
  });
});
