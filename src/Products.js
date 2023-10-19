import React from 'react'
import Navv from './Navv'
import img8 from './images/img8.jpg'
import img9 from './images/img9.jpg'
import img10 from './images/img10.jpg'
import img11 from './images/img11.jpg'
import img12 from './images/img12.jpg'
import img13 from './images/img13.jpg'
import img14 from './images/img14.jpg'
import './Products.css'
export default function Products() {
    return (
        <div>
            <Navv />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <img src={img8} alt="" className='rounded mx-auto d-block img-fluid' />

                    </div>

                </div>
            </div>

            <h3 className='mt-3 d-flex justify-content-center' ><b style={{ borderBottom: '2px solid grey' }}>Milk </b></h3>

            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 bg tile mt-5 text-align-center d-flex justify-content-center">
                        <img src={img9} alt="" className='img-fluid  hov mt-4 tile__media' />
                        <span class="tile__content">
                            <h3>Amul Gold</h3>
                            <h6> Standardized Long Life Milk.</h6>
                            <h6> Amount per 100 g </h6>
                            <h6>Total Fat, 9 g, 13.5 </h6>
                            <h6> Saturated Fat, 5.5g, 28 </h6>
                            <h6>Pack Size :	500 ml. / 6 Ltr.</h6>
                            <h6>Packing Type :	Pouch</h6>
                            <h6>MRP Rs. (Per Liter):66.00</h6>
                        </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 bg tile mt-5 text-align-center d-flex justify-content-center ">
                        <img src={img10} alt="" className='img-fluid  hov mt-4 tile__media' />
                        <span class="tile__content">
                            <h3>Amul Shakti</h3>
                            <h6> Amount per 100 g </h6>
                            <h6>Total Fat, g: 4.5</h6>
                            <h6>Calcium, mg: 102 </h6>
                            <h6>Protein, g: 3.0</h6>
                            <h6>Pack Size :	500 ml.</h6>
                            <h6>Packing Type :	Pouch</h6>
                            <h6>MRP Rs. (Per Liter):60.00</h6>
                        </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 bg tile mt-5  text-align-center d-flex justify-content-center">
                        <img src={img11} alt="" className='img-fluid  hov mt-4 tile__media' />
                        <span class="tile__content">
                            <h3>Amul Taaza</h3>
                            <h6> Standardized Long Life Milk.</h6>
                            <h6>Energy: kcal58 </h6>
                            <h6> Total Fat: g3.0 </h6>
                            <h6>Pack Size :	500 ml./1L / 6L </h6>
                            <h6>Packing Type :	Pouch</h6>
                            <h6>MRP Rs. (Per Liter):52.00</h6>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 bg tile mt-5  text-align-center d-flex justify-content-center">
                        <img src={img12} alt="" className='img-fluid  hov mt-4 tile__media' />
                        <span class="tile__content">
                            <h3>Amul Slim 'N' Trim Milk</h3>
                            <h6> Energy: kcal48</h6>
                            <h6>Total Fat: g3.0</h6>
                            <h6> Total Carbohydrate: g 5.0</h6>
                            <h6>Pack Size :	500 ml. </h6>
                            <h6>Packing Type :	Pouch</h6>
                            <h6>MRP Rs. (Per Liter):46.00</h6>
                        </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 bg tile mt-5 text-align-center d-flex justify-content-center ">
                        <img src={img13} alt="" className='img-fluid  hov mt-4 tile__media' />
                        <span class="tile__content">
                            <h3>Sumul Cow Milk</h3>
                            <h6> Standardized Long Life Milk.</h6>
                            <h6>Pack Size :	500 ml. </h6>
                            <h6>Packing Type :	Pouch</h6>
                            <h6>MRP Rs. (Per Liter):54.00</h6>
                        </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 bg tile mt-5  text-align-center d-flex justify-content-center">
                        <img src={img14} alt="" className='img-fluid  hov mt-4 tile__media' />
                        <span class="tile__content">
                            <h3>Sumul Gir Amrutam Cow Milk</h3>
                            <h6> Standardized Long Life Milk.</h6>

                            <h6>Pack Size :	500 ml. / 1L</h6>
                            <h6>Packing Type :	Bottle</h6>
                            <h6>MRP Rs. (Per Liter):70.00</h6>
                        </span>
                    </div>
                </div>
            </div>

        </div>


    )
}
