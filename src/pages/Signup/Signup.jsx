import { useEffect, useState } from 'react'
import "./Signup.scss"
import { useNavigate } from "react-router-dom"
import { CameraAlt } from "@mui/icons-material"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert, hideAlert } from "../../redux/alertSlice"
import { CircularProgress } from '@mui/material'

const Error = ({ message, resp }) => {
    return <span className={`${resp ? 'error-responsive' : 'error'}`}>{message}</span>
}



const Signup = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(null);

    const loggedIn = useSelector((state) => state.user.loggedIn)
    useEffect(() => {
        const checkUser = () => {
            if (loggedIn) navigate("/")
        }
        checkUser();
    }, [loggedIn, navigate])

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            cpassword: ""
        }, validationSchema: Yup.object({
            firstname: Yup.string().required("firstname is required").max(10, "cannot have more than 10"),
            lastname: Yup.string().required("lastname is required").max(10, "cannot have more than 10"),
            username: Yup.string().required("username is required").max(10, "cannot have more than 10"),
            email: Yup.string().required("email is required").email("Invalid email"),
            password: Yup.string().required("password is required").min(5, "cannot be less than 5"),
            cpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords didn't match").required("Please Enter confirm password"),
        }), onSubmit: (values) => {
            handleFormSubmit(values)
        }
    })

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        const allowedTypes = ['jpg', 'jpeg', 'png'];
        let type = e.target.files[0].name.split(".").pop().toLowerCase()
        console.log(type)
        if (allowedTypes.includes(type)) {
            setFileError(null)
        }
        else {
            formik.errors.image = ""
            setFileError("only jpg/jpeg/png is allowed")
        }
        if (formik.errors.image) console.log(formik.errors.image)
        else console.log("No error")
    }

    const handleFormSubmit = async (data) => {
        setLoading(true);
        try {
            if (file) {
                const form = new FormData();
                let filename = Date.now() + file.name;
                form.append("name", filename);
                form.append("file", file);
                try {
                    const res = await axios.post("http://localhost:5000/api/upload/image", form)
                    console.log(res)
                    data.image = filename;
                } catch (err) {
                    console.log(err);
                }
            }
            const res = await axios.post("http://localhost:5000/users/signup", data, {
                headers: { "Content-Type": "application/json" }
            })
            if (res.status === 200) {
                dispatch(showAlert({ type: "success", message: "Account is created successfully" }))
                setTimeout(() => {
                    dispatch(hideAlert())
                }, 3000)
                navigate("/login")
            }
            else {
                dispatch(showAlert({ type: "fail", message: res.data.message }))
            }
            // console.log(res)
        } catch (err) {
            console.log(err)
        }
        setLoading(false);

    }

    return (
        <div className="signup-container">
            <div className="wrapper">
                <div className="title">Creat an Account</div>
                <form id="signup-form" onSubmit={formik.handleSubmit} className="form">
                    <div className="form-control">
                        <input placeholder='first name' className='input' type="text" {...formik.getFieldProps('firstname')} />
                        {formik.errors.firstname && formik.touched.firstname && <Error resp={false} message={formik.errors.firstname} />}
                    </div>
                    {formik.errors.firstname && formik.touched.firstname && <Error resp={true} message={formik.errors.firstname} />}
                    <div className="form-control">
                        <input placeholder='last name' className='input' type="text" {...formik.getFieldProps('lastname')} />
                        {formik.errors.lastname && formik.touched.lastname && <Error resp={false} message={formik.errors.lastname} />}
                    </div>
                    {formik.errors.lastname && formik.touched.lastname && <Error resp={true} message={formik.errors.lastname} />}
                    <div className="form-control">
                        <input placeholder='username' className='input' type="text" {...formik.getFieldProps('username')} />
                        {formik.errors.username && formik.touched.username && <Error resp={false} message={formik.errors.username} />}
                    </div>
                    {formik.errors.username && formik.touched.username && <Error resp={true} message={formik.errors.username} />}
                    <div className="form-control">
                        <input placeholder='email' className='input' type="email" {...formik.getFieldProps('email')} />
                        {formik.errors.email && formik.touched.email && <Error resp={false} message={formik.errors.email} />}
                    </div>
                    {formik.errors.email && formik.touched.email && <Error resp={true} message={formik.errors.email} />}
                    <div className="form-control">
                        <input placeholder='password' className='input' type="password" {...formik.getFieldProps('password')} />
                        {formik.errors.password && formik.touched.password && <Error resp={false} message={formik.errors.password} />}
                    </div>
                    {formik.errors.password && formik.touched.password && <Error resp={true} message={formik.errors.password} />}
                    <div className="form-control">
                        <input placeholder='confirm password' className='input' type="password" {...formik.getFieldProps('cpassword')} />
                        {formik.errors.cpassword && formik.touched.cpassword && <Error resp={false} message={formik.errors.cpassword} />}
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword && <Error resp={true} message={formik.errors.cpassword} />}
                    <label className='upload-img' style={{ position: "relative" }} htmlFor="profile">
                        <>
                            <CameraAlt className='icon' />{file ? file.name : "Upload Photo"}
                        </>
                    </label>
                    {fileError && <span style={{ color: "red", marginTop: "-9px" }}>{fileError}</span>}
                    <input id="profile" name="file" type="file" onChange={handleFileChange} hidden />
                    {loading ? <CircularProgress className="loader" /> : <button type='submit' disabled={fileError} className='form-submit'>submit</button>}

                </form>
            </div>
        </div>
    )
}



export default Signup