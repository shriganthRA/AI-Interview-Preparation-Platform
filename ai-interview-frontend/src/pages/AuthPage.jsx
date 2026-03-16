import React, { useEffect, useState } from 'react'
import { login, register } from '../services/AuthService'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRepassword] = useState("");

    useEffect(() => {

        if(isLogin) {
            document.title = "login";
        } else {
            document.title = "register";
        }
        
    }, [isLogin])


    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Running...");
        }, 1000);

        return(() => {
            clearInterval(timer)
            // timer
        })
    }, [])

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (password !== rePassword) {
                alert("Passwords do not match");
                return;
            }

            const response = await register({ name: username, email, password })

            console.log(response.data);
            alert("Registration successful!");
        } catch (error) {
            console.error(error);
            alert("Registration failed!");
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ email, password })

            // Save token
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("email", response.email);

            console.log(response.data);
            alert("Login successful!");
        } catch (error) {
            console.error(error);
            alert("Login failed!");
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-200'>
            <div className='flex gap-3'>
                {!isLogin ? (
                    <>
                        <h2 className='text-blue-600 font-bold mb-4 text-lg border-b'>Register</h2>
                        <h2 className='text-gray-500 font-bold mb-4 text-lg'>Login</h2>
                    </>
                ) : (
                    <>
                        <h2 className='text-gray-500 font-bold mb-4 text-lg'>Register</h2>
                        <h2 className='text-blue-600 font-bold mb-4 text-lg border-b'>Login</h2>
                    </>
                )}

            </div>

            <div className='bg-white border border-none rounded-lg px-8 py-8 text-center shadow-xl'>
                <h2 className='text-center text-gray-600 font-bold text-2xl mb-8'>Create a New Account</h2>
                <form onSubmit={isLogin ? handleLogin : handleRegister} className='flex flex-col items-center'>
                    {!isLogin && <input
                        className='border border-gray-300 rounded-lg w-100 mb-4 p-2 outline-none'
                        type="text"
                        placeholder='Enter your name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />}

                    <br />

                    <input
                        className='border border-gray-300 rounded-lg w-100 mb-4 p-2 outline-none'
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br />

                    <input
                        className='border border-gray-300 rounded-lg w-100 mb-4 p-2 outline-none'
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />

                    {!isLogin && <input
                        className='border border-gray-300 rounded-lg w-100 p-2 outline-none'
                        type="password"
                        placeholder='Confirm your password'
                        value={rePassword}
                        onChange={(e) => setRepassword(e.target.value)}
                    />}


                    {isLogin && <p className='ms-auto me-4'><a href="" className='font-medium text-blue-600'>Forgot password?</a></p>}


                    <button className='mt-4 w-110 bg-blue-600 text-white font-bold text-lg py-2 mb-4 cursor-pointer rounded-lg' type='submit'>{!isLogin ? "Register" : "Login"}</button>

                </form>

                {!isLogin ? (
                    <p>
                        Already have an account? <a href="" className='font-medium text-blue-600' onClick={(e) => {
                            e.preventDefault();
                            setIsLogin(!isLogin);
                        }}>Login</a>
                    </p>) : (
                    <p>
                        Don't you have an account? <a href="" className='font-medium text-blue-600' onClick={(e) => {
                            e.preventDefault();
                            setIsLogin(!isLogin);
                        }}>Register</a>
                    </p>)
                }
            </div>

        </div>
    )
}

export default AuthPage
