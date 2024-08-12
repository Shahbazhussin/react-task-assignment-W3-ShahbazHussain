import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

    //Email and Password made by UseRef to avoid unneccesary rendering
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // To restrict to navigate to Login Page if login
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/listing");
        }
    }, [navigate]);

    const handleLogin = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email.includes("@")) {
            setError("Please enter a valid email.");
            return;
        }
        if (!password) {
            setError("Password cannot be empty.");
            return;
        }

        try {
            const response = await axios.post("https://dummyjson.com/auth/login", {
                username: email,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                console.log(response.data.token);
                setError("");
                window.location.href = "/listing";
            } else {
                setError("Invalid login credentials.");
            }
        } catch (err) {
            //   setError("Something went wrong. Please try again later.");
            setError("Invalid login credentials.");

        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <input ref={emailRef} type="text" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
