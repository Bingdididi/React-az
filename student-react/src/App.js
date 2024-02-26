import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import StudentListPage from "./pages/StudentListPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import NavBar from './components/NavBar';
import NotFoundPage from './pages/NotFoundPage';
import React from 'react';



function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/about" element={<AboutPage />} exact />
          <Route path="/list" element={<StudentListPage />} exact />
          <Route path="/detail/:id" element={<StudentDetailPage />} exact />
          {/* <Route path="/edit/:id" element={<UpdateStudent />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
