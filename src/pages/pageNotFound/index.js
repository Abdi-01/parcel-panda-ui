import React from 'react'
import NotFound from '../../asset/img/404.png'
import { Container } from 'react-bootstrap';
import { Img, Wrapper } from './PageNotFound';

const PageNotFound = () => {
    return (
        <div>
            <Container>
                <Wrapper>
                    <Img src={NotFound} alt={"..."} />
                </Wrapper>
            </Container>
        </div>
    )
}

export default PageNotFound
