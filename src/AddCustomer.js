
import React, { useEffect, useRef, useState } from 'react';
import Navv2 from './Navv2';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';

function generateRandomAlphanumericPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

export default function AddCustomer() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    const formikRef = useRef(null)
    const initialPassword = generateRandomAlphanumericPassword(9);


    const initialValues = {
        name: '',
        address: '',
        phone: '',
        deposit: '',
        password: initialPassword,
        cpassword: initialPassword,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[^0-9]*$/, 'Numbers are not allowed in the name field')
            .required('First name is required'),
        address: Yup.string().required('Address is required'),
        deposit: Yup.string()
            .test('is-positive', 'Deposit must be a positive number', (value) => {
                const numericValue = parseFloat(value);
                return !isNaN(numericValue) && numericValue > 0;
            })
            .min(3, 'Deposit must be at least 3 characters')
            .max(4, 'Deposit must not be longer than 4 characters')
            .required('Deposit is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Invalid phone number')
            .notOneOf(['ABCD'], 'Phone number cannot contain "ABCD"')
            .required('Phone number is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        cpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('newData')) || [];
        setData(storedData);

        const editedData = JSON.parse(localStorage.getItem('editedData'));
        if (editedData) {
            setEditData(editedData);
            localStorage.removeItem('editedData');
        }

    }, []);

    useEffect(() => {
        if (localStorage.getItem('id')) {
            setFieldvalue()
        }
    }, [data])


    const setFieldvalue = () => {
        if (formikRef.current) {
            const { setFieldValue } = formikRef.current;
            if (data.length > 0) {

                for (let i = 0; i < data.length; i++) {
                    if (data[i].UserId === JSON.parse(localStorage.getItem('id'))) {
                        // console.log('firstd')
                        setFieldValue('name', data[i].name);
                        setFieldValue('address', data[i].address);
                        setFieldValue('phone', data[i].phone);
                        setFieldValue('deposit', data[i].deposit);
                        setFieldValue('password', data[i].password);
                        setFieldValue('cpassword', data[i].cpassword);
                    }
                }
            }
        }
    }

    const onSubmit = async (values, { resetForm }) => {
        const obj = {
            name: values.name,
            address: values.address,
            phone: values.phone,
            deposit: values.deposit,
            password: values.password,
            cpassword: values.cpassword,
            UserId: editData ? editData.UserId : Date.now(),
        };

        let newData;
        if (editData) {
            newData = data.map(item => (item.UserId === editData.UserId ? obj : item));
        } else {
            newData = [...data, obj];
        }

        setData(newData);
        localStorage.setItem('newData', JSON.stringify(newData));


        toast('Customer Added Successfully🎉🍾');
        resetForm();
        localStorage.removeItem('id')
        await new Promise(resolve => setTimeout(resolve, 3650));

        navigate('/CustomerDataBase');
    };

    return (
        <div >
            <Navv2 />
            <div className='container'>
                <div className='row'>
                    <div className='mt-5'>
                        <h2 className='mb-3'>Add Customer </h2>
                        <Formik initialValues={editData || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formikRef}>
                            {({ errors, touched }) => (
                                <Form>
                                    <div className='col-12 d-lg-flex d-md-flex'>
                                        <div className="mb-3 col-lg-6 col-md-6 col-sm-12 m-1">
                                            <Field name="name" placeholder="Name" className="form-control" />
                                            <ErrorMessage name='name' component='div' className='text-danger' />
                                        </div>
                                        <div className='mb-3 col-lg-6 col-md-6 col-sm-12 m-1'>
                                            <Field name="address" placeholder="Address" className="form-control" />
                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className='col-12 d-lg-flex d-md-flex'>
                                        <div className="mb-3 col-lg-6 col-md-6 col-sm-12 m-1">
                                            <Field type="tel" name="phone" placeholder="Phone Number" className="form-control" />
                                            <ErrorMessage name="phone" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3 col-lg-6 col-md-6 col-sm-12 m-1">
                                            <Field type="number" name="deposit" placeholder="Deposit" className="form-control" />
                                            <ErrorMessage name="deposit" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className='col-12 d-lg-flex d-md-flex' >
                                        <div className="mb-3 col-lg-6 col-md-6 col-sm-12 m-1" style={{ display: 'none' }}>
                                            <Field type="password" name="password" placeholder="Password" className="form-control" />

                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3 col-lg-6 col-md-6 col-sm-12 m-1" style={{ display: 'none' }}>
                                            <Field type="password" name="cpassword" placeholder=" Confirm Password" className="form-control" />
                                            <ErrorMessage name="cpassword" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <Button type="submit" variant="outline-success" className="mb-3 col-lg-3 col-md-3 col-sm-12 m-1" >Submit</Button>
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

