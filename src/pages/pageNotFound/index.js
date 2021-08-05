import React from 'react'
import NotFound from '../../asset/img/404.png'
import { Container } from 'react-bootstrap';
import { Img } from './PageNotFound';

const PageNotFound = () => {
    return (
        <div>
            <Container>
                <Img src={NotFound} alt={"..."} />
            </Container>
        </div>
    )
}

export default PageNotFound
