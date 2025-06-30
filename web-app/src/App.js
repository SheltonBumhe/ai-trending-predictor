import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import ShelFin from './ShelFin';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showShelFin, setShowShelFin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleAuth = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setShowShelFin(false);
    };

    if (!isLoggedIn) {
        return ( <
            div > {
                showLogin ? ( <
                    >
                    <
                    Login onAuth = { handleAuth }
                    /> <
                    p > Don 't have an account? <button onClick={() => setShowLogin(false)}>Register</button></p> <
                    />
                ) : ( <
                    >
                    <
                    Register onAuth = { handleAuth }
                    /> <
                    p > Already have an account ? < button onClick = {
                        () => setShowLogin(true) } > Login < /button></p >
                    <
                    />
                )
            } <
            /div>
        );
    }

    return ( <
        div >
        <
        nav style = {
            { marginBottom: 24 } } >
        <
        button onClick = {
            () => setShowShelFin(false) } > Main App < /button> <
        button onClick = {
            () => setShowShelFin(true) } > ShelFin < /button> <
        button onClick = { handleLogout }
        style = {
            { float: 'right' } } > Logout < /button> <
        /nav> {
            showShelFin ? ( <
                ShelFin userId = { 1 }
                />
            ) : ( <
                div >
                <
                h2 > Welcome!You are logged in . < /h2> <
                p > This is your main dashboard.Use the navigation above to access ShelFin
                for budgeting and analytics. < /p> <
                /div>
            )
        } <
        /div>
    );
}

export default App;