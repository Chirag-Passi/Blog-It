import React from "react";

export default function RegisterPage() {
    return (
        <form className="register">
            <h1>Register</h1>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
        </form>
    );
}