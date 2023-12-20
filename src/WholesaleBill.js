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
                    .moreThan(-1, 'Trade discount on crate must be a non-negative number')
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
        '33': { name: 'અમૂલ ગોલ્ડ ', crateMeasurement: 24 },
        '30': { name: 'અમૂલ શક્તિ ', crateMeasurement: 24 },
        '26': { name: 'અમૂલ તાજા ', crateMeasurement: 24 },
        '27': { name: 'અમૂલ ટી ટોપ ', crateMeasurement: 24 },
        '27': { name: 'સુમુલ  ગાય નું દૂધ ', crateMeasurement: 24 },
        '23': { name: 'અમૂલ સ્લીમ એન ટ્રીમ ', crateMeasurement: 24 },
        '13': { name: 'અમૂલ તાજા  250ml', crateMeasurement: 48 },
        '186': { name: 'સુમુલ છાશ 6 લિટર  ', crateMeasurement: 2 },
        '22': { name: 'અમૂલ મસ્તી દહી ', crateMeasurement: 24 },
        '350': { name: 'સુમુલ 5 કિલો  દહી ', crateMeasurement: 2 },
        '72': { name: 'સુમુલ 1 કિલો  દહી', crateMeasurement: 10 },
        '20': { name: 'સુમુલ 200ગ્રામ દહી કપ  ', crateMeasurement: 24 },
        '15': { name: 'સુમુલ દહી 200ગ્રામ  પાઉચ ', crateMeasurement: 50 },
        '16': { name: 'સુમુલ છાશ ', crateMeasurement: 24 },
        '384': { name: 'અમૂલ ગોલ્ડ 6 લિટર  ', crateMeasurement: 2 },
        '1 ': { name: 'અન્ય  ', crateMeasurement: 1 },
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
