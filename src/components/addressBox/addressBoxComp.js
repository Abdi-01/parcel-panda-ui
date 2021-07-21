import styled from 'styled-components'
import FormLabel from '@material-ui/core/FormLabel';

export const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 15px;
    margin: 15px 0;
`

export const AddressHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 2px solid #efefef;
`

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #efefef;
    padding: 15px 0;
`

export const DataWrapper = styled.div`
    display: flex;
    width: 100%;
`

export const Label = styled(FormLabel)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;
    text-align: right;
    margin-right: 20px;
`

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`