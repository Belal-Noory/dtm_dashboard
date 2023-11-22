import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <>
      <Navbar bg="info" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            href="/"
            style={{ fontWeight: "bold", fontVariant: "small-caps" }}
          >
            DTM Dashboard
          </Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
