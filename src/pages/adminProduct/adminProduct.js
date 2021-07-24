import styled from 'styled-components';
import Paper from "@material-ui/core/Paper" 
import Box from '@material-ui/core/Box';

export const MainWrapper = styled.div`
    display: flex;
`

export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
    border-radius: 12px;
    padding: 10px;
`

export const ProductWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    padding: 20px;
    width: 100%;

    @media screen and (max-width: 1280px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

export const PaginationWrapper = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const SortWrapper = styled.div`
    box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
    border-radius: 10px;
    margin: 10px 0;
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const SortingBar = styled.div`
    width: 160px;
`

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
`

export const PaperWrapper = styled(Paper)`
    height: 50px;
    width: 300px;
    padding: 2px 4px;
    display: flex;
    align-items: center;
`

export const SpinnerContainer = styled(Box)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
`

export const ProductContainer = styled.div`
    box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
`