/// <reference types="vite/client" />

interface Window {
  Nui: {
    post(event: string, data = {}): Promise<any>;
    onEvent(type: string, func: any): void;
    emitEvent(type: string, payload: any): void;
  };
}
