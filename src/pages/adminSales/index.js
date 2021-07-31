import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ChartRevenue from '../../components/financialReport/chartRevenue'
import { URL_API } from '../../helper'
import { Container } from './adminSales'

const SalesReport = () => {
    const [values, setValues] = useState(null)
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
    })

    useEffect(() => {
        const setQueryDateFilter = () => {
            if (selectedDayRange.from !== null && selectedDayRange.to !== null) {
                let query = `from=${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}&to=${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
                // console.log("Date filter", query)
                return query
            }
        }
        const getRevenue = async () => {
            try {
                let token = localStorage.getItem("tkn_id")
                let queryDate = ''
                if (setQueryDateFilter() !== undefined) {
                    queryDate = setQueryDateFilter()
                }
                let config = {
                    method: 'get',
                    url: URL_API + `/financial-report/revenue?${queryDate}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                let response = await axios(config)
                setValues(response.data)
                console.log("getRevenue", response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getRevenue()
    }, [selectedDayRange.from, selectedDayRange.to])
    
    return (
        <div>
            <Container>
                <ChartRevenue 
                    values={values}
                    selectedDayRange={selectedDayRange}
                    setSelectedDayRange={setSelectedDayRange}
                />
            </Container>
        </div>
    )
}

export default SalesReport
