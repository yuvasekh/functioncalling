import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import Header from '../components/layout/Header'
const AppRouter = () => {

  return (<div>
    <Header />
    <Routes>

      <Route path="/" element={<Home />} />
    </Routes>

  </div>)
}
export default AppRouter