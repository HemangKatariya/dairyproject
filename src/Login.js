import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Navv from './Navv';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Login() {
    const [LoginData, setLoginData] = useState([]);
    const [userid, setuserid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setLoginData(JSON.parse(localStorage.getItem('newData')));
    }, []);

    const handleuseridChange = (e) => {
        setuserid(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async () => {
        if (!userid || !password) {
            toast.error('Please provide both your User ID and Password to continue.');
            return;
        }
        let loggedInUser = null;

        for (let i = 0; i < LoginData.length; i++) {
            let num = LoginData[i].UserId;
            if (num.toString() === userid && LoginData[i].password === password) {
                loggedInUser = LoginData[i];
                break;
            }
        }

        if (loggedInUser) {
            toast('Successfully Logged in');
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            setuserid('');
            setPassword('');
            await new Promise(resolve => setTimeout(resolve, 3650));

            navigate('/ViewMySelf');
        } else {
            toast.error('Please Check Details');
        }
    };
    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
            />
            <Navv />
            <div className="main">

                <div className="main__form">


                    <div className="main__form__inputs">
                        <h3>Customer Login</h3>
                        <div>
                            <input
                                type="number"
                                placeholder="USER ID"
                                className="userid"
                                required
                                id="input1"
                                name='userid'
                                value={userid}
                                onChange={handleuseridChange}
                            />
                            <span id="span1"></span>
                        </div>
                        <div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="  PASSWORD"
                                required
                                id="input2"
                                name='password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <i onClick={togglePasswordVisibility}>{eye} </i>
                        </div>
                        <h6>Don't Have An Account? <b>SignUp From Below!</b></h6>
                    </div>

                    <div className="main__form__buttons">
                        <Link to="/SignUp" className="main__form__buttons__btn1 button" id="register">
                            <span>SignUp !</span>
                        </Link>
                        <button className="main__form__buttons__btn2 button" onClick={handleSignIn}>
                            <span>SIGN IN  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right mb-1" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg> </span>

                        </button>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
