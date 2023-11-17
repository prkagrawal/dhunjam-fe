import React from "react";
import "./App.css";
import Form from "./components/AdminLogin";
// import AdminContext from './context/AdminContext';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/DashBoard";

function App() {
  const [admin, setAdmin] = React.useState(null);

  return (
    <div className="App">
      {/* <AdminContext.Provider value={{admin, setAdmin}}> */}
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* </AdminContext.Provider> */}
    </div>
  );
}

export default App;
