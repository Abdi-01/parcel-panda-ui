import React from 'react';
import { Carousel } from 'react-bootstrap';
// import bg1 from '../../asset/img/bg1.jpg';
import GifPlayer from "react-gif-player";
import carousel3 from "../../asset/gif/carousel3.gif";

class CarouselComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Carousel >
                    <Carousel.Item style={{height: "50%"}}>
                        <GifPlayer gif={carousel3} autoplay={true} style={{ width: "100%", height: "80%" }}/>
                        {/* <img style={{height: '70vh'}} className="d-block w-100" src={bg1} alt="First slide"/> */}
                    </Carousel.Item>
                </Carousel>
                <Carousel.Caption>
                </Carousel.Caption>
            </div>
         );
    }
}
 
export default CarouselComp;