import React, { useEffect, useState } from 'react'
import DatePicker from "react-modern-calendar-datepicker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PaymentIcon from "@material-ui/icons/Payment";
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import {
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Fade,
    Typography,
} from "@material-ui/core/";
import { 
    DateFilterWrapper,
    FilterWrapper, 
    FilterDetailWrapper, 
    RowsPaginationWrapper
} from './filterTransaction';


const FilterTransactionManagement = ({paymentStatus, setPaymentStatus, selectedDayRange, setSelectedDayRange, resetFilter, rowsPerPage, setRowsPerPage}) => {
    const [anchorPayment, setAnchorPayment] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const openPayment = Boolean(anchorPayment)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (page) => {
        setAnchorEl(null);
        if (page !== 'close') {
            setRowsPerPage(page)
        }
    };

    const handleClickPayment = (event) => {
        setAnchorPayment(event.currentTarget);
    };

    const handleClosePayment = () => {
        setAnchorPayment(null);
    };

    const handleChangePaymentStatus = (event) => {
        setPaymentStatus({...paymentStatus, [event.target.name]: event.target.checked});
    };

    const renderCustomInput = ({ ref }) => (
        <div>
          <DateFilterWrapper>
            <TextField
              label="Date start"
              readOnly
              size="small"
              ref={ref} // necessary
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                ),
              }}
              value={
                selectedDayRange.from
                  ? `${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year}`
                  : ""
              }
              variant="filled"
            />
            <TextField
              label="Date end"
              readOnly
              ref={ref} // necessary
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                ),
              }}
              value={
                selectedDayRange.to
                  ? `${selectedDayRange.to.day}/${selectedDayRange.to.month}/${selectedDayRange.to.year}`
                  : ""
              }
              variant="filled"
              size="small"
            />
          </DateFilterWrapper>
        </div>
    );

    const resetButton = () => {
        let bool = true 
        let time = true 
        for (let n in paymentStatus) {
            if (paymentStatus[n] === true) {
                bool = false
            }
        }
        for (let n in selectedDayRange) {
            if (selectedDayRange[n] !== null) {
                time = false
            }
        }
        return bool && time
    }

    useEffect(() => {
        // filterTransaction()
    }, [paymentStatus])

    return (
        <div>
            <FilterWrapper>
                <Typography variant="h5" component="div">
                   Filter
                </Typography>
                <FilterDetailWrapper>
                    <Button
                        aria-controls="category-filter-menu"
                        aria-haspopup="true"
                        // fullWidth
                        size="large"
                        aria-expanded={openPayment ? "true" : undefined}
                        variant="outlined"
                        disableElevation
                        onClick={handleClickPayment}
                        color="primary"
                        startIcon={<PaymentIcon />}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {"Payment"}
                    </Button>
                    <Menu
                        MenuListProps={{
                            "aria-labelledby": "payment",
                        }}
                        anchorEl={anchorPayment}
                        open={openPayment}
                        onClose={handleClosePayment}
                    >
                        <MenuItem>
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={paymentStatus.ongoing}
                                onChange={handleChangePaymentStatus}
                                name="ongoing"
                                />
                            }
                            label="ongoing"
                            />
                        </MenuItem>
                        <MenuItem>
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={paymentStatus.accepted}
                                onChange={handleChangePaymentStatus}
                                name="accepted"
                                />
                            }
                            label="accepted"
                            />
                        </MenuItem>
                        <MenuItem>
                            <FormControlLabel
                            control={
                                <Checkbox
                                checked={paymentStatus.rejected}
                                onChange={handleChangePaymentStatus}
                                name="rejected"
                                />
                            }
                            label="rejected"
                            />
                        </MenuItem>
                    </Menu>
                </FilterDetailWrapper>
                <DatePicker
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    renderInput={renderCustomInput}
                    inputPlaceholder="Select a date"
                    colorPrimary="#0fbcf9"
                    colorPrimaryLight="rgba(75, 207, 250, 0.4)"
                    shouldHighlightWeekends
                />
                <Button 
                    variant="contained"
                    color="secondary"
                    onClick={resetFilter}
                    size="large"
                    disabled={resetButton()}
                >
                    Reset Filter
                </Button>
                <RowsPaginationWrapper>
                    <Typography variant="subtitle1" component="div">
                        Rows per page:
                    </Typography>
                    <Button
                        id="fade-button"
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        size="medium"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {rowsPerPage}
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                        'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleClose('close')}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={() => handleClose(5)}>5</MenuItem>
                        <MenuItem onClick={() => handleClose(10)}>10</MenuItem>
                        <MenuItem onClick={() => handleClose(15)}>15</MenuItem>
                    </Menu>
                </RowsPaginationWrapper>
            </FilterWrapper>
        </div>
    )
}

export default FilterTransactionManagement
