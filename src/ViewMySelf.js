import React, { useState, useEffect } from 'react';
import Navv3 from './Navv3';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Footer2 from './Footer2';

let x = []
let dummy = ""
export default function ViewMySelf() {

    const [customerData, setCustomerData] = useState(null);
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [data, setdata] = useState([]);
    const [totalRow, setTotalRow] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);


    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setCustomerData(loggedInUser);

            const salesData = JSON.parse(localStorage.getItem('salesdata')) || [];
            const filteredData = salesData.filter(item => item.userId === loggedInUser.UserId);
            setFilteredSalesData(filteredData);
        }

        const customer = JSON.parse(localStorage.getItem('salesdata'))


        for (let i = 0; i < customer.length; i++) {
            x.push(customer[i].UserId)
            for (let j = 0; j < x.length; j++) {
                if (x[i] == loggedInUser.UserId) {
                    console.table(loggedInUser.UserId, x[i])
                    dummy = loggedInUser.UserId
                }

            }
        }

        for (let i = 0; i < customer.length; i++) {
            if (customer[i].UserId == loggedInUser.UserId) {
                console.table(customer[i].Sales)
                setdata(customer[i].Sales)
            }

        }

        window.onpopstate = () => {
            const confirmed = window.confirm("Are you sure you want to go back? Going back will log you out, and your session will expire.");
            if (confirmed) {
                localStorage.removeItem('loggedInUser');
                setSessionExpired(true);
            }
        };
    }, []);

    useEffect(() => {

        let totalAmount = 0;
        let totalPouch = 0;

        for (let i = 0; i < data.length; i++) {
            totalAmount += parseFloat(data[i].TotalPrice);
            totalPouch += parseInt(data[i].TotalCount);
        }

        const totalRowData = {
            time: <b> {"Total:"}</b>,
            MilkName: "",
            MilkPrice: "",
            TotalCount: <b>{totalPouch}</b>,
            TotalPrice: <b>{totalAmount.toFixed(2)}</b>,
        };

        setTotalRow(totalRowData);
    }, [data]);

    const columns = [

        {
            name: "time",
            label: <b>{"Date & Time"}</b>,
            options: {
                filter: true,
                sort: true,

            }
        },
        {
            name: "MilkName",
            label: <b>{"Milk Name"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "MilkPrice",
            label: <b>{"Milk Price"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "TotalCount",
            label: <b>{"Total Pouch"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "TotalPrice",
            label: <b>{"Total Amount"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },


    ];

    const options = {
        // filterType: 'checkbox',
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    });

    return (
        <>
            <Navv3 />
            <div className='main111'>
                <div className='main11'>
                    {customerData ? (
                        <div className='mt-3'>
                            <h3><b>Welcome, {customerData.name}</b></h3>
                            <p>User ID: <b> {customerData.UserId}</b></p>
                            <p>Password: <b> {customerData.password}</b></p>
                            <p>Phone: <b> {customerData.phone}</b></p>
                            <p>Deposit: <b> {customerData.deposit}</b></p>
                        </div>
                    ) : (
                        <p className='mt-5' ><b>No customer data found. <br /> Please Login again With your UserID and Password...</b></p>
                    )}
                </div>
                <div>
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"All Customers"}
                                data={totalRow ? [...data, totalRow] : data}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider>
                </div>
            </div>
            <Footer2 />
        </>
    );
}
