import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import "./css/Header.css";
function App() {
  return (
    <RouterProvider router={Router}>
    <div className="app-container">
        <main className="main-content">
        </main>
    </div>
    </RouterProvider>
  );
}

export default App;
