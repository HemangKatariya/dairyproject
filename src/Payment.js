import React, { useState } from 'react'
import Navv2 from './Navv2'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Payment() {
    const [selectedMonth, setSelectedMonth] = useState('');


    const data = JSON.parse(localStorage.getItem('salesdata')) || {};

    const columns = [
        {
            name: "Name",
            label: <b>{"Name"}</b>,
            options: {
                filter: true,
                sort: true,
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




    ];

    const options = {
        filterType: 'checkbox',
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })
    return (
        <div>
            <Navv2 />
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
    )
}
