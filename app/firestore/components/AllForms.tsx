import React from 'react';
import DebtForm from './DebtForm';
import DepositForm from './DepositForm';
import IncomeForm from './IncomeForm';
import Card from 'antd/es/card/Card';

const AllForms = () => {
    return (
        <Card className='flex flex-col gap-2'>
            <h1>Income Form</h1>
            <IncomeForm />
            <h1>Debt Form</h1>
            <DebtForm />
            <h1>Deposit Form</h1>
            <DepositForm />
        </Card>
    );
};

export default AllForms;