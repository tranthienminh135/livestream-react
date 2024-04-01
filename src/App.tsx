import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./ui/base/Layout";
import EmployeeApp from "./ui/employee/EmployeeApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
