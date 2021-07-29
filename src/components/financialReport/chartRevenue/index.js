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
  DateWrapper 
} from "./chartRevenue";


const ChartRevenue = ({ values }) => {
    const [dataX, setData] = useState(null)
    const [revenue, setRevenue] = useState({
        day: 0,
        month: 0,
        total: 0
    })
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
    });

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

    const resetFilter = () => {
      setSelectedDayRange({...selectedDayRange, from: null, to: null})
  }

    useEffect(() => {
        const fetchData = () => {
            if (values !== null) {
                let tmp = values.data
                const options = { year: 'numeric', month: 'long', day: 'numeric' }
                for (let prop in tmp) {
                    tmp[prop].date = new Date(tmp[prop].date).toLocaleDateString('en-GB', options)
                    // tmp[prop].revenue = tmp[prop].revenue.toLocaleString()
                }
                setData(tmp)
                setRevenue({
                    ...revenue,
                    day: values.day,
                    month: values.month,
                    total: values.total
                })
            }
        }
        fetchData()
    }, [values, revenue])

    return (
        <div>
            <RevenueCard data={revenue}/>
            <ChartFilterWrapper>
              <FilterWrapper>
                <h5>Revenue Analytics</h5>
                <DateWrapper>
                  <Button 
                      variant="contained"
                      color="secondary"
                      onClick={resetFilter}
                      size="large"
                      // disabled={resetButton()}
                  >
                      Reset Filter
                  </Button>
                  <DatePicker
                      value={selectedDayRange}
                      onChange={setSelectedDayRange}
                      renderInput={renderCustomInput}
                      inputPlaceholder="Select a date"
                      colorPrimary="#0fbcf9"
                      colorPrimaryLight="rgba(75, 207, 250, 0.4)"
                      shouldHighlightWeekends
                  />
                </DateWrapper>
              </FilterWrapper>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  // width={900}
                  // height={400}
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
                  <Line type="monotone" dataKey="revenue" stroke="#3f50b5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartFilterWrapper>
        </div>
    )
};

export default ChartRevenue;
