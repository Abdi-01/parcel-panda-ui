import styled from 'styled-components'
import { Container } from 'reactstrap';

export const FooterContainer = styled.div`
    height: 100px;
    padding-top: 40px;
`

export const Wrapper = styled.footer`
    position: absolute;
    right: 0;
    bottom: 0;
    right: 0;
    background-color: #F4F4F4;
    height: 60px;
    line-height: 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const LeftHeader = styled.h6`
    padding-top: 20px;
    font-size: 15px;
    margin: 0;
    padding: 0;
`

export const ContentContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const IconWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`