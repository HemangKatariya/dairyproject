import React from 'react';
import './Signup.css'; // Import the CSS file
import Navv from './Navv';

export default function Signup() {
    return (
        <div className="signup-page">
            <Navv />
            <h2>Sign Up</h2>
            {/* Other signup form elements go here */}
            <div className="coming-soon">
                <p>We apologize, but this feature is currently under development and will be available soon.</p>
            </div>
            <div className="login-note">
                {/* <p>Please log in using your UserID and password for now.</p> */}
                <p>For the time being, kindly log in using your UserID and password.</p>
            </div>
        </div>
    );
}
