import React, { useState } from 'react';

function Register({ onAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.text();
            if (res.ok) {
                localStorage.setItem('jwt', data);
                onAuth();
            } else {
                setError(data);
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return ( <
        form onSubmit = { handleSubmit } >
        <
        h2 > Register < /h2> <
        input type = "email"
        placeholder = "Email"
        value = { email }
        onChange = { e => setEmail(e.target.value) }
        required / >
        <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = { e => setPassword(e.target.value) }
        required / >
        <
        button type = "submit" > Register < /button> {
            error && < div style = {
                    { color: 'red' } } > { error } < /div>} <
                /form>
        );
    }

    export default Register;