import React, { useState } from 'react';

function RoleAuth({ onVerified, role }) {
    const [verificationCode, setVerificationCode] = useState('');
    const [errors, setErrors] = useState(null);

    function verifyCode(role, code) {
        if (role === 'admin' && code === '123') return true;
        else if (role === 'manager' && code === '321') return true;

        else return false;
    }

    const handleChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const isValid = verifyCode(role, verificationCode);
        if (isValid) {
            onVerified(true);
        } else {
            setErrors([`${role} verification failed. Please check your code and try again.`]);
        }
    };

    const placeholderText = role === 'admin' ? "Admin Verification Code" : "Manager Verification Code";

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" name="verificationCode" placeholder={placeholderText} onChange={handleChange} />
            <button type="submit">Verify</button>
            {errors && <div className="errors">{errors}</div>}
        </form>
    );
}

export default RoleAuth;
