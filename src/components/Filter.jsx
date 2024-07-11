import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";

const FilterComponent = ({ columns, onApplyFilter }) => {
    const [filters, setFilters] = useState([]);
    const [filterColumn, setFilterColumn] = useState('');
    const [filterOperation, setFilterOperation] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Track whether the filter form is open

    const onChangeFilterColumn = (filterColumn) => {
        setFilterColumn(filterColumn)
        setFilterOperation(columns[filterColumn].operations[0])
        setFilterValue(columns[filterColumn].values?.[0] || "")
    }

    useEffect(() => {
        onApplyFilter(filters);
    }, [filters])

    const applyFilter = () => {
        if (filterColumn && filterOperation && filterValue) {
            const newFilter = {
                column: filterColumn,
                operation: filterOperation,
                value: filterValue
            };
            setFilters([...filters, newFilter]);
            setFilterColumn('');
            setFilterOperation('');
            setFilterValue('');
            setIsOpen(false)
        }
    };

    const removeFilter = (index) => {
        const updatedFilters = [...filters];
        updatedFilters.splice(index, 1);
        setFilters(updatedFilters);
    };

    return (
        <div className="relative inline-block text-left pb-4">
            <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                Bộ lọc
            </button>
            {/* Dropdown panel */}
            {isOpen && (
                <div
                    className="origin-top-right absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                    role="menu"
                    aria-orientation="vertical"
                >
                    <div className="px-4 py-3">
                        {/* Filter form */}
                        <div className="space-y-2">
                            {/* Select column */}
                            <div>
                                <label htmlFor="column" className="block text-sm font-medium text-gray-700">
                                    Cột
                                </label>
                                <select
                                    id="column"
                                    name="column"
                                    value={filterColumn}
                                    onChange={(e) => onChangeFilterColumn(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                >
                                    <option value="">Chọn cột</option>
                                    {Object.keys(columns).filter((column) => !filters.map((filter) => filter.column).includes(column)).map((key) => (
                                        <option key={key} value={key}>
                                            {columns[key].name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Select operation */}
                            {filterColumn && (<>
                                <div>
                                    <label htmlFor="operation" className="block text-sm font-medium text-gray-700">
                                        Operation
                                    </label>
                                    <select
                                        id="operation"
                                        name="operation"
                                        value={filterOperation}
                                        onChange={(e) => setFilterOperation(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    >
                                        {columns[filterColumn]?.operations?.map((operation) => (
                                            <option key={operation} value={operation}>
                                                {operation}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                                        Value
                                    </label>
                                    {columns[filterColumn]?.values ? (
                                        <select
                                            id="value"
                                            name="value"
                                            value={JSON.stringify(filterValue)}
                                            onChange={(e) => setFilterValue(JSON.parse(e.target.value))}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        >
                                            {columns[filterColumn]?.values.map((value) => (
                                                <option key={value.value} value={JSON.stringify(value)}>
                                                    {value.label}
                                                </option>
                                            ))}
                                        </select>) : (
                                        <input
                                            type={columns[filterColumn].type}
                                            id="value"
                                            name="value"
                                            value={filterValue}
                                            onChange={(e) => setFilterValue(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        />)}
                                </div></>
                            )}

                            {/* Apply filter button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={applyFilter}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue"
                                >
                                    Lọc
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Show badges only if filters exist */}
            {filters.length > 0 && (
                <div className="flex space-x-2 mt-2">
                    {filters.map((filter, index) => (
                        <div key={index} className="flex items-center bg-gray-100 rounded-md px-3 py-1">
                            <span className="text-sm font-medium text-gray-800">{columns[filter.column].name} {filter.operation} {filter.value.label || filter.value}</span>
                            <IoIosCloseCircleOutline
                                className="ml-2 text-lg text-red-600 cursor-pointer"
                                onClick={() => removeFilter(index)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterComponent