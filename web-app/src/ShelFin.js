// Author: Shelton Bumhe
// ShelFin.js - Main dashboard for ShelFin web app
// Provides transaction entry, analytics, and professional inflation-adjusted dashboard

import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './ShelFin.css';
import Papa from 'papaparse';
import Select from 'react-select';
import CountryFlag from 'react-country-flag';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CURRENCIES = [{
        value: 'USD',
        label: < > < CountryFlag countryCode = "US"
        svg style = {
            { width: 20 }
        }
        /> USD</ >
    },
    {
        value: 'EUR',
        label: < > < CountryFlag countryCode = "EU"
        svg style = {
            { width: 20 }
        }
        /> EUR</ >
    },
    {
        value: 'GBP',
        label: < > < CountryFlag countryCode = "GB"
        svg style = {
            { width: 20 }
        }
        /> GBP</ >
    },
    {
        value: 'INR',
        label: < > < CountryFlag countryCode = "IN"
        svg style = {
            { width: 20 }
        }
        /> INR</ >
    },
    {
        value: 'JPY',
        label: < > < CountryFlag countryCode = "JP"
        svg style = {
            { width: 20 }
        }
        /> JPY</ >
    },
    {
        value: 'AUD',
        label: < > < CountryFlag countryCode = "AU"
        svg style = {
            { width: 20 }
        }
        /> AUD</ >
    },
    {
        value: 'CAD',
        label: < > < CountryFlag countryCode = "CA"
        svg style = {
            { width: 20 }
        }
        /> CAD</ >
    },
    {
        value: 'CHF',
        label: < > < CountryFlag countryCode = "CH"
        svg style = {
            { width: 20 }
        }
        /> CHF</ >
    },
    {
        value: 'CNY',
        label: < > < CountryFlag countryCode = "CN"
        svg style = {
            { width: 20 }
        }
        /> CNY</ >
    },
    {
        value: 'BRL',
        label: < > < CountryFlag countryCode = "BR"
        svg style = {
            { width: 20 }
        }
        /> BRL</ >
    },
];
const COUNTRIES = [{
        value: 'US',
        label: < > < CountryFlag countryCode = "US"
        svg style = {
            { width: 20 }
        }
        /> United States</ >
    },
    {
        value: 'UK',
        label: < > < CountryFlag countryCode = "GB"
        svg style = {
            { width: 20 }
        }
        /> United Kingdom</ >
    },
    {
        value: 'EU',
        label: < > < CountryFlag countryCode = "EU"
        svg style = {
            { width: 20 }
        }
        /> European Union</ >
    },
    {
        value: 'IN',
        label: < > < CountryFlag countryCode = "IN"
        svg style = {
            { width: 20 }
        }
        /> India</ >
    },
    {
        value: 'JP',
        label: < > < CountryFlag countryCode = "JP"
        svg style = {
            { width: 20 }
        }
        /> Japan</ >
    },
    {
        value: 'AU',
        label: < > < CountryFlag countryCode = "AU"
        svg style = {
            { width: 20 }
        }
        /> Australia</ >
    },
    {
        value: 'CA',
        label: < > < CountryFlag countryCode = "CA"
        svg style = {
            { width: 20 }
        }
        /> Canada</ >
    },
    {
        value: 'CH',
        label: < > < CountryFlag countryCode = "CH"
        svg style = {
            { width: 20 }
        }
        /> Switzerland</ >
    },
    {
        value: 'CN',
        label: < > < CountryFlag countryCode = "CN"
        svg style = {
            { width: 20 }
        }
        /> China</ >
    },
    {
        value: 'BR',
        label: < > < CountryFlag countryCode = "BR"
        svg style = {
            { width: 20 }
        }
        /> Brazil</ >
    },
];

