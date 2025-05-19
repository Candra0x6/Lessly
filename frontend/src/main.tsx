import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import App from "./App";
import { ActorProvider, AgentProvider } from "@ic-reactor/react";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { canisterId, idlFactory } from "@declarations/user";
import { ThemeProvider } from "next-themes";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
        <ThemeProvider
          attribute="class"          // put dark/light class on <html>
          defaultTheme="system"      // ’light’ | ’dark’ | ’system’
          enableSystem
          disableTransitionOnChange  // avoids flicker
        >
          <App />
        </ThemeProvider>
      </ActorProvider>
    </AgentProvider>
  </React.StrictMode>
);
