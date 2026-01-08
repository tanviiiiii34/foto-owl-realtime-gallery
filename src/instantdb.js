import { createClient } from "@instantdb/react";

export const db = createClient({
  appId: "c8e2eae7-7ef4-49ed-91cb-dfa5e56d144e", 
});

// Helper: reactions per image
export const reactionsCollection = "reactions";
