import styled from 'styled-components';
import Button from "@material-ui/core/Button";

export const ButtonWrapper = styled.div`
    margin: auto;
`

export const StyledButton = styled(Button)`
    background-color: #FAB629;

    &:hover {
        background-color: #E1A425;
    }
`