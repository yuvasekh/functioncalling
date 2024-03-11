import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";

const AppRouter=()=>
{
    return(<div>
           <Routes>

              <Route path="/" element={<Home />}/>
                </Routes>
          
    </div>)
}
export default AppRouter