import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Commented out service worker and web vitals to prevent build errors
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <
    React.StrictMode >
    <
    App / >
    <
    /React.StrictMode>
);

// If you want to enable PWA support in future:
// serviceWorkerRegistration.register();

// If you want to measure performance in future:
// reportWebVitals(console.log);