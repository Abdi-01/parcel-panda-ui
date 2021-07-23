import React from 'react';
import { Container } from 'reactstrap';
import snacks2 from "../../asset/img/snacks2.jpg";
import "../about/aboutComp.css"

class AboutComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="div-about">
                <Container>
                    <div className="row d-flex mt-5 pt-5 pb-5">
                        <div className="col-md-6">
                            <img className="img2" src={snacks2} alt="snacks" />
                        </div>
                        <div className="col-md-6 about">
                            <h4 className="judul">About Parcelpanda</h4>
                            <div style={{marginTop: '10px'}}>
                                <h6 className="sub-judul">
                                Parcelpanda is an online shop which sells selected snack from all over the world. We mean it when we say selected. 
                                Parcelpanda started to supply supermarket since 2014. In order to offer best price, we have established strong relationship with many suppliers abroad and also the shipping vendors.
                                The long experience in this field also makes us know best how to deliver our product to the final destination, especially its Indonesia so it could be tricky with the handling process for chocolate and other fragile snacks.
                                </h6>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default AboutComp;