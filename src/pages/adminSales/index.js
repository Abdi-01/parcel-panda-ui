import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ChartRevenue from '../../components/financialReport/chartRevenue'
import { URL_API } from '../../helper'
import { Container } from './adminSales'

const SalesReport = () => {
    const [values, setValues] = useState(null)

    const getRevenue = async () => {
        try {
            let token = localStorage.getItem("tkn_id")
            let config = {
                method: 'get',
                url: URL_API + `/financial-report/revenue`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            let response = await axios(config)
            setValues(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRevenue()
    }, [])

    return (
        <div>
            <Container>
                <ChartRevenue values={values}/>
            </Container>
        </div>
    )
}

export default SalesReport
