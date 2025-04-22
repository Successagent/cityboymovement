// Helper function to convert data to CSV format
export async function exportMembersToCSV(
  data: Array<{ state: string; memberCount: number; lastUpdated: string }>,
  filename: string,
) {
  // Create CSV header
  const header = "State,Member Count,Last Updated\n"

  // Convert data to CSV rows
  const rows = data.map((item) => `${item.state},${item.memberCount},"${item.lastUpdated}"`).join("\n")

  // Combine header and rows
  const csvContent = `${header}${rows}`

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

  // Create a download link and trigger the download
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}-members.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Helper function to convert data to Excel format
export async function exportMembersToExcel(
  data: Array<{ state: string; memberCount: number; lastUpdated: string }>,
  filename: string,
) {
  // In a real application, you would use a library like exceljs or xlsx
  // For this example, we'll create a simple HTML table and export it as an Excel file

  // Create a table element
  const table = document.createElement("table")

  // Create header row
  const headerRow = document.createElement("tr")
  const headers = ["State", "Member Count", "Last Updated"]
  headers.forEach((headerText) => {
    const header = document.createElement("th")
    header.textContent = headerText
    headerRow.appendChild(header)
  })
  table.appendChild(headerRow)

  // Create data rows
  data.forEach((item) => {
    const row = document.createElement("tr")

    const stateCell = document.createElement("td")
    stateCell.textContent = item.state
    row.appendChild(stateCell)

    const countCell = document.createElement("td")
    countCell.textContent = item.memberCount.toString()
    row.appendChild(countCell)

    const dateCell = document.createElement("td")
    dateCell.textContent = item.lastUpdated
    row.appendChild(dateCell)

    table.appendChild(row)
  })

  // Convert table to Excel-compatible HTML
  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          table { border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${table.outerHTML}
      </body>
    </html>
  `

  // Create a Blob with the HTML content
  const blob = new Blob([html], { type: "application/vnd.ms-excel" })

  // Create a download link and trigger the download
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}-members.xls`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

