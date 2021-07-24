import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

export const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`

export const AdminNavWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 500px;
`

export const RightWrapper = styled(Box)`
    display: flex;
    justify-content: flex-end;
    width: 200px;
`

export const LeftWrapper = styled(Box)`
    display: flex;
    justify-content: flex-start;
    width: 200px;
`

export const Navigation = styled(NavLink)`
    text-decoration: none;
    min-width: 100px;
    color: #eceff1;

    &:hover {
        color: #ef9a9a;
        font-weight: 800;
    }
`