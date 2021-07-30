import React, { useState, useEffect } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  AreaChart,
  Area,
} from "recharts";
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
  DisplayWrapper
} from "./chartRevenue";

const options = [
  'revenue',
  'item',
];

const ChartRevenue = ({ values, selectedDayRange, setSelectedDayRange, selectedIndex, resetFilter }) => {
    const [dataX, setData] = useState(null)
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
          setData(tmp)
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

    return (
        <div>
          <DisplayWrapper>
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
                    // disabled={resetButton()}
                  >
                    Reset Filter
                  </Button>
                </DateWrapper>
              </FilterWrapper>
              <ResponsiveContainer width="100%" height={550}>
                {/* <LineChart
                  data={dataX}
                  margin={{
                      top: 20,
                      right: 20,
                      left: 20,
                      bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date">
                      <Label value="Date" offset={-10} position="insideBottom" />
                  </XAxis>
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top"/>
                  <Line type="monotone" dataKey="val" stroke="#3f50b5" activeDot={{ r: 8 }} />
                </LineChart> */}
                <AreaChart
                  width={500}
                  height={400}
                  data={dataX}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  {
                    options[selectedIndex] === "revenue" ? <Area type="monotone" dataKey="user_spent" stroke="#82ca9d" fill="#82ca9d" /> : <></>
                  }
                  <Area 
                    type="monotone" 
                    dataKey={options[selectedIndex] === "item" ? "amount" : "profit"}
                    stroke="#3f50b5" 
                    fill="#3f50b5" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartFilterWrapper>
          </DisplayWrapper>
        </div>
    )
};

export default ChartRevenue;
