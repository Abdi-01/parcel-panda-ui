import styled from 'styled-components';
import {
    Card,
    CardActions,
    CardMedia,
    IconButton,
} from "@material-ui/core/";

export const StyledCard = styled(Card)`
    && {
        width: 200px;
        position: relative;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`

export const StyledCardMedia = styled(CardMedia)`
    && {
        height: 200px;
    }
`

export const EditDelete = styled(IconButton)`
    && {
        position: absolute;
        right: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);  
    }
`

export const Footer = styled(CardActions)`
    && {
        justify-content: flex-start;
        display: flex;
    }
`