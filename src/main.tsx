import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/tailwind.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </>
);
