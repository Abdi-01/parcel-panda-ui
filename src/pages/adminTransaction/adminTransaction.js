import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

export const PaginationWrapper = styled.div`
    margin: 30px 0;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const SkeletonWrapper = styled.div`
    width: 100%;
    height: 150px;
`

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export const ButtonReject = styled(Button)`
    background-color: #FF0000;

    &:hover {
        background-color: #d32f2f;
    }
`

export const ChipRejected = styled(Chip)`
    background-color: #FF0000;
`
