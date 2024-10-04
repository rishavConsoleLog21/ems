import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Employees,
  Login,
  Register,
  Profile,
  CreateEmployee,
  DetailedEmployee,
  DeleteEmployee,
  NotFound,
  UpdateEmployee,
} from "./pages";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/employee" element={<Employees />} />
              <Route path="/employee/create" element={<CreateEmployee />} />
              <Route
                path="/employee/details/:id"
                element={<DetailedEmployee />}
              />
              <Route path="/employee/delete/:id" element={<DeleteEmployee />} />
              <Route path="/employee/update/:id" element={<UpdateEmployee />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
