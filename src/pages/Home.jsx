import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle
} from '@coreui/react';
import React, { useState } from 'react';
import cardimg from "../assets/images/4.png";
import image1 from "../assets/images/Home.png";
import next from "../assets/images/next.png";
import "./home.scss";

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        image1,
        'image2.jpg',
        'image3.jpg'
    ]; 

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        console.log("did")
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
      <div className="home-container">
      <div className="image-container">
          <img src={images[currentImageIndex]} className='background' alt="Displayed" />
          <div className="button-container">
              <img className='next' onClick={handlePrevImage} src={next}/>
             <img className='back'onClick={handleNextImage} src={next}/>
          </div>
      </div>
      <div className="cards-container">
        <div className="women">
            <CCard style={{ width: '22rem' }}>
            <CCardImage  className='card-image' orientation="top" src={cardimg} />
            <CCardBody>
              <CCardTitle className='card-header'>Women</CCardTitle>
              <CCardText className='card-text'>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CCardText>
              <CButton className='card-button' href="/women">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </div>

        <div className="women">
            <CCard style={{ width: '22rem' }}>
            <CCardImage  className='card-image' orientation="top" src={cardimg} />
            <CCardBody>
              <CCardTitle className='card-header'>Kids</CCardTitle>
              <CCardText className='card-text'>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CCardText>
              <CButton className='card-button' href="/kids">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </div>

        <div className="women">
            <CCard style={{ width: '22rem' }}>
            <CCardImage  className='card-image' orientation="top" src={cardimg} />
            <CCardBody>
              <CCardTitle className='card-header'>Men</CCardTitle>
              <CCardText className='card-text'>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </CCardText>
              <CButton className='card-button' href="/men">Go somewhere</CButton>
            </CCardBody>
          </CCard>
        </div>

      </div>
  </div>
    );
};

export default Home;
