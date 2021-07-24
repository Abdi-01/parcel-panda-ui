import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';

export const EditDelete = styled(IconButton)`
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
`

export const Footer = styled(CardActions)`
    display: flex;
    justify-content: flex-start;
    /* padding: 0 5px; */
`