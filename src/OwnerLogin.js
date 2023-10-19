import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styles
import './OwnerLogin.css';
import Navv from './Navv';
import { ToastContainer } from 'react-toastify';
import CustomerDataBase from './CustomerDataBase';
import { useNavigate } from 'react-router';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


export default function OwnerLogin() {
    const eye = <FontAwesomeIcon icon={faEye} />;
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
    const loginCredentials = {
        email: 'hemang1234@gmail.com',
        password: 'mayur1234',
    };
    const navigate = useNavigate()
    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);

        if (values.email === loginCredentials.email && values.password === loginCredentials.password) {
            toast('Login successful');
            await new Promise(resolve => setTimeout(resolve, 3650));
            navigate('/CustomerDataBase')

        } else {
            toast.error('Please check Email and Password');
        }

        resetForm();


    };

    return (
        <div>

            <div className='body'>

                <div className="content">
                    <div className="text">Owner Login</div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                <div className="field">
                                    <span className="fas fa-user"></span>
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        required
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div className="field">
                                    <span className="fas fa-lock"></span>
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <i onClick={togglePasswordVisibility}>{eye} </i>
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>
                                <button type="submit" className="mt-5 buttonnn">
                                    Sign in
                                </button>
                                <a href="Home">Go To Home</a>
                            </Form>
                        )}
                    </Formik>
                    <ToastContainer position="top-center" autoClose={3000} />
                </div>
            </div>
        </div>
    );
}
