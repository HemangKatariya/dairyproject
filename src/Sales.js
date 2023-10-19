import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Navv2 from './Navv2';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function Sales() {
    const [selectedUserId, setSelectedUserId] = useState({});
    const [countValues, setCountValues] = useState({});
    const [data, setData] = useState(JSON.parse(localStorage.getItem('newData')) || []);

    const columns = [
        {
            name: "name",
            label: <b>{"Name"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "UserId",
            label: <b>{"UserID"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "address",
            label: <b>{"Address"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "deposit",
            label: <b>{"Deposit"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Milk",
            label: <b>{"Milk"}</b>,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <select
                        value={selectedUserId[tableMeta.rowIndex] || ''}
                        onChange={(event) =>
                            setSelectedUserId((prevSelectedUserId) => ({
                                ...prevSelectedUserId,
                                [tableMeta.rowIndex]: event.target.value,
                            }))
                        }
                    >
                        <option>Milk Name:</option>
                        <option value='33'>Gold</option>
                        <option value='30'>Shakti</option>
                        <option value='26'>Taaza</option>
                        <option value='27'>Tea Top</option>
                        <option value='27'>Cow Milk</option>
                        <option value='23'>Slim N Trim</option>
                        <option value='16'>Sumul Chhash</option>
                        <option value='13'>Taaza 250ml</option>
                        <option value='1'>Something Else</option>
                    </select>
                ),
            },
        },
        {
            name: "Count",
            label: <b>{"Count"}</b>,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <input
                            type="number"
                            value={countValues[tableMeta.rowIndex] || ''}
                            onChange={(event) => {
                                const newValue = event.target.value;
                                if (newValue >= 0) {
                                    setCountValues((prevCountValues) => ({
                                        ...prevCountValues,
                                        [tableMeta.rowIndex]: newValue,
                                    }));
                                } else {
                                    toast.error("Please enter a non-negative value.")
                                }
                            }}
                        />
                    </>
                ),
            },
        },
        {
            name: "Submit",
            label: <b>{"Submit"}</b>,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const milkValue = selectedUserId[tableMeta.rowIndex];
                    const countValue = countValues[tableMeta.rowIndex];
                    const isDisabled = !milkValue || !countValue;
                    return (
                        <button
                            type="button"
                            className='btn btn-outline-success'
                            onClick={() => handleMilkSubmit(tableMeta.rowData, tableMeta.rowIndex)}
                            disabled={isDisabled}
                        >
                            Submit
                        </button>
                    );
                },
            },
        },
    ];
    const options = {
        filterType: 'checkbox',
    };
    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })
    const milkInfoMap = {
        '33': { name: 'Amul Gold', price: 33 },
        '30': { name: 'Amul Shakti', price: 30 },
        '26': { name: 'Amul Taaza', price: 26 },
        '27': { name: 'Amul Tea Top', price: 27 },
        '27': { name: 'Sumul Cow Milk', price: 27 },
        '23': { name: 'Amul Slim N Trim', price: 23 },
        '16': { name: 'Sumul Chhash', price: 16 },
        '13': { name: 'Amul Taaza 250ml', price: 13 },
        '1': { name: 'Something Else', price: 1 },
    };

    function makeid(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    const handleMilkSubmit = (rowData, rowIndex) => {
        const milkValue = selectedUserId[rowIndex];
        const countValue = countValues[rowIndex];

        if (milkValue !== undefined && countValue !== undefined) {
            const milkInfo = milkInfoMap[milkValue];
            const totalPrice = milkValue * countValue;


            const currentDate = new Date();


            const customerInfo = {
                Name: rowData[0],
                UserId: rowData[1],
                ID: makeid(6),
                MilkName: milkInfo.name,
                MilkPrice: milkInfo.price,
                TotalCount: countValue,
                TotalPrice: totalPrice,
                time: currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString(),
            };



            const salesdata = JSON.parse(localStorage.getItem('salesdata')) || [];

            let customerSales = salesdata.find(item => item.UserId === rowData[1]);

            if (!customerSales) {
                customerSales = {
                    UserId: rowData[1],
                    Name: rowData[0],
                    Sales: [],
                };
                salesdata.push(customerSales);
            }
            customerSales.Sales.push(customerInfo);

            localStorage.setItem('salesdata', JSON.stringify(salesdata));


            toast.success(`Total Price Of Milk Purchased: ${totalPrice} By ${rowData[0]}`);



            setSelectedUserId((prevSelectedUserId) => ({
                ...prevSelectedUserId,
                [rowIndex]: '',
            }));
            setCountValues((prevCountValues) => ({
                ...prevCountValues,
                [rowIndex]: '',
            }));
        } else {
            alert('Please select both milk and count before submitting.');
        }
    };

    return (
        <div>
            <div >
                <Navv2 />
                <div>
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"All Customers"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider>
                </div>
                <ToastContainer />
            </div>

        </div>
    )
}
