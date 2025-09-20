import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from "react-dom/client"
import { App } from "./App"

const qc = new QueryClient()

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={qc}>
        <App />
    </QueryClientProvider>
)
