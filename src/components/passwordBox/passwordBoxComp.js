import styled from 'styled-components'
import Button from "@material-ui/core/Button";

export const PassContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 15px;
    margin: 15px 0;
`

export const PassHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    border-bottom: 2px solid #efefef;
`

export const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    margin: 20px 100px;
    height: 300px;
`

export const ButtonWrapper = styled.div`
    width: 100px;
`

export const StyledButton = styled(Button)`
    background-color: #FAB629;
    color: #000;

    &:hover {
        background-color: #E1A425;
    }
`