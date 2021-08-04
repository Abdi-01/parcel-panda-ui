import React from 'react';
import { Container } from 'reactstrap';

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="mt-5" style={{height: '55px', width: '100%', backgroundColor: '#F4F4F4',}}>
                <Container>
                    <h6 style={{paddingTop: '20px', fontSize: '15px'}}>2021 © Parcelpanda. All Rights Reserved.</h6>
                </Container>
            </div>
         );
    }
}
 
export default FooterComp;