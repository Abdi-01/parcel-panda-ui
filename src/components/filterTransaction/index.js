import React, { useEffect, useState } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import DatePicker from "react-modern-calendar-datepicker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PaymentIcon from "@material-ui/icons/Payment";
import {
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
} from "@material-ui/core/";
import { 
    DateFilterWrapper,
    FilterWrapper, 
    FilterDetailWrapper 
} from './filterTransaction';


const FilterTransactionManagement = ({paymentStatus, setPaymentStatus, selectedDayRange, setSelectedDayRange, resetFilter}) => {
    const [anchorPayment, setAnchorPayment] = useState(null);
    const openPayment = Boolean(anchorPayment)

    const handleClickPayment = (event) => {
        setAnchorPayment(event.currentTarget);
    };

    const handleClosePayment = () => {
        setAnchorPayment(null);
    };

    const handleChangePaymentStatus = (event) => {
        setPaymentStatus({
          ...paymentStatus,
          [event.target.name]: event.target.checked,
        });
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

    useEffect(() => {
        // filterTransaction()
    }, [paymentStatus])

    return (
        <div>
            <FilterWrapper>
                <h5>Filter</h5>
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
                    {/* <MenuItem>
                        {"Choose transaction"}
                    </MenuItem> */}
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
                >
                    Reset Filter
                </Button>
            </FilterWrapper>
        </div>
    )
}

export default FilterTransactionManagement
