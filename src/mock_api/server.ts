// src/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers/index";

// Create the mock server with all handlers
export const server = setupServer(...handlers);
