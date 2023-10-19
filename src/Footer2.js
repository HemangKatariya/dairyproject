import React from 'react'

export default function Footer2() {
    return (

        <div class="container-fluid my-5">

            <footer
                class="text-center text-lg-start text-white"
                style={{ backgroundColor: ' #1c2331' }}
            >
                <section
                    class="d-flex justify-content-between p-4"
                    style={{ backgroundColor: '#6351ce' }}
                >
                    <div class="me-5">
                        {/* <span>Get connected with us on social networks:</span> */}
                    </div>

                    <div>
                        <a href="" class="text-white me-4">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="" class="text-white me-4">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="" class="text-white me-4">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="" class="text-white me-4">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="" class="text-white me-4">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="" class="text-white me-4">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </section>

                <section class="">
                    <div class="container text-center text-md-start mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold">Bapa Sitaram Dairy</h6>
                                <hr
                                    class="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}

                                />
                                <p>
                                    Our dairy dedicated to ensuring the highest standards of quality and service. We take pride in our commitment to time accuracy, delivering fresh milk and dairy products to you. Your satisfaction is our priority, and we strive to exceed your expectations at every step of your dairy journey.
                                </p>
                            </div>

                            {/* <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold">Products</h6>
                                <hr
                                    class="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a href="#!" class="text-white">MDBootstrap</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-white">MDWordPress</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-white">BrandFlow</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-white">Bootstrap Angular</a>
                                </p>
                            </div> */}

                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold">Useful links</h6>
                                <hr
                                    class="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a href="/Login" class="text-white">Customer Login</a>
                                </p>
                                <p>
                                    <a href="/Products" class="text-white">Products</a>
                                </p>
                                <p>
                                    <a href="/Home" class="text-white">Dashboard</a>
                                </p>
                                {/* <p>
                                    <a href="#!" class="text-white">Help</a>
                                </p> */}
                            </div>

                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 class="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    class="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p><i class="fas fa-home mr-3"></i>Vidhata Apartment, Matawadi, Varachha , Surat-395010</p>
                                <p><i class="fas fa-envelope mr-3"></i></p>
                                <p><i class="fas fa-phone mr-3"></i>9909690809</p>
                                <p><i class="fas fa-print mr-3"></i>9726843300</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    class="text-center p-3"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    © 2020 Copyright:
                    <a class="text-white"
                    >Bapa SItaram Dairy</a  >

                </div>
            </footer>

        </div>

    )
}
