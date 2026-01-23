/**
 * A lightweight EventEmitter for cross-component or cross-module communication.
 */
export class EventEmitter {
  private events: Record<string, Array<(...args: any[]) => void>> = {};

  /**
   * Subscribe to an event.
   * @returns An unsubscribe function.
   */
  on(event: string, callback: (...args: any[]) => void): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.off(event, callback);
  }

  /**
   * Unsubscribe from an event.
   */
  off(event: string, callback: (...args: any[]) => void): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  /**
   * Emit an event.
   */
  emit(event: string, ...args: any[]): void {
    if (!this.events[event]) return;
    this.events[event].forEach((cb) => cb(...args));
  }
}

export const globalEvents = new EventEmitter();
