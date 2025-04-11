// import React from 'react';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const POCKETBASE_URL = 'https://api.alphalake.services'; 
// const PER_PAGE = 500;

// const ExportXpoLogs: React.FC = () => {
//   const fetchAllXpoLogs = async () => {
//     let page = 1;
//     let allItems: any[] = [];
//     let hasMore = true;

//     while (hasMore) {
//       const res = await fetch(
//         `${POCKETBASE_URL}/api/collections/xpo_logs/records?page=${page}&perPage=${PER_PAGE}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const data = await res.json();
//       allItems = [...allItems, ...data.items];
//       page++;

//       if (page > data.totalPages) {
//         hasMore = false;
//       }
//     }

//     return allItems;
//   };

//   const handleExport = async () => {
//     const data = await fetchAllXpoLogs();

//     if (data.length === 0) {
//       alert('No data found.');
//       return;
//     }

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'XPO Logs');

//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

//     saveAs(blob, 'xpo_logs.xlsx');
//   };

//   return (
//     <button
//       onClick={handleExport}
//       className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm"
//     >
//       Export XPO Logs to Excel
//     </button>
//   );
// };

// export default ExportXpoLogs;

import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const POCKETBASE_URL = 'https://api.alphalake.services';
const PER_PAGE = 500;

// Define an interface for the structure of a single log record
// Add or remove fields based on your actual PocketBase collection schema
interface XpoLogRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  filename: string;
  uuid: string;
  rows_count: number;
  run_time: number;
  human_hours_saved: number; // Assuming this is calculated or stored
  partner_name: string;
  // Add any other relevant fields from your xpo_logs collection
}

// Define an interface for the paginated response from PocketBase
interface PaginatedResponse<T> {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

const ExportXpoLogs: React.FC = () => {
  const fetchAllXpoLogs = async (): Promise<XpoLogRecord[]> => {
    let page = 1;
    let allItems: XpoLogRecord[] = []; // Use the specific type XpoLogRecord[]
    let hasMore = true;

    while (hasMore) {
      try {
        const res = await fetch(
          `${POCKETBASE_URL}/api/collections/xpo_logs/records?page=${page}&perPage=${PER_PAGE}`,
          {
            // Consider adding cache control if needed
            // cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
              // Add Authorization header if your collection requires authentication
              // 'Authorization': `Bearer YOUR_TOKEN`,
            },
          }
        );

        if (!res.ok) {
          // Handle HTTP errors (e.g., 404, 500)
          console.error(`Error fetching page ${page}: ${res.status} ${res.statusText}`);
          // Decide how to proceed: break, throw, or return partial data
          hasMore = false; // Stop fetching on error
          continue;       // Or break;
        }

        // Type the response data using the PaginatedResponse interface
        const data: PaginatedResponse<XpoLogRecord> = await res.json();

        if (data && data.items) {
            allItems = [...allItems, ...data.items];
            page++;
            if (page > data.totalPages) {
              hasMore = false;
            }
        } else {
             // Handle unexpected response structure
             console.error(`Unexpected data structure on page ${page}:`, data);
             hasMore = false; // Stop fetching if data is malformed
        }

      } catch (error) {
        // Handle network errors or JSON parsing errors
        console.error(`Error during fetch for page ${page}:`, error);
        hasMore = false; // Stop fetching on error
      }
    }

    return allItems;
  };

  const handleExport = async () => {
    try {
        const data: XpoLogRecord[] = await fetchAllXpoLogs(); // Data is now typed

        if (data.length === 0) {
          alert('No data found to export.');
          return;
        }

        // Optional: Select/Order columns or format data before creating the sheet
        const dataToExport = data.map(record => ({
            Filename: record.filename,
            UUID: record.uuid,
            'Rows Count': record.rows_count,
            'Run Time (s)': record.run_time, // Specify unit if helpful
            'Partner Name': record.partner_name,
            Created: new Date(record.created).toLocaleString(), // Format date nicely
            // Add/remove/rename fields as needed for the export
        }));


        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'XPO Logs');

        // Adjust column widths (optional)
        // Example: Set first column width to 30 characters
        // const wscols = [{ wch: 30 }, { wch: 40 }, {wch: 15}, {wch: 15}, {wch: 20}, {wch: 25}];
        // worksheet['!cols'] = wscols;


        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }); // Correct MIME type

        saveAs(blob, 'xpo_logs.xlsx');
    } catch (error) {
         console.error("Error during export:", error);
         alert("An error occurred while exporting the data. Please check the console.");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm"
    >
      Export XPO Logs to Excel
    </button>
  );
};

export default ExportXpoLogs;