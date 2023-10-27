
import React, { useEffect, useState } from 'react';
import Navv2 from './Navv2';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";

export default function TodaySales() {
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [totalRow, setTotalRow] = useState(null);


    useEffect(() => {
        const AllSales = JSON.parse(localStorage.getItem('salesdata'));
        const today = new Date().toLocaleDateString();
        const filteredData = [];

        for (let i = 0; i < AllSales.length; i++) {
            let sales = AllSales[i].Sales;
            for (let j = 0; j < sales.length; j++) {
                const saleDate = new Date(sales[j].time).toLocaleDateString();
                if (saleDate === today) {
                    filteredData.push(sales[j]);
                }
            }
        }
        setFilteredSalesData(filteredData);
    }, []);
    useEffect(() => {
        let totalAmount = 0;
        let totalPouch = 0;

        for (let i = 0; i < filteredSalesData.length; i++) {
            totalAmount += parseFloat(filteredSalesData[i].TotalPrice);
            totalPouch += parseInt(filteredSalesData[i].TotalCount);
        }

        const totalRowData = {
            Name: <b>{"Total:"}</b>,
            MilkName: "",
            MilkPrice: "",
            TotalCount: <b>{totalPouch}</b>,
            TotalPrice: <b>{totalAmount.toFixed(2)}</b>,
        };

        setTotalRow(totalRowData);
    }, [filteredSalesData]);


    const tableTitle = "Today's Sales of Bapa Sitaram Dairy";

    const options = {
        // filterType: 'checkbox',
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true,
    });

    const columns = [
        {
            name: "Name",
            label: <b>{"Customer Name"}</b>,
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "MilkName",
            label: <b>{"Milk Name"}</b>,
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "MilkPrice",
            label: <b>{"Milk Price"}</b>,
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "TotalCount",
            label: <b>{"Total Count"}</b>,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "TotalPrice",
            label: <b>{"Total Price"}</b>,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "time",
            label: <b>{"Date & Time"}</b>,
            options: {
                filter: false,
                sort: false,
            },
        },
    ];

    return (
        <div>
            <div>
                <Navv2 />

                {/* <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={tableTitle}
                            data={filteredSalesData}
                            columns={columns}
                            options={options}
                        />
                    </ThemeProvider>
                </CacheProvider> */}
                <CacheProvider value={muiCache} >
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={tableTitle}
                            data={totalRow ? [...filteredSalesData, totalRow] : filteredSalesData}
                            columns={columns}
                            options={options}
                        />
                    </ThemeProvider>
                </CacheProvider>
            </div>
        </div>
    );
}

