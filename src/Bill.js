import React, { useEffect, useState } from 'react';
import Navv from './Navv2';
import './Wholesale.css';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { WhatsAppShareButton, EmailShareButton } from "react-share";
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export default function Bill() {
    const [billData, setBillData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('wholesaleBillData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setBillData(parsedData);
        }
    }, []);
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
            name: "price",
            label: <b>{"Price"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "count",
            label: <b>{"Count"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "totalPrice",
            label: <b>{"Total Price"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "tradeDiscount",
            label: <b>{"Trade Discount"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "total",
            label: <b>{"Total"}</b>,
            options: {
                filter: true,
                sort: true,
            }
        },
    ];
    const options = {
        filterType: 'checkbox',
    };

    const shareViaWhatsApp = () => {
        if (navigator.share) {
            const formattedBill = generateFormattedBill();
            navigator.share({
                text: formattedBill,
            }).then(() => {
                console.log('Shared successfully');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {

            const whatsappMessage = generateFormattedBill();
            const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        }
    };



    const generateFormattedBill = () => {
        if (!billData || !billData.customer || !billData.customer.milkRows) {
            return 'No bill data available.';
        }

        const { customer } = billData;
        const milkRows = billData.customer.milkRows;
        const totals = calculateTotals();

        let formattedBill = `Date: ${customer.date}\nMerchant Name: ${customer.name}\n`;

        milkRows.forEach(row => {
            const totalPrice = row.price * row.count;
            formattedBill += `${row.name} , ${row.price} * ${row.count} = ${totalPrice}\n`;
        });

        formattedBill += `Total Amount: ${totals.totalPrice}\n`;
        formattedBill += `Total Trade Discount: ${totals.totalTradeDiscount}\n`;
        formattedBill += `Grand Total: ${totals.grandTotal}\n\nThank You For Being With Us , Visit Again...`;

        return formattedBill;
    };
    const shareViaMessages = () => {
        const formattedBill = generateFormattedBill();
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            window.location.href = `sms:?body=${encodeURIComponent(formattedBill)}`;
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.href = `sms:&body=${encodeURIComponent(formattedBill)}`;
        } else {
            // If the platform is not recognized, provide a fallback message
            alert('Sorry, messaging is not supported on this device.');
        }
    };



    const calculateTotals = () => {
        if (!billData || !billData.customer || !billData.customer.milkRows) {
            return {
                totalPrice: 0,
                totalTradeDiscount: 0,
                grandTotal: 0,
            };
        }

        const totalPrice = billData.customer.milkRows.reduce((total, row) => total + row.price * row.count, 0);
        const totalTradeDiscount = billData.customer.milkRows.reduce((total, row) => total + parseFloat(row.tradeDiscount), 0);
        const grandTotal = billData.customer.milkRows.reduce(
            (total, row) => total + (row.price * row.count) - row.tradeDiscount,
            0
        );

        return {
            totalPrice,
            totalTradeDiscount,
            grandTotal,
        };
    };

    const data = billData?.customer?.milkRows?.map((row, index) => ({
        name: row.name,
        price: row.price,
        count: row.count,
        totalPrice: row.price * row.count,
        tradeDiscount: row.tradeDiscount,
        total: (row.price * row.count) - row.tradeDiscount,
    })) || [];
    const totals = calculateTotals();


    data.push({
        name: <b>{'Total'}</b>,
        price: '',
        count: '',
        totalPrice: <b>{totals.totalPrice}</b>,
        tradeDiscount: <b>{totals.totalTradeDiscount.toFixed(2)}</b>,
        total: <b>{totals.grandTotal}</b>,
    });
    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })



    return (

        <div >
            <Navv />
            {billData && billData.customer && (
                <>

                    {/* <h5>Merchant Name: {billData.customer.name}</h5>
                    <p>Date: {billData.customer.date}</p> */}
                    {billData.customer.milkRows && billData.customer.milkRows.length > 0 && (

                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    // title={<h5>{"Wholesale Bill for " + { < b > { billData.customer.name }</b>} + " on " + billData.customer.date}</h5>}
                                    title={<h5> {"Wholesale Bill for "}<b>{billData.customer.name}</b> {" on "}<b>{billData.customer.date}</b></h5>}
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </CacheProvider>
                    )}
                    <ButtonGroup className='m-5'>
                        <Button variant='outline-success' onClick={shareViaWhatsApp}>Share via WhatsApp</Button>
                        <Button variant='outline-danger' onClick={shareViaMessages}>Send via Messages</Button>
                    </ButtonGroup>
                </>
            )
            }
        </div >

    )
}
