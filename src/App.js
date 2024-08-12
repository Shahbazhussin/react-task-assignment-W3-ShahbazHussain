import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Listing from "./components/Listing/Listing";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/listing" element={<Listing />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
