import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    column-gap: 30px;
    row-gap: 15px;
    /* margin: 30px 0; */
`

export const Card = styled.div`
    padding: 20px;
    border-left: 8px solid #3f50b5;
    border-radius: 5px;
    color: #252422;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const CardHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CardFooter = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`

export const IconWrapper = styled.div`
    height: 100%;
    margin-right: 10px;
`

export const TextHeadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: right;
`

export const TextHeadCategory = styled.div`
    font-size: 16px;
    color: #9a9a9a;
    text-align: right;
`

export const TextHeaderNumb = styled.div`
    font-size: 25px;
    font-weight: 700;
`

export const TextFooter = styled.div`
    height: 100%;
`