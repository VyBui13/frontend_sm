"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPen,
  faArrowLeft,
  faArrowRight,
  faEye,
  faFilter,
  faSort,
  faRotateRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import { use, useEffect, useState } from "react"
import NothingDisplay from "./NothingDisplay"
import Dropdown from "./Dropdown"
import Button from "./Button"

interface DataTableProps<T = any> {
  headers: (keyof T)[]
  data: T[]
  proportions: number[]
  numOfRows: number
  heightRow: number
  filter?: {
    title: string
    column: string
    data: string[]
  }[]
  sort?: (keyof T)[]
  action: (item: T) => void
}

const DataTable = <T extends object>({
  headers,
  data,
  proportions,
  numOfRows,
  heightRow,
  filter,
  action,
}: DataTableProps<T>) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [sortConfig, setSortConfig] = useState<{
    column: keyof T
    order: "asc" | "desc"
  } | null>(null)

  const handleFilterChange = (column: string, value?: string) => {
    setFilterValues((prev) => {
      const updated = { ...prev }
      if (!value) {
        delete updated[column]
      } else {
        updated[column] = value
      }
      return updated
    })
  }

  const toggleSort = (column: keyof T) => {
    setSortConfig((prev) => {
      if (column === undefined) {
        return null;
      }
      if (prev?.column === column) {
        return { column, order: prev.order === "asc" ? "desc" : "asc" }
      } else {
        return { column, order: "asc" }
      }
    })
  }

  const filteredData = data.filter((item) => {
    return Object.entries(filterValues).every(([column, value]) => {
      if (!value) return true
      return String(item[column as keyof T]) === value
    })
  })

  const sortedData = [...filteredData]
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.column]
      const bValue = b[sortConfig.column]
      if (aValue < bValue) return sortConfig.order === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.order === "asc" ? 1 : -1
      return 0
    })
  }

  const [page, setPage] = useState(1)

  const increasePage = () => {
    if (page < Math.ceil(sortedData.length / numOfRows)) {
      setPage(page + 1)
    }
  }

  const decreasePage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    setPage(1)
  }, [filterValues, sortConfig])

  return (
    <div className="main-container w-full">
      <div className="filter-bar mb-2 flex items-center justify-between">
        <div className="left flex items-center gap-2">
          <Button
            icon={faRotateRight}
            className="bg-[var(--main-color)] text-[var(--text-in-background-color)]"
            action={() => setFilterValues({})}
          />
          {filter?.map((item, index) => (
            <Dropdown
              key={index}
              title={item.title}
              value={filterValues[item.column] || ""}
              dataList={[...item.data]}
              actionChoose={(value) => handleFilterChange(item.column, value)}
              iconProp={faFilter}
              className="bg-[var(--main-color)] text-[var(--text-in-background-color)]"
              width={150}
              isDropMenu={true}
              itemDisplay={5}
            />
          ))}
        </div>
        <div className="right flex items-center gap-2">
          <div className="search flex items-center gap-2">
            <input
              className="border-b-2 border-[var(--main-color)] outline-none p-1 text-sm text-[var(--text-color)]"
              type="text"
              placeholder="Search..."
            />
            <Button
              icon={faMagnifyingGlass}
              className="bg-[var(--main-color)] text-[var(--text-in-background-color)]"
              action={() => { }} // Implement search functionality here
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col overflow-hidden rounded border-3 border-[var(--main-color)]">
        {/* Header */}
        <div className="flex bg-[var(--main-color)] text-[var(--text-in-background-color)]">
          {headers.map((header, index) => (
            <div
              key={index}
              style={{
                flex: `${proportions[index]}`,
              }}
              className={`flex items-center justify-center p-2 font-bold`}
            >
              <Button
                label={header.toString().toUpperCase()}
                className="bg-[var(--main-color)] text-[var(--text-in-background-color)] hover:bg-[var(--text-in-background-color)] hover:text-[var(--main-color)]"
                icon={faSort}
                action={() => toggleSort(header)}
              />
            </div>
          ))}
          <div
            style={{
              flex: 1,
            }}
            className="flex items-center justify-center p-2 font-bold"
          >
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            height: `calc(${heightRow}px * ${numOfRows})`,
          }}
          className="flex flex-col"
        >
          {data.length === 0 && (
            <NothingDisplay title="No data found!" description="" />
          )}
          {sortedData
            .slice((page - 1) * numOfRows, page * numOfRows)
            .map((item, rowIndex) => (
              <div
                style={{
                  height: `${heightRow}px`,
                }}
                key={rowIndex}
                className="flex border-b transition hover:bg-gray-100"
              >
                {headers.map((header, colIndex) => (
                  <div
                    key={colIndex}
                    style={{
                      flex: `${proportions[colIndex]}`,
                    }}
                    className={`flex items-center justify-center p-2 font-bold`}
                  >
                    {String(item[header])}
                  </div>
                ))}
                <div
                  style={{
                    flex: 1,
                  }}
                  className="flex items-center justify-center p-2"
                >

                  <Button
                    type="warning"
                    icon={faPen}
                    action={() => action(item)}
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 bg-[var(--main-color)] text-[var(--text-in-background-color)] px-4 py-2">
          <div className="left flex items-center justify-center gap-2 ">
            <FontAwesomeIcon icon={faEye} className="text-[var(--text-in-background-color)]" />
            <span
              className="text-[var(--text-in-background-color)] font-bold"
            >{data.length} item(s)</span>
          </div>

          <div className="right flex items-center justify-center gap-4 ">
            <span className="text-[var(--text-in-background-color)] font-bold">
              {page} | {Math.ceil(sortedData.length / numOfRows)}
            </span>

            <div className="button flex items-center justify-center gap-1">
              <Button
                className="bg-[var(--text-in-background-color)] text-[var(--main-color)]"
                icon={faArrowLeft}
                action={decreasePage}
              />

              <Button
                className="bg-[var(--text-in-background-color)] text-[var(--main-color)]"
                icon={faArrowRight}
                action={increasePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable
