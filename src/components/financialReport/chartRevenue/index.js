import React, { useState, useEffect } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  Button,
  InputAdornment,
  TextField,
} from "@material-ui/core/";
import RevenueCard from "../revenueCard";
import { 
  ChartFilterWrapper, 
  DateFilterWrapper, 
  FilterWrapper, 
  DateWrapper, 
  DisplayUpperWrapper,
  DisplayBottomWrapper,
  DataWrapper,
  PieChartWrapper
} from "./chartRevenue";
import PieChartComponent from "../pieChart";
import AreaChartComponent from "../areaChart";

const options = [
  'revenue',
  'item',
];

const ChartRevenue = ({ values, selectedDayRange, setSelectedDayRange, selectedIndex, resetFilter }) => {
    const [dataAreaChart, setDataAreaChart] = useState(null)
    const [dataPieChart, setDataPieChart] = useState(null)
    const [revenue, setRevenue] = useState({
        day: 0,
        month: 0,
        total: 0,
        filtered: 0
    })

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
      const fetchData = () => {
        if (values !== null) {
          console.log(values)
          let tmp = values.data
          const options = { year: 'numeric', month: 'long', day: 'numeric' }
          for (let prop in tmp) {
            tmp[prop].date = new Date(tmp[prop].date).toLocaleDateString('en-GB', options)
          }
          setDataAreaChart(tmp)
          setDataPieChart(values.top)
          setRevenue({
            ...revenue,
            day: values.day,
            month: values.month,
            total: values.total,
            filtered: values.filtered
          })
        }
      }
      fetchData()
    }, [values])

    // console.log("Values", values)

    return (
        <div>
          <DisplayUpperWrapper>
            <RevenueCard data={revenue} type={options[selectedIndex]}/>
            <ChartFilterWrapper>
              <FilterWrapper>
                <h5>{options[selectedIndex]} analytics</h5>
                <DateWrapper>
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
                    disabled={selectedDayRange.from === null && selectedDayRange.to === null}
                  >
                    Reset Filter
                  </Button>
                </DateWrapper>
              </FilterWrapper>
              <AreaChartComponent data={dataAreaChart} option={options[selectedIndex]}/>
            </ChartFilterWrapper>
          </DisplayUpperWrapper>
          <DisplayBottomWrapper>
            <h4>Top {options[selectedIndex]}</h4>
            <PieChartWrapper>
              <PieChartComponent data={dataPieChart} option={options[selectedIndex]}/>
            </PieChartWrapper>
          </DisplayBottomWrapper>
        </div>
    )
};

export default ChartRevenue;
