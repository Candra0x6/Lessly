import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableProps {
  data: any[]
  columns: {
    key: string
    label: string
    render?: (value: any, row: any) => React.ReactNode
  }[]
}

export function DataTable({ data, columns }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
