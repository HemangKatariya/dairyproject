
import React, { useState, useEffect } from 'react';
import Navv2 from './Navv2';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ViewOneCustomer() {
    const [data, setData] = useState([]);
    const [ids, setID] = useState();
    const [finaldata, setFinaldata] = useState([]);
    const [totalRow, setTotalRow] = useState(null);
    const { id } = useParams();
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const currentURL = window.location.href;
        const urlParts = currentURL.split('/');
        const id = urlParts[urlParts.length - 1];
        setID(id);
        getData()
    }, []);

    const getData = () => {
        const datas = JSON.parse(localStorage.getItem("salesdata"));
        setData(datas);

    }

    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].UserId == ids) {
                setFinaldata(data[i].Sales);
            }
        }
    }, [data, ids]);

    useEffect(() => {
        let totalAmount = 0;
        let totalPouch = 0;

        for (let i = 0; i < finaldata.length; i++) {
            totalAmount += parseFloat(finaldata[i].TotalPrice);
            totalPouch += parseInt(finaldata[i].TotalCount);
        }

        const totalRowData = {
            MilkName: <b>{"Total:"}</b>,
            MilkPrice: "",
            TotalCount: <b>{totalPouch}</b>,
            TotalPrice: <b>{totalAmount.toFixed(2)}</b>,
        };

        setTotalRow(totalRowData);
    }, [finaldata]);


    //     const handleDeleteItem = (ID) => {
    //
    //         console.log(finaldata)
    //         console.log(data)
    //         let Udata = data
    //         let sales = []
    //         for (let i = 0; i < Udata.length; i++) {
    //             if (Udata[i].UserId === finaldata[0].UserId) {
    //                 console.log(Udata[i])
    //                 sales = Udata[i].Sales
    //             }
    //         }
    //         let newSales = sales.filter(obj => obj.ID !== ID)
    //         console.log(newSales)
    //         for (let i = 0; i < Udata.length; i++) {
    //             if (Udata[i].UserId === finaldata[0].UserId) {
    //                 Udata[i].Sales = newSales
    //             }
    //         }
    //
    //         localStorage.setItem('salesdata', JSON.stringify(Udata))
    //         setFinaldata(Udata)
    //         getData()
    //
    //     };
    const handleDeleteItem = (ID) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this item?");

        if (shouldDelete) {
            let Udata = data;
            let sales = [];

            for (let i = 0; i < Udata.length; i++) {
                if (Udata[i].UserId === finaldata[0].UserId) {
                    sales = Udata[i].Sales;
                }
            }

            let newSales = sales.filter(obj => obj.ID !== ID);

            for (let i = 0; i < Udata.length; i++) {
                if (Udata[i].UserId === finaldata[0].UserId) {
                    Udata[i].Sales = newSales;
                }
            }

            localStorage.setItem('salesdata', JSON.stringify(Udata));
            setFinaldata(Udata);
            getData();
        }
    };


    const options = {
        // filterType: 'checkbox',
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    });

    const columns = [
        {
            name: "MilkName",
            label: <b>{"Milk Name"}</b>,
            options: {
                filter: true,
                sort: false,
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
            label: <b>{"Total Count"}</b>,
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "TotalPrice",
            label: <b>{"Total Price"}</b>,
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "time",
            label: <b>{"Date & Time"}</b>,
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "Month",
            label: <b>{"Month"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Year",
            label: <b>{"Year"}</b>,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "ID",
            label: <b>{"Delete"}</b>,
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    <button
                        className='btn btn-outline-danger'
                        onClick={() => handleDeleteItem(value)}
                    >
                        DELETE
                    </button>
                )
            }
        },


    ];


    const tableTitle = finaldata.length > 0 ? `Name: ${finaldata[0].Name}, UserId: ${finaldata[0].UserId}` : 'All Customers';
    return (
        <div>
            <Navv2 />
            {/* <div className="container mt-3">
                {finaldata.length > 0 && <h5>Name: {finaldata[0].Name}</h5>}
                {finaldata.length > 0 && <h5>UserId: {finaldata[0].UserId}</h5>}

            </div> */}
            <CacheProvider value={muiCache} >
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                        title={tableTitle}
                        data={totalRow ? [...finaldata, totalRow] : finaldata}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </CacheProvider>
        </div>
    );
}
