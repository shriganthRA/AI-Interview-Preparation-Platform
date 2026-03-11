import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				"",
				{
					email,
					password
				}
			)

			console.log(response.data);
			alert("Login successful!");
		} catch (error) {
			console.error(error);
			alert("Login failed!");
		}
	}

	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
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

				<button type='submit'>Login</button>
			</form>

			<p>
				Don't you have an account?
				{/* <Link to="/register"> Register</Link> */}
			</p>
		</div>
	)
}

export default Login
