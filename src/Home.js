import React from 'react'
import Navv from './Navv'
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import img5 from './images/img5.jpg'
import Footer from './Footer';
import img7 from './images/img7.jpg'
import img6 from './images/img6.jpg'

export default function Home() {
    return (
        <div>
            <Navv />



            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Carousel interval={4000}>
                            <Carousel.Item>
                                <img src={img1} alt="" className='img-fluid object-fit-cover border rounded' />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={img2} alt="" className='img-fluid object-fit-cover border rounded' />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={img3} alt="" className='img-fluid object-fit-cover border rounded' />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={img4} alt="" className='img-fluid object-fit-cover border rounded' />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={img5} alt="" className='img-fluid object-fit-cover border rounded' />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>


            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3 mb-3 d-flex justify-content-center text-center">
                            <div>
                                <img src={img6} alt="" className='img-fluid' />
                                <button className='mt-3'>Milk & Milk Products</button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-3 mb-3 d-flex justify-content-center text-center">
                            <div>
                                <img src={img7} alt="" className='img-fluid' />
                                <button className='mt-3'>Backery Products</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}
