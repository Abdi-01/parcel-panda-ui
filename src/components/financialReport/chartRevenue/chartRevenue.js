import styled from "styled-components";

export const DisplayUpperWrapper = styled.div`
    display: grid;
    grid-template-columns: 280px auto;
    margin: 30px 0;
    column-gap: 30px;
`

export const DisplayBottomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`

export const DataWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export const PieChartWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
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
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 5px;
    max-width: calc(100%-280px);
`

export const DateWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 670px;
`