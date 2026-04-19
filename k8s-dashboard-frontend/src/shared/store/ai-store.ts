import { create } from "zustand";

export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface AiStore {
  isOpen: boolean;
  messages: AiMessage[];
  isLoading: boolean;
  openPanel: () => void;
  closePanel: () => void;
  addMessage: (message: Omit<AiMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
}

export const useAiStore = create<AiStore>((set) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),
  addMessage: (message) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { ...message, id: crypto.randomUUID(), timestamp: new Date() },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
}));
