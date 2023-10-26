import React, { useState, useEffect } from 'react';
import Navv3 from './Navv3';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Footer2 from './Footer2';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

let x = []
let dummy = ""
export default function ViewMySelf() {

    const [customerData, setCustomerData] = useState(null);
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [data, setdata] = useState([]);
    const [totalRow, setTotalRow] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentYear, setCurrentYear] = useState('');


    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setCustomerData(loggedInUser);

            const salesData = JSON.parse(localStorage.getItem('salesdata')) || [];
            const filteredData = salesData.filter(item => item.userId === loggedInUser.UserId);
            setFilteredSalesData(filteredData);
        }

        const alldata = JSON.parse(localStorage.getItem('newData'));

        if (alldata) {
            const userEntry = alldata.find(entry => entry.UserId === loggedInUser.UserId);

            if (userEntry) {
                console.log('Password:', userEntry.password);
                console.log('Phone Number:', userEntry.phone);
                console.log('Deposit:', userEntry.deposit);

                setCustomerData({
                    ...customerData,
                    address: userEntry.address,
                    name: userEntry.name,
                    UserId: userEntry.UserId,
                    phone: userEntry.phone,
                    password: userEntry.password,
                    deposit: userEntry.deposit
                });
            }
        }

        const customer = JSON.parse(localStorage.getItem('salesdata'))


        for (let i = 0; i < customer.length; i++) {
            x.push(customer[i].UserId)
            for (let j = 0; j < x.length; j++) {
                if (x[i] == loggedInUser.UserId) {
                    // console.table(loggedInUser.UserId, x[i])
                    dummy = loggedInUser.UserId
                }

            }
        }

        for (let i = 0; i < customer.length; i++) {
            if (customer[i].UserId == loggedInUser.UserId) {
                // console.table(customer[i].Sales)
                setdata(customer[i].Sales)
            }

        }

        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());

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
            name: "Year",
            label: <b>{"Year"}</b>,
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
                filter: false,
                sort: false,
            }
        },
        {
            name: "TotalCount",
            label: <b>{"Total Pouch"}</b>,
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "TotalPrice",
            label: <b>{"Total Amount"}</b>,
            options: {
                filter: false,
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
    // useEffect(() => {
    //     setSelectedMonth(getMonthName(currentMonth));
    // }, [currentMonth]);
    useEffect(() => {
        setSelectedMonth(getMonthName(currentMonth));
    }, [currentMonth]);
    const filteredData = data.filter(item => item.Month === selectedMonth);

    const getMonthName = (monthIndex) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[monthIndex];
    };

    return (
        <>
            <Navv3 />


            <div className='main111'>

                <div className='main11'>
                    {customerData ? (
                        <div className='mt-3'>
                            <h3><b>Welcome, {customerData.name}</b></h3>
                            <p>Address:  <b> {customerData.address}</b></p>
                            <p>User ID:  <b> {customerData.UserId}</b></p>
                            <p>Password: <b> {customerData.password}</b></p>
                            <p>Phone: <b> {customerData.phone}</b></p>
                            <p>Deposit: <b> {customerData.deposit}</b></p>
                        </div>
                    ) : (
                        <p className='mt-5' ><b>No customer data found. <br /> Please Login again With your UserID and Password...</b></p>
                    )}
                </div>
                <div >

                    {/* <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"All Customers"}
                                data={totalRow ? [...data, totalRow] : data}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider> */}
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            {filteredData.length > 0 ? (
                                <MUIDataTable
                                    title={`Purchase Report for ${customerData ? customerData.name : 'Customer Name'} of the Month ${selectedMonth} `}
                                    // data={filteredData}
                                    data={totalRow ? [...filteredData, totalRow] : data}
                                    columns={columns}
                                    options={options}
                                />
                            ) : (
                                <div style={{ marginTop: '5rem' }} className='p-3'>
                                    <strong>Apologies, but there is no information available for the chosen month, {selectedMonth}. Kindly pick an alternative month.</strong>
                                </div>
                            )}
                        </ThemeProvider>
                    </CacheProvider>

                    <div className='d-flex text-align-center align-items-center mt-5 '>
                        <h6 className='p-3'><b>Would you like to explore another month's purchase history? Kindly choose a month to view your shopping records  : </b></h6>
                        <DropdownButton id="dropdown-basic-button" className=' mb-3' variant='outline-dark' title="Select Month">
                            <Dropdown.Item onClick={() => setSelectedMonth('January')}>January</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('February')}>February</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('March')}>March</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('April')}>April</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('May')}>May</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('June')}>June</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('July')}>July</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('August')}>August</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('September')}>September</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('October')}>October</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('November')}>November</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedMonth('December')}>December</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
            <Footer2 />
        </>
    );
}
