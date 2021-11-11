import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
    const [banner, setBanner] = useState({})
    useEffect(() => {
        axios.get("http://localhost:5000/drone")
            .then(data => {
                setBanner(data.data[0])
            })
    }, [])

    const { img2, img3 } = banner !== {} && banner

    return (
        <div>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img2}

                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 style={{ color: "orange" }} className="fst-italic">I Drone</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img3}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;