
import './App.css';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Navv2 from './Navv2';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { boolean } from 'yup';


export default function CustomerDataBase() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('newData')) || [];
        setData(storedData);
    }, []);

    const handleEditItem = (value) => {
        const shouldEdit = window.confirm("Are you sure you want to Edit this Customer's info?");
        if (shouldEdit) {
            const editedData = data.find(item => item.UserId === value);
            if (editedData) {
                localStorage.setItem("editedData", JSON.stringify(editedData));
            }
            localStorage.setItem('id', JSON.stringify(value))
        }
    };

    const handleDeleteItem = (index) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this Customer?");
        if (shouldDelete) {
            const updatedData = [...data];
            updatedData.splice(index, 1);
            setData(updatedData);
            localStorage.setItem('newData', JSON.stringify(updatedData));
        }
    };

    const handleviewCustomer = (value) => {
        navigate('/customer/' + value)
    }

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
            name: "address",
            label: <b>{"Address"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phone",
            label: <b>{"Phone"}</b>,
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
                sort: false,
            }
        },
        {
            name: "password",
            label: <b>{"Password"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "UserId",
            label: <b>{"User ID"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "UserId",
            label: <b>{"View Customer"}</b>,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => (
                    <button className='btn btn-outline-info' onClick={() => handleviewCustomer(value)}>View Customer</button>
                )
            }
        },
        {
            name: "UserId",
            label: <b>{"Edit"}</b>,
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => (
                    <Link className='btn btn-outline-success' to={'/Addcustomer'} onClick={() => handleEditItem(value)}>EDIT</Link>
                )
            }
        },

        {
            name: "delete",
            label: <b>{"Delete"}</b>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return (
                        <button className='btn btn-outline-danger' onClick={() => handleDeleteItem(rowIndex)}>
                            Delete
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
    // 
    //     const HandleLangChange = () => {
    //         setLang(lang);
    //     }

    return (
        <div >
            <Navv2 />
            {/* <button onClick={HandleLangChange}>Change Language</button> */}
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
        </div>
    );
}

