import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