function ShelFin({ userId }) {
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({ date: '', amount: '', category: '', type: 'expense', description: '' });
    const [spendingByCategory, setSpendingByCategory] = useState({});
    const [spendingByMonth, setSpendingByMonth] = useState({});
    const [tips, setTips] = useState([]);
    const [inflation, setInflation] = useState({});
    const [show, setShow] = useState(false);
    const [recurringTemplates, setRecurringTemplates] = useState([]);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [liveInflation, setLiveInflation] = useState({});
    const [liveInterest, setLiveInterest] = useState({});
    const [analytics, setAnalytics] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [showReal, setShowReal] = useState(true);

    // Fetch all data
    useEffect(() => {
        setShow(true);
        fetch(`/api/transactions/${userId}`)
            .then(res => res.json()).then(setTransactions);
        fetch(`/api/shelfin/analytics/spending-by-category/${userId}`)
            .then(res => res.json()).then(setSpendingByCategory);
        fetch(`/api/shelfin/analytics/spending-by-month/${userId}`)
            .then(res => res.json()).then(setSpendingByMonth);
        fetch(`/api/shelfin/analytics/tips/${userId}`)
            .then(res => res.json()).then(setTips);
        fetch(`/api/shelfin/inflation`)
            .then(res => res.json()).then(setInflation);
        fetch(`/api/transactions/${userId}`)
            .then(res => res.json())
            .then(data => setRecurringTemplates(data.filter(tx => tx.recurring)));
        fetch('/api/shelfin/rates/inflation').then(res => res.json()).then(setLiveInflation);
        fetch('/api/shelfin/rates/interest').then(res => res.json()).then(setLiveInterest);
        fetch(`/api/shelfin/analytics/inflation-adjusted/${userId}?currency=${selectedCurrency.value}&country=${selectedCountry.value}`)
            .then(res => res.json()).then(setAnalytics);
    }, [userId, selectedCurrency, selectedCountry]);

    // Add transaction
    const handleSubmit = async(e) => {
        e.preventDefault();
        await fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...form, userId })
        });
        setForm({ date: '', amount: '', category: '', type: 'expense', description: '' });
        // Refresh data
        fetch(`/api/transactions/${userId}`).then(res => res.json()).then(setTransactions);
    };

    // Edit recurring template
    const handleEditTemplate = (template) => {
        setEditingTemplate(template);
        setForm({
            date: template.date,
            amount: template.amount,
            category: template.category,
            type: template.type,
            description: template.description,
            recurring: true,
            currency: template.currency || 'USD',
        });
    };

    // Delete recurring template
    const handleDeleteTemplate = async(id) => {
        await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
        setRecurringTemplates(recurringTemplates.filter(t => t.id !== id));
    };

    // Save (update) recurring template
    const handleSaveTemplate = async(e) => {
        e.preventDefault();
        await fetch(`/api/transactions/${editingTemplate.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...form, userId, recurring: true })
        });
        setEditingTemplate(null);
        setForm({ date: '', amount: '', category: '', type: 'expense', description: '', recurring: false });
        fetch(`/api/transactions/${userId}`)
            .then(res => res.json())
            .then(data => setRecurringTemplates(data.filter(tx => tx.recurring)));
    };

    return ( <
            >
            <
            div className = "shelfin-bg" / >
            <
            div className = "shelfin-overlay" / >
            <
            CSSTransition in = { show }
            timeout = { 400 }
            classNames = "shelfin-fade"
            appear unmountOnExit >
            <
            div className = "shelfin-content" >
            <
            h2 > ShelFin: Smart Personal Budgeting < /h2> <
            form onSubmit = { handleSubmit }
            style = {
                { marginBottom: 24 } } >
            <
            input type = "date"
            value = { form.date }
            onChange = { e => setForm(f => ({...f, date: e.target.value })) }
            required / >
            <
            input type = "number"
            step = "0.01"
            placeholder = "Amount"
            value = { form.amount }
            onChange = { e => setForm(f => ({...f, amount: e.target.value })) }
            required / >
            <
            input type = "text"
            placeholder = "Category"
            value = { form.category }
            onChange = { e => setForm(f => ({...f, category: e.target.value })) }
            required / >
            <
            select value = { form.type }
            onChange = { e => setForm(f => ({...f, type: e.target.value })) } >
            <
            option value = "expense" > Expense < /option> <
            option value = "income" > Income < /option> <
            /select> <
            input type = "text"
            placeholder = "Description"
            value = { form.description }
            onChange = { e => setForm(f => ({...f, description: e.target.value })) }
            /> <
            button type = "submit" > Add Transaction < /button> <
            /form> <
            h3 > Recurring Transaction Templates < /h3> <
            table border = "1"
            cellPadding = "4"
            style = {
                { marginBottom: 16 } } >
            <
            thead >
            <
            tr > < th > Date < /th><th>Amount</th > < th > Category < /th><th>Type</th > < th > Currency < /th><th>Description</th > < th > Actions < /th></tr >
            <
            /thead> <
            tbody > {
                recurringTemplates.map(template => ( <
                    tr key = { template.id } >
                    <
                    td > { template.date } < /td> <
                    td > { template.amount } < /td> <
                    td > { template.category } < /td> <
                    td > { template.type } < /td> <
                    td > { template.currency } < /td> <
                    td > { template.description } < /td> <
                    td >
                    <
                    button onClick = {
                        () => handleEditTemplate(template) } > Edit < /button> <
                    button onClick = {
                        () => handleDeleteTemplate(template.id) }
                    style = {
                        { marginLeft: 8 } } > Delete < /button> <
                    /td> <
                    /tr>
                ))
            } <
            /tbody> <
            /table> {
                editingTemplate && ( <
                    form onSubmit = { handleSaveTemplate }
                    style = {
                        { marginBottom: 24 } } >
                    <
                    input type = "date"
                    value = { form.date }
                    onChange = { e => setForm(f => ({...f, date: e.target.value })) }
                    required / >
                    <
                    input type = "number"
                    step = "0.01"
                    placeholder = "Amount"
                    value = { form.amount }
                    onChange = { e => setForm(f => ({...f, amount: e.target.value })) }
                    required / >
                    <
                    input type = "text"
                    placeholder = "Category"
                    value = { form.category }
                    onChange = { e => setForm(f => ({...f, category: e.target.value })) }
                    required / >
                    <
                    select value = { form.type }
                    onChange = { e => setForm(f => ({...f, type: e.target.value })) } >
                    <
                    option value = "expense" > Expense < /option> <
                    option value = "income" > Income < /option> <
                    /select> <
                    input type = "text"
                    placeholder = "Description"
                    value = { form.description }
                    onChange = { e => setForm(f => ({...f, description: e.target.value })) }
                    /> <
                    button type = "submit" > Save < /button> <
                    button type = "button"
                    onClick = {
                        () => setEditingTemplate(null) }
                    style = {
                        { marginLeft: 8 } } > Cancel < /button> <
                    /form>
                )
            } <
            h3 > Transaction History < /h3> <
            table border = "1"
            cellPadding = "4"
            style = {
                { marginBottom: 24 } } >
            <
            thead >
            <
            tr > < th > Date < /th><th>Amount</th > < th > Category < /th><th>Type</th > < th > Description < /th></tr >
            <
            /thead> <
            tbody > {
                transactions.map(tx => ( <
                    tr key = { tx.id } >
                    <
                    td > { tx.date } < /td> <
                    td > { tx.amount } < /td> <
                    td > { tx.category } < /td> <
                    td > { tx.type } < /td> <
                    td > { tx.description } < /td> <
                    /tr>
                ))
            } <
            /tbody> <
            /table> <
            h3 > Spending by Category < /h3> <
            ul > {
                Object.entries(spendingByCategory).map(([cat, amt]) => ( <
                    li key = { cat } > { cat }: $ { amt.toFixed(2) } < /li>
                ))
            } <
            /ul> <
            h3 > Spending by Month < /h3> <
            ul > {
                Object.entries(spendingByMonth).map(([month, amt]) => ( <
                    li key = { month } > { month }: $ { amt.toFixed(2) } < /li>
                ))
            } <
            /ul> <
            h3 > Smart Tips < /h3> <
            ul > {
                tips.map((tip, i) => < li key = { i } > { tip } < /li>)} <
                    /ul> <
                    h3 > Inflation & Exchange Rates < /h3> <
                    ul >
                    <
                    li > Inflation: { inflation.inflation } % < /li> <
                    li > USD to EUR: { inflation.usd_to_eur } < /li> <
                    li > USD to GBP: { inflation.usd_to_gbp } < /li> <
                    li > Last updated: { inflation.last_updated && new Date(inflation.last_updated).toLocaleString() } < /li> <
                    /ul> <
                    h3 > Live Rates < /h3> <
                    div style = {
                        { marginBottom: 16 } } >
                    <
                    strong > Inflation Rates: < /strong> <
                    ul > {
                        Object.entries(liveInflation).map(([country, rate]) => ( <
                            li key = { country } > { country }: { rate } % < /li>
                        ))
                    } <
                    /ul> <
                    strong > Interest Rates: < /strong> <
                    ul > {
                        Object.entries(liveInterest).map(([country, rate]) => ( <
                            li key = { country } > { country }: { rate } % < /li>
                        ))
                    } <
                    /ul> <
                    /div> <
                    h3 > Professional Analytics Dashboard < /h3> <
                    div style = {
                        { display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 } } >
                    <
                    div style = {
                        { minWidth: 200 } } >
                    <
                    Select options = { CURRENCIES }
                    value = { selectedCurrency }
                    onChange = { setSelectedCurrency }
                    isSearchable = { false }
                    placeholder = "Currency" / >
                    <
                    /div> <
                    div style = {
                        { minWidth: 220 } } >
                    <
                    Select options = { COUNTRIES }
                    value = { selectedCountry }
                    onChange = { setSelectedCountry }
                    isSearchable = { false }
                    placeholder = "Country" / >
                    <
                    /div> <
                    label style = {
                        { marginLeft: 16 } } >
                    <
                    input type = "checkbox"
                    checked = { showReal }
                    onChange = { e => setShowReal(e.target.checked) }
                    /> <
                    span style = {
                        { marginLeft: 8 } } > Show inflation - adjusted(real) values < /span> <
                    /label> <
                    /div> <
                    div style = {
                        { width: '100%', height: 320, background: '#f8fafd', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(25,118,210,0.06)' } } >
                    <
                    ResponsiveContainer width = "100%"
                    height = { 280 } >
                    <
                    BarChart data = { analytics }
                    margin = {
                        { top: 16, right: 24, left: 0, bottom: 8 } } >
                    <
                    XAxis dataKey = "date"
                    tick = {
                        { fontSize: 12 } }
                    /> <
                    YAxis tick = {
                        { fontSize: 12 } }
                    /> <
                    Tooltip formatter = {
                        (value, name) => [value.toLocaleString(undefined, { style: 'currency', currency: selectedCurrency.value }), name === 'inflationAdjustedAmount' ? 'Real (inflation-adjusted)' : 'Nominal (converted)'] }
                    /> <
                    Legend formatter = { v => v === 'inflationAdjustedAmount' ? 'Real (inflation-adjusted)' : 'Nominal (converted)' }
                    /> { showReal ? < Bar dataKey = "inflationAdjustedAmount"
                        fill = "#1976d2"
                        radius = {
                            [6, 6, 0, 0] }
                        /> : <Bar dataKey="convertedAmount" fill="#43a047" radius={[6, 6, 0, 0]} / > } <
                    /BarChart> <
                    /ResponsiveContainer> <
                    div style = {
                        { fontSize: 13, color: '#555', marginTop: 8 } } >
                    <
                    b > Tip: < /b> "Real" values are adjusted for inflation in your selected country. "Nominal" values are not adjusted. <
                    /div> <
                    /div> <
                    /div> <
                    /CSSTransition> <
                    />
                );
            }

            export default ShelFin;