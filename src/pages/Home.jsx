import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle
} from '@coreui/react';
import React, { useState } from 'react';
import image1 from "../assets/images/Home.png";
import image2 from "../assets/images/Home1.jpg";
import image3 from "../assets/images/Home3.jpg";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import next from "../assets/images/next.png";
import "./home.scss";

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image1, image2, image3]; 

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="home-container">
            <div className="image-container">
                <img src={images[currentImageIndex]} className='background' alt="Displayed" />
                <div className="button-container">
                    <img className='prev' onClick={handlePrevImage} src={next} alt="Previous" />
                    <img className='next' onClick={handleNextImage} src={next} alt="Next" />
                </div>
            </div>
            <div className="cards-container">
                <div className="card-item">
                    <CCard>
                        <CCardImage className='card-image' orientation="top" src={img2} />
                        <CCardBody>
                            <CCardTitle className='card-header'>Women</CCardTitle>
                            <CCardText className='card-text'>
                               Discover our latest collection of women's fashion and find your perfect style.
                            </CCardText>
                            <CButton className='card-button' href="/women">Shop now</CButton>
                        </CCardBody>
                    </CCard>
                </div>
                <div className="card-item">
                    <CCard>
                        <CCardImage className='card-image' orientation="top" src={img3} />
                        <CCardBody>
                            <CCardTitle className='card-header'>Kids</CCardTitle>
                            <CCardText className='card-text'>
                            Explore our adorable and durable kids' clothing. Perfect for playtime and special occasions!
                            </CCardText>
                            <CButton className='card-button' href="/kids">Shop now</CButton>
                        </CCardBody>
                    </CCard>
                </div>
                <div className="card-item">
                    <CCard>
                        <CCardImage className='card-image' orientation="top" src={img1} />
                        <CCardBody>
                            <CCardTitle className='card-header'>Men</CCardTitle>
                            <CCardText className='card-text'>
                            Explore our collection of men's fashion. From casual wear to formal attire, we've got you covered.
                            </CCardText>
                            <CButton className='card-button' href="/men">Shop now</CButton>
                        </CCardBody>
                    </CCard>
                </div>
            </div>
        </div>
    );
};

export default Home;

