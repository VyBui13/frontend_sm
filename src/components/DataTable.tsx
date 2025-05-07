"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPen,
  faArrowLeft,
  faArrowRight,
  faHashtag,
  faFilter,
  faSort,
} from "@fortawesome/free-solid-svg-icons"
import { use, useEffect, useState } from "react"
import NothingDisplay from "./NothingDisplay"
import Dropdown from "./Dropdown"

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
  sort,
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
      <div className="filter-bar mb-2">
        <div className="left flex items-center gap-2">
          {filter?.map((item, index) => (
            <Dropdown
              key={index}
              title={item.title}
              value={filterValues[item.column] || ""}
              dataList={[...item.data]}
              actionChoose={(value) => handleFilterChange(item.column, value)}
              iconProp={faFilter}
              width={150}
              type="black"
              isDropMenu={true}
              itemDisplay={5}
            />
          ))}
          {sort &&
            sort.map((item, index) => (
              <Dropdown
                key={index}
                title={String(item)}
                value={sortConfig?.column === item ? sortConfig.order : ""}
                dataList={["asc", "desc"]}
                actionChoose={() => toggleSort(item)}
                iconProp={faSort}
                width={150}
                type="black"
                isDropMenu={true}
                itemDisplay={2}
              />
            ))}
        </div>
        <div className="right"></div>
      </div>

      <div className="flex w-full flex-col overflow-hidden rounded border-2 border-black">
        {/* Header */}
        <div className="flex bg-black text-white">
          {headers.map((header, index) => (
            <div
              key={index}
              style={{
                flex: `${proportions[index]}`,
              }}
              className={`flex items-center justify-center p-2 font-bold`}
            >
              {header.toString().toUpperCase()}
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
                  <button
                    onClick={() => action(item)}
                    className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-blue-500 transition duration-200 hover:bg-white"
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-xs text-white hover:text-black"
                    />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 bg-black text-white">
          <div className="left flex items-center justify-center gap-2 p-2">
            <FontAwesomeIcon icon={faHashtag} className="text-white" />
            <span>{data.length} item(s)</span>
          </div>

          <div className="right flex items-center justify-center gap-2 p-2">
            <span className="text-white">
              {page} | {Math.ceil(sortedData.length / numOfRows)}
            </span>

            <div className="button flex items-center justify-center gap-1">
              <button
                onClick={decreasePage}
                className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-blue-500 transition duration-200 hover:bg-white hover:text-black"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-xs text-white hover:text-black"
                />
              </button>
              <button
                onClick={increasePage}
                className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-blue-500 transition duration-200 hover:bg-white hover:text-black"
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs text-white hover:text-black"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable
