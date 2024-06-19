import React, { useEffect } from 'react'
import { useTabContext } from '../../utils/customHook/SideTabProvider';

const Analytics = (props) => {
    const { setActiveTab } = useTabContext()
    useEffect(() => {
        setActiveTab("analytics")
    }, [])

    return "Thống kê"
}

export default Analytics