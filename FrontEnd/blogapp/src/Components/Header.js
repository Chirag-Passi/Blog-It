import React from "react";
import { Link } from "react-router-dom";

export default function Header () {
    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                <Link to="/Components/login">Login</Link>
                <Link to="/Components/register">Register</Link>
            </nav>
        </header>
    );
}