import React, { useState } from 'react'
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRepassword] = useState("");

    // Pass the data to Backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password === rePassword) {
                const response = await axios.post(
                    "",
                    {
                        username,
                        email,
                        password
                    }
                );

                console.log(response.data);
                alert("Registration successful!");
            }
        } catch (error) {
            console.error(error);
            alert("Registration failed!");
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br />

                <input
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />

                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <input
                    type="password"
                    placeholder='ReType-Password'
                    value={rePassword}
                    onChange={(e) => setRepassword(e.target.value)}
                />

                <br />

                <button type='submit'>Register</button>

            </form>

            <p>
                Already have an account?
                <Link to="/"> Login</Link>
            </p>
        </div>
    )
}

export default Register
