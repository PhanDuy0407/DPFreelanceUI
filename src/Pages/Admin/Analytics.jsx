import React, { useEffect } from 'react'
import { useTabContext } from '../../utils/customHook/SideTabProvider';

const Analytics = (props) => {
    const { setActiveTab } = useTabContext()
    useEffect(() => {
        setActiveTab("analytics")
    }, [])

    return (
        <div className="container mx-auto p-4">
            Thống kê
        </div>
    )
}

export default Analytics