import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./views/RegistrationForm";
import Login from "./views/login"; // Your Login form component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
