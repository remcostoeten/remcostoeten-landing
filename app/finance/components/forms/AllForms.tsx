import React from 'react';
import DebtForm from './DebtForm';
import DepositForm from './DepositForm';
import IncomeForm from './IncomeForm';
import Card from 'antd/es/card/Card';

const AllForms = () => {
    return (
        <><h1>Income Form</h1><IncomeForm /><h1>Debt Form</h1><DebtForm /><h1>Deposit Form</h1><DepositForm /></>
    );
};

export default AllForms;