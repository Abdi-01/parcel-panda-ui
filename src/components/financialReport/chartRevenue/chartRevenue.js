import styled from "styled-components";

export const DisplayWrapper = styled.div`
    display: grid;
    grid-template-columns: 280px auto;
    margin: 30px 0;
    column-gap: 30px;
`

export const DateFilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 500px;
    margin: 20px 0;
`

export const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const ChartFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 15px;
    max-width: calc(100%-280px);
`

export const DateWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 670px;
`