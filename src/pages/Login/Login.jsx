import React, { useEffect, useState } from 'react'
import "./Login.scss"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { loginFail, loginStart, loginSuccess } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { hideAlert, showAlert } from '../../redux/alertSlice'
import { CircularProgress } from '@mui/material'


const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loggedIn = useSelector((state) => state.user.loggedIn)
    useEffect(() => {
        const checkUser = () => {
            if (loggedIn) navigate("/home")
        }
        checkUser();
    }, [loggedIn, navigate])

    const handleFormData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const SubmitFormData = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            dispatch(loginStart())
            const res = await axios.post("http://localhost:5000/users/login", data, {
                headers: { "Content-Type": "application/json" }
            })
            dispatch(loginSuccess({ user: res.data.user, token: res.data.token }))
            dispatch(showAlert({ type: "success", message: "logged in successfully" }))
            navigate("/home")
        } catch (err) {
            dispatch(loginFail())
            dispatch(showAlert({ type: "fail", message: "Failed To login" }))
        }
        setLoading(false)
        setTimeout(() => {

            dispatch(hideAlert())
        }, 3000)
    }

    return (
        <div className="login-container">
            <div className="wrapper">
                <div className="info">
                    <span className="app-title">chat if you can</span>
                    <p className="app-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti illum deserunt laborum at eaque. Nostrum, perspiciatis dolores. Saepe ea iure, maiores neque quidem pariatur sequi eum quos eius, dolorem recusandae.</p>
                </div>

                <div className="login">
                    <div className="title">Sign in</div>
                    <form onSubmit={SubmitFormData} className="form">

                        <div className="form-control">
                            <input type="text" value={data.username} onChange={handleFormData} name='username' className="input" placeholder='Username' />
                        </div>
                        <div className="form-control">
                            <input type="password" value={data.password} onChange={handleFormData} name="password" className="input" placeholder='password' />
                        </div>
                        {loading ? <CircularProgress className="loader" /> : <button type='submit' className='form-submit'>sigin</button>}


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login