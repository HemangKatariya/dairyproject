import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AddCustomer from './AddCustomer';
import Products from './Products';
import OwnerLogin from './OwnerLogin';
import CustomerDataBase from './CustomerDataBase';
import Sales from './Sales';
import ViewMySelf from './ViewMySelf';
import Signup from './Signup';
import WholesaleBill from './WholesaleBill';
import ViewOneCustomer from './ViewOneCustomer';
import Bill from './Bill';
import TodaySales from './TodaySales';
import Payment from './Payment';

export default function RouterContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Products' element={<Products />} />  v
                <Route path='/Login' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='/AddCustomer' element={<AddCustomer />} />
                <Route path='/OwnerLogin' element={<OwnerLogin />} />
                <Route path='/CustomerDataBase' element={<CustomerDataBase />} />
                <Route path='/Sales' element={<Sales />} />
                <Route path='/ViewMySelf' element={<ViewMySelf />} />
                <Route path='/WholesaleBill' element={<WholesaleBill />} />
                <Route path='/customer/:id' element={<ViewOneCustomer />} />
                <Route path='/Bill' element={<Bill />} />
                <Route path='/TodaySales' element={<TodaySales />} />
                <Route path='/Payment' element={<Payment />} />

            </Routes>
        </BrowserRouter>
    );
}
