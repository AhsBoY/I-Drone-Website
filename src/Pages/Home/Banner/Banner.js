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
                        <p>I Drone Is A World latest Drone Website.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img3}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 style={{ color: "orange" }} className="fst-italic">I Drone</h3>
                        <p style={{ color: "black" }}>We Have Around 20 Drone Collections.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;