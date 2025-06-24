import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { ThemeProvider } from "./context/ThemeContext.jsx"

const rootElement = document.getElementById("root")

if (!rootElement) {
  console.error("Root element not found. Available elements:", document.body.innerHTML)
  throw new Error("Root element not found. Make sure there's a div with id='root' in your HTML.")
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
