import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./ui/base/Layout";
import CustomerApp from "./ui/customer/CustomerApp";
import Create from "./ui/customer/Create";
import Edit from "./ui/customer/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CustomerApp />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
