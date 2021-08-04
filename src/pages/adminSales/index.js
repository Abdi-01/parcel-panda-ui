import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ChartRevenue from '../../components/financialReport/chartRevenue'
import { URL_API } from '../../helper'
import { Container, SpinnerContainer } from './adminSales'
import { ClipLoader } from "react-spinners";
import {
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Menu,
} from '@material-ui/core';

const options = [
    'revenue',
    'item',
];

const SalesReport = () => {
    const [values, setValues] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
    })
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const resetFilter = () => {
        setSelectedDayRange({...selectedDayRange, from: null, to: null})
    }

    useEffect(() => {
        const setQueryDateFilter = () => {
            if (selectedDayRange.from !== null && selectedDayRange.to !== null) {
                let query = `from=${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}&to=${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
                return query
            }
        }
        const getData = async () => {
            try {
                if (selectedDayRange.from !==  null && selectedDayRange.to !== null) {
                    setLoading(true)
                }
                let token = localStorage.getItem("tkn_id")
                let queryDate = ''
                if (setQueryDateFilter() !== undefined) {
                    queryDate = setQueryDateFilter()
                }
                let config = {
                    method: 'get',
                    url: URL_API + `/financial-report/${options[selectedIndex]}?${queryDate}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                let response = await axios(config)
                setValues(response.data)
                setLoading(false)
                // console.log("getData", response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [selectedDayRange.from, selectedDayRange.to, selectedIndex])
    
    console.log("values in page", values)
    return (
        <div>
            <Container>
                <List
                    component="nav"
                    aria-label="Device settings"
                    sx={{ bgcolor: 'background.paper' }}
                >
                    <ListItem
                        button
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="Choose report"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickListItem}
                    >
                    <ListItemText
                        primary="Choose report"
                        secondary={options[selectedIndex]}
                    />
                    </ListItem>
                </List>
                <hr />
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                    }}
                >
                    {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        // disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                    ))}
                </Menu>
                {
                    loading ? 
                    <SpinnerContainer>
                        <ClipLoader color={"#0275d8"} loading={loading} size={100} />
                    </SpinnerContainer> :
                    <ChartRevenue 
                        values={values}
                        selectedDayRange={selectedDayRange}
                        setSelectedDayRange={setSelectedDayRange}
                        selectedIndex={selectedIndex}
                        resetFilter={resetFilter}
                    />
                }
            </Container>
        </div>
    )
}

export default SalesReport
