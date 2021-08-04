import React from 'react'
import { Container } from 'reactstrap';
import { Wrapper, LeftHeader, FooterContainer } from './Footer';

const FooterComp = () => {
    return (
        <div>
            <FooterContainer>
                <Wrapper>
                    <Container>
                        <LeftHeader>2021 © Parcelpanda. All Rights Reserved.</LeftHeader>
                    </Container>
                </Wrapper>
            </FooterContainer>
        </div>
    )
}

export default FooterComp
