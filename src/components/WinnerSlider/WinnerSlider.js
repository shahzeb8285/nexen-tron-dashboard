import React, { useState } from 'react';
import {
  Media,
  Container,
  Row,
  Col
} from 'reactstrap';

import WinnerTile from "./WinnerTile";
import Widget from '../Widget/Widget';
import Carousel from 'react-elastic-carousel'

const WinnerSlider = (props) => {




  return (

    <>
      <Carousel  enableAutoPlay autoPlaySpeed={1500} itemsToShow={1} >

      <WinnerTile rank="1st"
          user={{ avatar: "https://images.pexels.com/photos/20787/pexels-photo.jpg", name: "Rachna" }}
          startColor={"#fdcb6e"}
          endColor={"#bf8415"}
        />
        <WinnerTile rank="2nd"
          user={{ avatar: "https://images.pexels.com/photos/20787/pexels-photo.jpg", name: "Mossajjid" }}
          startColor={"#BEC0C2"}
          endColor={"#70706F"}
        />
        

        <WinnerTile rank="3rd"
          user={{ avatar: "https://images.pexels.com/photos/20787/pexels-photo.jpg", name: "Neha" }}
          startColor={"#c31432"}
          endColor={"#240b36"}
        />
        
        






      </Carousel>




    </>
  );
}


export default WinnerSlider;
