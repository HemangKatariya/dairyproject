import React, { useEffect, useRef, useState } from 'react';
import Navv2 from './Navv2';
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';


export default function WholesaleBill() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    const formikRef = useRef(null);
    const initialValues = {
        name: '',
        date: '',
        milkRows: [
            { MilkName: '', MilkPrice: '', Milkcount: '', TradeDiscount: '' }
        ]
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[^0-9]*$/, 'Numbers are not allowed in the name field')
            .required('Merchant name is required'),
        date: Yup.string().required('Date is required'),
        milkRows: Yup.array().of(
            Yup.object().shape({
                MilkName: Yup.string().required('Milk name is required'),
                MilkPrice: Yup.number()
                    .typeError('Milk price must be a number')
                    .positive('Milk price must be positive')
                    .required('Milk price is required'),
                Milkcount: Yup.number()
                    .typeError('Total milk count must be a number')
                    .integer('Total milk count must be an integer')
                    .positive('Total milk count must be positive')
                    .required('Total milk count is required'),
                TradeDiscount: Yup.number()
                    .typeError('Trade discount on crate must be a number')
                    .positive('Trade discount on crate must be positive')
                    .required('Trade discount on crate is required'),
            })
        )
    });



    const onSubmit = (values, { resetForm }) => {
        const billData = {
            customer: {
                name: values.name,
                date: values.date,
                milkRows: values.milkRows.map(row => {
                    const selectedMilk = milkOptions[row.MilkName];
                    const crates = row.Milkcount / selectedMilk.crateMeasurement;
                    const tradeDiscount = (crates * row.TradeDiscount).toFixed(2); // Format to 2 decimal places
                    return {
                        name: selectedMilk.name,
                        price: row.MilkPrice,
                        count: row.Milkcount,
                        crates: crates,
                        tradeDiscount: tradeDiscount,
                    };
                }),
            },
        };
        localStorage.setItem('wholesaleBillData', JSON.stringify(billData));
        resetForm();
        navigate('/Bill')
    };


    const milkOptions = {
        '33': { name: 'Amul Gold', crateMeasurement: 24 },
        '30': { name: 'Amul Shakti', crateMeasurement: 24 },
        '26': { name: 'Amul Taaza', crateMeasurement: 24 },
        '27': { name: 'Amul Tea Top', crateMeasurement: 24 },
        '27': { name: 'Sumul Cow Milk', crateMeasurement: 24 },
        '23': { name: 'Amul Slim N Trim', crateMeasurement: 24 },
        '13': { name: 'Amul Taaza 250ml', crateMeasurement: 48 },
        '186': { name: 'Sumul 6Ltr. Buttermilk', crateMeasurement: 2 },
        '22': { name: 'Amul Masti Dahi', crateMeasurement: 24 },
        '350': { name: 'Sumul 5kg DAhi', crateMeasurement: 2 },
        '72': { name: 'Sumul 1kg Dahi', crateMeasurement: 10 },
        '20': { name: 'Sumul 200gm Dahi Cup', crateMeasurement: 24 },
        '15': { name: 'Sumul Dahi 200gm Pouch', crateMeasurement: 50 },
        '16': { name: 'Sumul Chhash', crateMeasurement: 24 },
    };


    return (
        <div >
            <Navv2 />
            <div className='container'>
                <div className='row'>
                    <div className='mt-5'>
                        <h2 className='mb-3'>Generate Wholesale Bill</h2>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formikRef}>
                            {({ errors, touched, values }) => (
                                <Form>
                                    <div className='col-12 d-lg-flex d-md-flex'>
                                        <div className="mb-3 col-lg-6 col-md-6 col-sm-12 m-1">
                                            <Field name="name" placeholder="Merchant Name" className="form-control" />
                                            <ErrorMessage name='name' component='div' className='text-danger' />
                                        </div>
                                        <div className='mb-3 col-lg-6 col-md-6 col-sm-12 m-1'>
                                            <Field name="date" placeholder="Date" className="form-control" type="date" />
                                            <ErrorMessage name="date" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <FieldArray name="milkRows">
                                        {({ push, remove }) => (
                                            <div>
                                                {values.milkRows.map((milkRow, index) => (
                                                    <div key={index} className='col-12 d-lg-flex d-md-flex'>
                                                        <div className="mb-3 col-lg-3 col-md-3 col-sm-12 m-1">
                                                            <Field name={`milkRows[${index}].MilkName`} placeholder="Milk Name" as="select" className="form-control">
                                                                <option value="">Select Milk Name</option>
                                                                {Object.keys(milkOptions).map((key) => (
                                                                    <option key={key} value={key}>
                                                                        {milkOptions[key].name}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage name={`milkRows[${index}].MilkName`} component='div' className='text-danger' />
                                                        </div>
                                                        <div className='mb-3 col-lg-3 col-md-3 col-sm-12 m-1'>
                                                            <Field name={`milkRows[${index}].MilkPrice`} placeholder="Milk Price" className="form-control" type="number" />
                                                            <ErrorMessage name={`milkRows[${index}].MilkPrice`} component="div" className="text-danger" />
                                                        </div>
                                                        <div className='mb-3 col-lg-2 col-md-2 col-sm-12 m-1'>
                                                            <Field name={`milkRows[${index}].Milkcount`} placeholder="Total Milk Count" className="form-control" type="number" />
                                                            <ErrorMessage name={`milkRows[${index}].Milkcount`} component="div" className="text-danger" />
                                                        </div>
                                                        <div className='mb-3 col-lg-2 col-md-2 col-sm-12 m-1'>
                                                            <Field name={`milkRows[${index}].TradeDiscount`} placeholder="Trade Discount on Crate" className="form-control" type="number" />
                                                            <ErrorMessage name={`milkRows[${index}].TradeDiscount`} component="div" className="text-danger" />
                                                        </div>
                                                        <Button type="button" variant="outline-danger" onClick={() => remove(index)} className="m-1 col-lg-2 col-md-2 col-sm-12" style={{ height: '37px' }}>Remove</Button>
                                                    </div>
                                                ))}
                                                <Button type="button" variant="outline-success" onClick={() => push({ MilkName: '', MilkPrice: '', Milkcount: '', TradeDiscount: '' })} className="m-1">Add Row</Button>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <div className='d-flex'>
                                        <div className='mb-3 col-lg-6 col-md-6 col-sm-12 m-1'>
                                            <Field placeholder="Add Something" className="form-control" type="number" />
                                        </div>
                                        <div className='mb-3 col-lg-6 col-md-6 col-sm-12 m-1'>
                                            <Field placeholder="Minus Something" className="form-control" type="number" />
                                        </div>
                                    </div>
                                    <Button type="submit" variant="outline-success" className="mb-3 col-lg-3 col-md-3 col-sm-12 m-1" >Generate Bill</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </div>
    );
}
