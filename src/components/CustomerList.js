// CustomerList.js
import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const CustomerList = () => {
    const history = useHistory();
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const [customers, setCustomers] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers/')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
        axios.get('http://localhost:8000/api/plans/')
            .then(response => {
                setPlans(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handlePlanSelection = (customerId) => {
        history.push(`/customer/${customerId}/select-plan`);
    };

    const handlePlanUpgradation = (customerId) => {
        history.push(`/customer/${customerId}/upgrade-plan`);
    };

    return (
        <div className="registration-form">
            <h2>Customer List</h2>
            <select id="mySelect" value={selectedValue} onChange={handleChange}>
                <option value="">Select...</option>
                {plans.map(plan => (
                    <option value={plan.name}>{plan.name}</option>
                ))}
                
            </select>
            <button>Upgrade My Plan</button>
            {/* Display customer data in a table */}
            <tr>
                <th>User</th>
                <th></th>
            </tr>
            {customers.map(customer => (
                <tr key={customer.id}>
                    <td>{customer.username}</td>
                    <td>{customer.email_id}</td>
                </tr>
            ))}
        </div>
    );
};

export default CustomerList;
