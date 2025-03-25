// "use client";


// import { useEffect, useState } from "react";
// import { ResponsiveContainer, Line, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart } from "recharts";
// import pb from "@/lib/pocketbase";


// interface LogData {
//     filename: string;
//     uuid: string;
//     rows_count: number;
//     run_time: number;
//     human_hours_saved: number;
//     partner_name: string;
//     created: string; 
// }

// const formatXAxis = (created: string | number, filter: string) => {
//     const date = new Date(created);
//     if (isNaN(date.getTime())) return "";

//     if (filter === "Today" || filter === "Yesterday") {
//         const hour = date.getHours();
//         return hour % 2 === 0 ? `${hour}` : "";
//     } else if (filter === "This Week") {
//         return date.toLocaleDateString("en-US", { weekday: "short" });
//     } else if (filter === "This Month") {
//         return date.getDate() % 5 === 0 ? String(date.getDate()) : "";
//     }
//     return "";
// };

// const getOrdinalSuffix = (num: number) => {
//     const j = num % 10;
//     const k = num % 100;
//     if (j === 1 && k !== 11) {
//         return `${num}st`;
//     }
//     if (j === 2 && k !== 12) {
//         return `${num}nd`;
//     }
//     if (j === 3 && k !== 13) {
//         return `${num}rd`;
//     }
//     return `${num}th`;
// };

// const manualTaskCompletionTimeInSeconds = 150;

// const calculateHumanHoursSaved = (totalTasks: number, totalRunTime: number) => {
//     const timeSavedInSeconds = (totalTasks * manualTaskCompletionTimeInSeconds) - totalRunTime;
//     return timeSavedInSeconds / 3600; 
// };

// const generateHourlyData = (logs: LogData[], date: Date) => {
//     const hourlyData: { [hour: number]: { run_time: number, human_hours_saved: number, count: number, total_tasks: number } } = {};
    
//     for (let hour = 0; hour < 24; hour++) {
//         hourlyData[hour] = { run_time: 0, human_hours_saved: 0, count: 0, total_tasks: 0 };
//     }
    
//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime())) {
//             // Check if log is from today
//             const today = new Date(date);
//             today.setHours(0, 0, 0, 0);
//             const tomorrow = new Date(today);
//             tomorrow.setDate(tomorrow.getDate() + 1);
            
//             if (logDate >= today && logDate < tomorrow) {
//                 const hour = logDate.getHours();
//                 hourlyData[hour].run_time += log.run_time;
//                 hourlyData[hour].total_tasks += log.rows_count;
//                 hourlyData[hour].count += 1;
//             }
//         }
//     });
    
//     // Convert to array and calculate averages and human hours saved
//     return Array.from({ length: 24 }, (_, hour) => {
//         const hourData = hourlyData[hour];
//         const logCount = hourData.count || 1; // Avoid division by zero
        
//         // Calculate human hours saved using the formula
//         const totalRunTime = hourData.run_time;
//         const totalTasks = hourData.total_tasks;
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
        
//         return {
//             created: new Date(date).setHours(hour, 0, 0, 0),
//             run_time: hourData.count ? hourData.run_time / logCount : 0,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             hour: `${hour}`
//         };
//     });
// };

// // Generate weekly data with all 7 days visible
// const generateWeeklyData = (logs: LogData[]) => {
//     const weekData = [];
//     const now = new Date();
//     const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
//     // Create data for all 7 days of the week
//     for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(date.getDate() - currentDay + i); // Start from the beginning of the week (Sunday)
//         date.setHours(0, 0, 0, 0);
        
//         const nextDay = new Date(date);
//         nextDay.setDate(nextDay.getDate() + 1);
        
//         // Filter logs for this day
//         const dayLogs = logs.filter(log => {
//             const logDate = new Date(log.created);
//             return logDate >= date && logDate < nextDay;
//         });
        
//         // Calculate aggregates
//         const totalRunTime = dayLogs.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = dayLogs.reduce((sum, log) => sum + log.rows_count, 0);
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
        
//         // Calculate averages for runtime
//         const avgRunTime = dayLogs.length ? totalRunTime / dayLogs.length : 0;
        
//         weekData.push({
//             created: date.toISOString(),
//             run_time: avgRunTime,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             day: date.toLocaleDateString("en-US", { weekday: "short" })
//         });
//     }
    
//     return weekData;
// };

// // Generate monthly data grouped by weeks
// const generateMonthlyData = (logs: LogData[]) => {
//     const monthData = [];
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();
    
//     // Get the first day of the current month
//     const firstDayOfMonth = new Date(year, month, 1);
    
//     // Get the number of days in the current month
//     const lastDayOfMonth = new Date(year, month + 1, 0);
//     const daysInMonth = lastDayOfMonth.getDate();
    
//     // Divide the month into weeks (usually 4-5 weeks)
//     const weeksInMonth = Math.ceil(daysInMonth / 7);
    
//     for (let weekNum = 0; weekNum < weeksInMonth; weekNum++) {
//         // Calculate the start and end dates for this week
//         const weekStartDay = weekNum * 7 + 1;
//         const weekStartDate = new Date(year, month, weekStartDay);
        
//         const weekEndDay = Math.min((weekNum + 1) * 7, daysInMonth);
//         const weekEndDate = new Date(year, month, weekEndDay + 1); // +1 to include the entire last day
        
//         // Skip future weeks
//         if (weekStartDate > now) continue;
        
//         // Filter logs for this week
//         const weekLogs = logs.filter(log => {
//             const logDate = new Date(log.created);
//             return logDate >= weekStartDate && logDate < weekEndDate;
//         });
        
//         // Calculate aggregates
//         const totalRunTime = weekLogs.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = weekLogs.reduce((sum, log) => sum + log.rows_count, 0);
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
        
//         // Calculate averages for runtime
//         const avgRunTime = weekLogs.length ? totalRunTime / weekLogs.length : 0;
        
//         // Add the week data
//         monthData.push({
//             created: weekStartDate.toISOString(),
//             run_time: avgRunTime,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             week: `${getOrdinalSuffix(weekNum + 1)} week`,
//             weekNum: weekNum + 1
//         });
//     }
    
//     return monthData;
// };

// // Custom tooltip to show total time values
// const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//         const data = payload[0].payload;
//         return (
//             <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
//                 <p className="font-semibold">{data.day || data.week || new Date(data.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
//                 <p>Average Runtime: {payload[0].value.toFixed(2)} seconds</p>
//                 <p className="text-gray-400">Total Runtime: {data.total_runtime ? data.total_runtime.toFixed(2) : 0} seconds</p>
//                 <p className="text-gray-400">Total Tasks: {data.total_tasks || 0}</p>
//             </div>
//         );
//     }
//     return null;
// };

// // Custom tooltip for human hours saved
// const HoursTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//         const data = payload[0].payload;
//         return (
//             <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
//                 <p className="font-semibold">{data.day || data.week || new Date(data.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
//                 <p>Hours Saved: {payload[0].value.toFixed(2)} hours</p>
//                 <p className="text-gray-400">Total Time: {(data.total_tasks * manualTaskCompletionTimeInSeconds / 3600).toFixed(2)} hours</p>
//                 <p className="text-gray-400">Time Saved: {((data.total_tasks * manualTaskCompletionTimeInSeconds - data.total_runtime) / 3600).toFixed(2)} hours</p>
//                 <p className="text-gray-400">Total Tasks: {data.total_tasks || 0}</p>
//             </div>
//         );
//     }
//     return null;
// };

// export default function XpoDashboard() {
//     const [logs, setLogs] = useState<LogData[]>([]);
//     const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);
//     const [hourlyData, setHourlyData] = useState<any[]>([]);
//     const [weeklyData, setWeeklyData] = useState<any[]>([]);
//     const [monthlyData, setMonthlyData] = useState<any[]>([]);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activePage, setActivePage] = useState("XPO Services Dashboard");
//     const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
//     const [selectedProcess, setSelectedProcess] = useState("All");
//     const [totalMetrics, setTotalMetrics] = useState({
//         totalRuntime: 0,
//         totalTasks: 0,
//         totalTimeSaved: 0
//     });

//     useEffect(() => {
//         async function fetchLogs() {
//             try {
//                 const data = await pb.collection("xpo_logs").getFullList<LogData>();
//                 setLogs(data);
//                 setFilteredLogs(data);
//             } catch (error) {
//                 console.error("Error fetching logs:", error);
//             }
//         }
//         fetchLogs();
//     }, []);

//     useEffect(() => {
//         let filteredData = logs;
//         const now = new Date();
//         const todayStart = new Date(now.setHours(0, 0, 0, 0));
//         const yesterdayStart = new Date(todayStart);
//         yesterdayStart.setDate(todayStart.getDate() - 1);

//         const weekStart = new Date();
//         weekStart.setDate(now.getDate() - now.getDay());

//         const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

//         filteredData = filteredData.filter((log) => {
//             const logDate = new Date(log.created);
//             if (isNaN(logDate.getTime())) return false;

//             switch (selectedDateFilter) {
//                 case "Today":
//                     return logDate >= todayStart;
//                 case "Yesterday":
//                     return logDate >= yesterdayStart && logDate < todayStart;
//                 case "This Week":
//                     return logDate >= weekStart;
//                 case "This Month":
//                     return logDate >= monthStart;
//                 default:
//                     return true;
//             }
//         });

//         if (selectedProcess !== "All") {
//             filteredData = filteredData.filter((log) => log.partner_name === selectedProcess);
//         }

//         setFilteredLogs(filteredData);
        
//         // Calculate total metrics for the selected time period
//         const totalRuntime = filteredData.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = filteredData.reduce((sum, log) => sum + log.rows_count, 0);
//         const totalTimeSaved = (totalTasks * manualTaskCompletionTimeInSeconds) - totalRuntime;
        
//         setTotalMetrics({
//             totalRuntime,
//             totalTasks,
//             totalTimeSaved
//         });
        
//         // Generate specific data based on the filter
//         if (selectedDateFilter === "Today") {
//             setHourlyData(generateHourlyData(filteredData, new Date()));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "Yesterday") {
//             const yesterday = new Date();
//             yesterday.setDate(yesterday.getDate() - 1);
//             setHourlyData(generateHourlyData(filteredData, yesterday));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Week") {
//             setWeeklyData(generateWeeklyData(filteredData));
//             setHourlyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Month") {
//             setMonthlyData(generateMonthlyData(filteredData));
//             setHourlyData([]);
//             setWeeklyData([]);
//         } else {
//             setHourlyData([]);
//             setWeeklyData([]);
//             setMonthlyData([]);
//         }
//     }, [selectedDateFilter, selectedProcess, logs]);

//     // Choose which data to use for the charts
//     const chartData = 
//         selectedDateFilter === "Today" || selectedDateFilter === "Yesterday" 
//             ? hourlyData 
//             : selectedDateFilter === "This Week"
//                 ? weeklyData
//                 : selectedDateFilter === "This Month"
//                     ? monthlyData
//                     : filteredLogs;

//     // Formatter for x-axis in hourly view
//     const formatHourlyXAxis = (timestamp: number) => {
//         if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
//             const date = new Date(timestamp);
//             const hour = date.getHours();
//             return hour % 2 === 0 ? `${hour}` : "";
//         }
//         return formatXAxis(timestamp, selectedDateFilter);
//     };

//     // Format time in hours, minutes, seconds
//     const formatTime = (seconds: number) => {
//         const hours = Math.floor(seconds / 3600);
//         const minutes = Math.floor((seconds % 3600) / 60);
//         const remainingSeconds = Math.floor(seconds % 60);
        
//         if (hours > 0) {
//             return `${hours}h ${minutes}m ${remainingSeconds}s`;
//         } else if (minutes > 0) {
//             return `${minutes}m ${remainingSeconds}s`;
//         } else {
//             return `${remainingSeconds}s`;
//         }
//     };

//     return (
//         <div className="relative flex h-screen text-white overflow-hidden">
//             <div className="w-16 flex flex-col justify-start items-center bg-al-950 h-full fixed top-16 left-0 z-40">
//                 <button
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     className="mt-6 focus:outline-none g-al-950 p-2 rounded-md"
//                 >
//                     {menuOpen ? (
//                         <div className="text-white text-2xl">✖</div>
//                     ) : (
//                         <div className="flex flex-col space-y-1">
//                             <div className="w-6 h-1 bg-white" />
//                             <div className="w-6 h-1 bg-white" />
//                             <div className="w-6 h-1 bg-white" />
//                         </div>
//                     )}
//                 </button>
//             </div>

//             <div
//                 className={`fixed top-16 left-16 h-full w-64 bg-al-950 shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
//                     }`}
//             >
//                 <ul className="space-y-4 text-lg">
//                     <li className={`cursor-pointer ${activePage === "XPO Services Dashboard" ? "text-[]" : "text-white"}`}
//                         onClick={() => { setActivePage("XPO Services Dashboard"); setMenuOpen(false); }}>
//                         XPO Services Dashboard
//                     </li>
//                     <hr className="border-primary" /> 

//                     <li className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-[]" : "text-white"}`}
//                         onClick={() => { setActivePage("XPO ServiceHub"); setMenuOpen(false); }}>
//                         XPO ServiceHub
//                     </li>
//                     <hr className="border-primary" /> 

//                     <li className={`cursor-pointer ${activePage === "Profile" ? "text-[]" : "text-white"}`}
//                         onClick={() => { setActivePage("Profile"); setMenuOpen(false); }}>
//                         Profile
//                     </li>
//                 </ul>
//             </div>

//             {/* Main Dashboard */}
//             <div className="flex-1 p-6 ml-16">
//                 <h1 className="text-xl font-bold mb-4">{activePage}</h1>

//                 {activePage === "XPO Services Dashboard" && (
//                     <div>
//                         {/* Filters */}
//                         <div className="flex flex-wrap gap-4 mb-6">
//                             {/* Date Filter */}
//                             <div className="flex flex-col">
//                                 <label className="text-sm text-gray-400 mb-1">Date Range</label>
//                                 <select className="bg-[#222] text-white px-3 py-2 rounded-md"
//                                     value={selectedDateFilter}
//                                     onChange={(e) => setSelectedDateFilter(e.target.value)}>
//                                     <option value="Today">Today</option>
//                                     <option value="Yesterday">Yesterday</option>
//                                     <option value="This Week">This Week</option>
//                                     <option value="This Month">This Month</option>
//                                     <option value="All">All Time</option>
//                                 </select>
//                             </div>

//                             {/* Processes (Partner Name) Filter */}
//                             <div className="flex flex-col">
//                                 <label className="text-sm text-gray-400 mb-1">Processes</label>
//                                 <select className="bg-[#222] text-white px-3 py-2 rounded-md"
//                                     value={selectedProcess}
//                                     onChange={(e) => setSelectedProcess(e.target.value)}>
//                                     <option value="All">All</option>
//                                     {Array.from(new Set(logs.map((log) => log.partner_name))).map((partner) => (
//                                         <option key={partner} value={partner}>{partner}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Summary Cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-md font-semibold text-gray-400">Total Tasks</h3>
//                                 <p className="text-2xl font-bold">{totalMetrics.totalTasks}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-md font-semibold text-gray-400">Total Runtime</h3>
//                                 <p className="text-2xl font-bold">{formatTime(totalMetrics.totalRuntime)}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-md font-semibold text-gray-400">Total Time Saved</h3>
//                                 <p className="text-2xl font-bold">{formatTime(totalMetrics.totalTimeSaved)}</p>
//                             </div>
//                         </div>

//                         {/* Graphs in One Row */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             {/* Process Runtime */}
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-lg font-semibold mb-4">Process Runtime</h2>
//                                 <ResponsiveContainer width="100%" height={300}>
//                                     <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
//                                         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//                                         <XAxis 
//                                             dataKey={
//                                                 selectedDateFilter === "This Week" 
//                                                     ? "day" 
//                                                     : selectedDateFilter === "This Month"
//                                                         ? "week"
//                                                         : "created"
//                                             } 
//                                             tickFormatter={
//                                                 selectedDateFilter === "Today" || selectedDateFilter === "Yesterday" 
//                                                     ? formatHourlyXAxis 
//                                                     : selectedDateFilter === "This Week" || selectedDateFilter === "This Month"
//                                                         ? (val) => val
//                                                         : (val) => formatXAxis(val, selectedDateFilter)
//                                             } 
//                                         />
//                                         <YAxis 
//                                             label={{ 
//                                                 value: 'Runtime (seconds)', 
//                                                 angle: -90, 
//                                                 position: 'insideLeft',
//                                                 style: { textAnchor: 'middle', fill: '#fff' }
//                                             }} 
//                                         />
//                                         <Tooltip content={<CustomTooltip />} />
//                                         <Line type="monotone" dataKey="run_time" stroke="#059b9a" strokeWidth={2} dot={false} />
//                                     </ComposedChart>
//                                 </ResponsiveContainer>
//                                 <div className="mt-2 text-center text-gray-400">
//                                     <p>Total Time Taken: {formatTime(totalMetrics.totalRuntime)}</p>
//                                 </div>
//                             </div>

//                             {/* Human Hours Saved */}
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-lg font-semibold mb-4">Human Hours Saved</h2>
//                                 <ResponsiveContainer width="100%" height={300}>
//                                     <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
//                                         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//                                         <XAxis 
//                                             dataKey={
//                                                 selectedDateFilter === "This Week" 
//                                                     ? "day" 
//                                                     : selectedDateFilter === "This Month"
//                                                         ? "week"
//                                                         : "created"
//                                             } 
//                                             tickFormatter={
//                                                 selectedDateFilter === "Today" || selectedDateFilter === "Yesterday" 
//                                                     ? formatHourlyXAxis 
//                                                     : selectedDateFilter === "This Week" || selectedDateFilter === "This Month"
//                                                         ? (val) => val
//                                                         : (val) => formatXAxis(val, selectedDateFilter)
//                                             } 
//                                         />
//                                         <YAxis 
//                                             label={{ 
//                                                 value: 'Hours Saved', 
//                                                 angle: -90, 
//                                                 position: 'insideLeft',
//                                                 style: { textAnchor: 'middle', fill: '#fff' }
//                                             }} 
//                                         />
//                                         <Tooltip content={<HoursTooltip />} />
//                                         <Line type="monotone" dataKey="human_hours_saved" stroke="#FFAA00" strokeWidth={2} dot={false} />
//                                     </ComposedChart>
//                                 </ResponsiveContainer>
//                                 <div className="mt-2 text-center text-gray-400">
//                                     <p>Time Saved: {formatTime(totalMetrics.totalTimeSaved)}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// "use client";


// import { useEffect, useState } from "react";
// import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, ComposedChart } from "recharts";
// import pb from "@/lib/pocketbase";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"


// interface LogData {
//     filename: string;
//     uuid: string;
//     rows_count: number;
//     run_time: number;
//     human_hours_saved: number;
//     partner_name: string;
//     created: string;
// }

// const formatXAxis = (created: string | number, filter: string) => {
//     const date = new Date(created);
//     if (isNaN(date.getTime())) return "";

//     if (filter === "Today" || filter === "Yesterday") {
//         const hour = date.getHours();
//         return hour % 2 === 0 ? `${hour}` : "";
//     } else if (filter === "This Week") {
//         return date.toLocaleDateString("en-US", { weekday: "short" });
//     } else if (filter === "This Month") {
//         return date.getDate() % 5 === 0 ? String(date.getDate()) : "";
//     }
//     return "";
// };

// const getOrdinalSuffix = (num: number) => {
//     const j = num % 10;
//     const k = num % 100;
//     if (j === 1 && k !== 11) {
//         return `${num}st`;
//     }
//     if (j === 2 && k !== 12) {
//         return `${num}nd`;
//     }
//     if (j === 3 && k !== 13) {
//         return `${num}rd`;
//     }
//     return `${num}th`;
// };

// const manualTaskCompletionTimeInSeconds = 150;

// const calculateHumanHoursSaved = (totalTasks: number, totalRunTime: number) => {
//     const timeSavedInSeconds = (totalTasks * manualTaskCompletionTimeInSeconds) - totalRunTime;
//     return timeSavedInSeconds / 3600;
// };

// const generateHourlyData = (logs: LogData[], date: Date) => {
//     const hourlyData: { [hour: number]: { run_time: number, human_hours_saved: number, count: number, total_tasks: number } } = {};

//     for (let hour = 0; hour < 24; hour++) {
//         hourlyData[hour] = { run_time: 0, human_hours_saved: 0, count: 0, total_tasks: 0 };
//     }

//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime())) {
//             // Check if log is from today
//             const today = new Date(date);
//             today.setHours(0, 0, 0, 0);
//             const tomorrow = new Date(today);
//             tomorrow.setDate(tomorrow.getDate() + 1);

//             if (logDate >= today && logDate < tomorrow) {
//                 const hour = logDate.getHours();
//                 hourlyData[hour].run_time += log.run_time;
//                 hourlyData[hour].total_tasks += log.rows_count;
//                 hourlyData[hour].count += 1;
//             }
//         }
//     });

//     // Convert to array and calculate averages and human hours saved
//     return Array.from({ length: 24 }, (_, hour) => {
//         const hourData = hourlyData[hour];
//         const logCount = hourData.count || 1; // Avoid division by zero

//         // Calculate human hours saved using the formula
//         const totalRunTime = hourData.run_time;
//         const totalTasks = hourData.total_tasks;
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);

//         return {
//             created: new Date(date).setHours(hour, 0, 0, 0),
//             run_time: hourData.count ? hourData.run_time / logCount : 0,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             hour: `${hour}`
//         };
//     });
// };

// // Generate weekly data with all 7 days visible
// const generateWeeklyData = (logs: LogData[]) => {
//     const weekData = [];
//     const now = new Date();
//     const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

//     // Create data for all 7 days of the week
//     for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(date.getDate() - currentDay + i); // Start from the beginning of the week (Sunday)
//         date.setHours(0, 0, 0, 0);

//         const nextDay = new Date(date);
//         nextDay.setDate(nextDay.getDate() + 1);

//         // Filter logs for this day
//         const dayLogs = logs.filter(log => {
//             const logDate = new Date(log.created);
//             return logDate >= date && logDate < nextDay;
//         });

//         // Calculate aggregates
//         const totalRunTime = dayLogs.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = dayLogs.reduce((sum, log) => sum + log.rows_count, 0);
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);

//         // Calculate averages for runtime
//         const avgRunTime = dayLogs.length ? totalRunTime / dayLogs.length : 0;

//         weekData.push({
//             created: date.toISOString(),
//             run_time: avgRunTime,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             day: date.toLocaleDateString("en-US", { weekday: "short" })
//         });
//     }

//     return weekData;
// };

// // Generate monthly data grouped by weeks
// const generateMonthlyData = (logs: LogData[]) => {
//     const monthData = [];
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();


//     const lastDayOfMonth = new Date(year, month + 1, 0);
//     const daysInMonth = lastDayOfMonth.getDate();

//     // Divide the month into weeks (usually 4-5 weeks)
//     const weeksInMonth = Math.ceil(daysInMonth / 7);

//     for (let weekNum = 0; weekNum < weeksInMonth; weekNum++) {
//         // Calculate the start and end dates for this week
//         const weekStartDay = weekNum * 7 + 1;
//         const weekStartDate = new Date(year, month, weekStartDay);

//         const weekEndDay = Math.min((weekNum + 1) * 7, daysInMonth);
//         const weekEndDate = new Date(year, month, weekEndDay + 1); // +1 to include the entire last day

//         // Skip future weeks
//         if (weekStartDate > now) continue;

//         // Filter logs for this week
//         const weekLogs = logs.filter(log => {
//             const logDate = new Date(log.created);
//             return logDate >= weekStartDate && logDate < weekEndDate;
//         });

//         // Calculate aggregates
//         const totalRunTime = weekLogs.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = weekLogs.reduce((sum, log) => sum + log.rows_count, 0);
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);

//         // Calculate averages for runtime
//         const avgRunTime = weekLogs.length ? totalRunTime / weekLogs.length : 0;

//         // Add the week data
//         monthData.push({
//             created: weekStartDate.toISOString(),
//             run_time: avgRunTime,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             week: `${getOrdinalSuffix(weekNum + 1)} week`,
//             weekNum: weekNum + 1
//         });
//     }

//     return monthData;
// };

// // const CustomTooltip = ({ active, payload }: any) => {
// //     if (active && payload && payload.length) {
// //         const data = payload[0].payload;
// //         return (
// //             <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
// //                 <p className="font-semibold">{data.day || data.week || new Date(data.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
// //                 <p>Average Runtime: {payload[0].value.toFixed(2)} seconds</p>
// //                 <p className="text-gray-400">Total Runtime: {data.total_runtime ? data.total_runtime.toFixed(2) : 0} seconds</p>
// //                 <p className="text-gray-400">Total Tasks: {data.total_tasks || 0}</p>
// //             </div>
// //         );
// //     }
// //     return null;
// // };

// // const HoursTooltip = ({ active, payload }: any) => {
// //     if (active && payload && payload.length) {
// //         const data = payload[0].payload;
// //         return (
// //             <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
// //                 <p className="font-semibold">{data.day || data.week || new Date(data.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
// //                 <p>Hours Saved: {payload[0].value.toFixed(2)} hours</p>
// //                 <p className="text-gray-400">Total Time: {(data.total_tasks * manualTaskCompletionTimeInSeconds / 3600).toFixed(2)} hours</p>
// //                 <p className="text-gray-400">Time Saved: {((data.total_tasks * manualTaskCompletionTimeInSeconds - data.total_runtime) / 3600).toFixed(2)} hours</p>
// //                 <p className="text-gray-400">Total Tasks: {data.total_tasks || 0}</p>
// //             </div>
// //         );
// //     }
// //     return null;
// // };

// export default function XpoDashboard() {
//     const [logs, setLogs] = useState<LogData[]>([]);
//     const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);
//     const [hourlyData, setHourlyData] = useState<any[]>([]);
//     const [weeklyData, setWeeklyData] = useState<any[]>(([]));
//     const [monthlyData, setMonthlyData] = useState<any[]>([]);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activePage, setActivePage] = useState("XPO Services Dashboard");
//     const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
//     const [selectedProcess, setSelectedProcess] = useState("All");
//     const [totalMetrics, setTotalMetrics] = useState({
//         totalRuntime: 0,
//         totalTasks: 0,
//         totalTimeSaved: 0
//     });

//     useEffect(() => {
//         async function fetchLogs() {
//             try {
//                 const data = await pb.collection("xpo_logs").getFullList<LogData>();
//                 setLogs(data);
//                 setFilteredLogs(data);
//             } catch (error) {
//                 console.error("Error fetching logs:", error);
//             }
//         }
//         fetchLogs();
//     }, []);

//     useEffect(() => {
//         let filteredData = logs;
//         const now = new Date();
//         const todayStart = new Date(now.setHours(0, 0, 0, 0));
//         const yesterdayStart = new Date(todayStart);
//         yesterdayStart.setDate(todayStart.getDate() - 1);

//         const weekStart = new Date();
//         weekStart.setDate(now.getDate() - now.getDay());

//         const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

//         filteredData = filteredData.filter((log) => {
//             const logDate = new Date(log.created);
//             if (isNaN(logDate.getTime())) return false;

//             switch (selectedDateFilter) {
//                 case "Today":
//                     return logDate >= todayStart;
//                 case "Yesterday":
//                     return logDate >= yesterdayStart && logDate < todayStart;
//                 case "This Week":
//                     return logDate >= weekStart;
//                 case "This Month":
//                     return logDate >= monthStart;
//                 default:
//                     return true;
//             }
//         });

//         if (selectedProcess !== "All") {
//             filteredData = filteredData.filter((log) => log.partner_name === selectedProcess);
//         }

//         setFilteredLogs(filteredData);

//         // Calculate total metrics for the selected time period
//         const totalRuntime = filteredData.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = filteredData.reduce((sum, log) => sum + log.rows_count, 0);
//         const totalTimeSaved = (totalTasks * manualTaskCompletionTimeInSeconds) - totalRuntime;

//         setTotalMetrics({
//             totalRuntime,
//             totalTasks,
//             totalTimeSaved
//         });

//         // Generate specific data based on the filter
//         if (selectedDateFilter === "Today") {
//             setHourlyData(generateHourlyData(filteredData, new Date()));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "Yesterday") {
//             const yesterday = new Date();
//             yesterday.setDate(yesterday.getDate() - 1);
//             setHourlyData(generateHourlyData(filteredData, yesterday));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Week") {
//             setWeeklyData(generateWeeklyData(filteredData));
//             setHourlyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Month") {
//             setMonthlyData(generateMonthlyData(filteredData));
//             setHourlyData([]);
//             setWeeklyData([]);
//         } else {
//             setHourlyData([]);
//             setWeeklyData([]);
//             setMonthlyData([]);
//         }
//     }, [selectedDateFilter, selectedProcess, logs]);

//     const chartData =
//         selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
//             ? hourlyData
//             : selectedDateFilter === "This Week"
//                 ? weeklyData
//                 : selectedDateFilter === "This Month"
//                     ? monthlyData
//                     : filteredLogs;

//     const formatHourlyXAxis = (timestamp: number) => {
//         if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
//             const date = new Date(timestamp);
//             const hour = date.getHours();
//             return hour % 2 === 0 ? `${hour}` : "";
//         }
//         return formatXAxis(timestamp, selectedDateFilter);
//     };

//     // Format time in hours, minutes, seconds
//     const formatTime = (seconds: number) => {
//         const hours = Math.floor(seconds / 3600);
//         const minutes = Math.floor((seconds % 3600) / 60);
//         const remainingSeconds = Math.floor(seconds % 60);

//         if (hours > 0) {
//             return `${hours}h ${minutes}m ${remainingSeconds}s`;
//         } else if (minutes > 0) {
//             return `${minutes}m ${remainingSeconds}s`;
//         } else {
//             return `${remainingSeconds}s`;
//         }
//     };

//     return (
//         <div className="relative flex h-screen text-white overflow-hidden">
//             <div className="w-16 flex flex-col justify-start items-center bg-al-950 h-full fixed top-16 left-0 z-40">
//                 <button
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     className="mt-6 focus:outline-none g-al-950 p-2 rounded-md"
//                 >
//                     {menuOpen ? (
//                         <div className="text-white text-2xl">✖</div>
//                     ) : (
//                         <div className="flex flex-col space-y-1">
//                             <div className="w-6 h-1 bg-white" />
//                             <div className="w-6 h-1 bg-white" />
//                             <div className="w-6 h-1 bg-white" />
//                         </div>
//                     )}
//                 </button>
//             </div>

//             <div
//                 className={`fixed top-16 left-16 h-full w-64 bg-al-950 shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
//                     }`}
//             >
//                 <ul className="space-y-4 text-lg">
//                     <li className={`cursor-pointer ${activePage === "XPO Services Dashboard" ? "text-[]" : "text-white"}`}
//                         onClick={() => { setActivePage("XPO Services Dashboard"); setMenuOpen(false); }}>
//                         XPO Services Dashboard
//                     </li>
//                     <hr className="border-primary" />

//                     <li className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-[]" : "text-white"}`}
//                         onClick={() => { setActivePage("XPO ServiceHub"); setMenuOpen(false); }}>
//                         XPO ServiceHub
//                     </li>
//                     <hr className="border-primary" />

//                     <li className={`cursor-pointer ${activePage === "Profile" ? "text-[]" : "text-white"}`}
//                         onClick={() => { setActivePage("Profile"); setMenuOpen(false); }}>
//                         Profile
//                     </li>
//                 </ul>
//             </div>

//             {/* Main Dashboard */}
//             <div className="flex-1 p-6 ml-16">
//                 <h1 className="text-xl font-bold mb-4">{activePage}</h1>

//                 {activePage === "XPO Services Dashboard" && (
//                     <div>
//                         {/* Filters */}
//                         <div className="flex flex-wrap gap-4 mb-6">
//                             {/* Date Filter */}
//                             <div className="flex flex-col">
//                                 <label className="text-sm text-gray-400 mb-1">Date Range</label>
//                                 <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
//                                     <SelectTrigger className="text-white">
//                                         <SelectValue placeholder="Select Date Range" />
//                                     </SelectTrigger>
//                                     <SelectContent className="text-white">
//                                         <SelectItem value="Today">Today</SelectItem>
//                                         <SelectItem value="Yesterday">Yesterday</SelectItem>
//                                         <SelectItem value="This Week">This Week</SelectItem>
//                                         <SelectItem value="This Month">This Month</SelectItem>
//                                         <SelectItem value="All">All Time</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>

//                             {/* Processes (Partner Name) Filter */}
//                             <div className="flex flex-col">
//                                 <label className="text-sm text-gray-400 mb-1">Processes</label>
//                                 <Select value={selectedProcess} onValueChange={setSelectedProcess}>
//                                     <SelectTrigger className="text-white">
//                                         <SelectValue placeholder="Select Process" />
//                                     </SelectTrigger>
//                                     <SelectContent className="text-white">
//                                         <SelectItem value="All">All</SelectItem>
//                                         {Array.from(new Set(logs.map((log) => log.partner_name))).map((partner) => (
//                                             <SelectItem key={partner} value={partner || "unknown"}>{partner}</SelectItem> //Added default value in case the log.partner_name is empty
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>

//                         {/* Summary Cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-md font-semibold text-gray-400">Total Tasks</h3>
//                                 <p className="text-2xl font-bold">{totalMetrics.totalTasks}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-md font-semibold text-gray-400">Total Runtime</h3>
//                                 <p className="text-2xl font-bold">{formatTime(totalMetrics.totalRuntime)}</p>
//                             </div>
//                             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-md font-semibold text-gray-400">Total Time Saved</h3>
//                                 <p className="text-2xl font-bold">{formatTime(totalMetrics.totalTimeSaved)}</p>
//                             </div>
//                         </div>

//                         {/* Graphs in One Row */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             {/* Process Runtime */}
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-lg font-semibold mb-4">Process Runtime</h2>
//                                 <ResponsiveContainer width="100%" height={300}>
//                                     <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
//                                         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//                                         <XAxis
//                                             dataKey={
//                                                 selectedDateFilter === "This Week"
//                                                     ? "day"
//                                                     : selectedDateFilter === "This Month"
//                                                         ? "week"
//                                                         : "created"
//                                             }
//                                             tickFormatter={
//                                                 selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
//                                                     ? formatHourlyXAxis
//                                                     : selectedDateFilter === "This Week" || selectedDateFilter === "This Month"
//                                                         ? (val) => val
//                                                         : (val) => formatXAxis(val, selectedDateFilter)
//                                             }
//                                         />
//                                         <YAxis
//                                             label={{
//                                                 value: 'Runtime (seconds)',
//                                                 angle: -90,
//                                                 position: 'insideLeft',
//                                                 style: { textAnchor: 'middle', fill: '#fff' }
//                                             }}
//                                         />
//                                         <Line type="monotone" dataKey="run_time" stroke="#059b9a" strokeWidth={2} dot={false} />
//                                     </ComposedChart>
//                                 </ResponsiveContainer>
//                                 <div className="mt-2 text-center text-gray-400">
//                                     <p>Total Time Taken: {formatTime(totalMetrics.totalRuntime)}</p>
//                                 </div>
//                             </div>

//                             {/* Human Hours Saved */}
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-lg font-semibold mb-4">Human Hours Saved</h2>
//                                 <ResponsiveContainer width="100%" height={300}>
//                                     <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
//                                         <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
//                                         <XAxis
//                                             dataKey={
//                                                 selectedDateFilter === "This Week"
//                                                     ? "day"
//                                                     : selectedDateFilter === "This Month"
//                                                         ? "week"
//                                                         : "created"
//                                             }
//                                             tickFormatter={
//                                                 selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
//                                                     ? formatHourlyXAxis
//                                                     : selectedDateFilter === "This Week" || selectedDateFilter === "This Month"
//                                                         ? (val) => val
//                                                         : (val) => formatXAxis(val, selectedDateFilter)
//                                             }
//                                         />
//                                         <YAxis
//                                             label={{
//                                                 value: 'Hours Saved',
//                                                 angle: -90,
//                                                 position: 'insideLeft',
//                                                 style: { textAnchor: 'middle', fill: '#fff' }
//                                             }}
//                                         />
//                                         <Line type="monotone" dataKey="human_hours_saved" stroke="#FFAA00" strokeWidth={2} dot={false} />
//                                     </ComposedChart>
//                                 </ResponsiveContainer>
//                                 <div className="mt-2 text-center text-gray-400">
//                                     <p>Time Saved: {formatTime(totalMetrics.totalTimeSaved)}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, ComposedChart } from "recharts";
import pb from "@/lib/pocketbase";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Explicitly define the type for log data
interface LogData {
    filename: string;
    uuid: string;
    rows_count: number;
    run_time: number;
    human_hours_saved: number;
    partner_name: string;
    created: string;
}

// Type for total metrics
interface TotalMetrics {
    totalRuntime: number;
    totalTasks: number;
    totalTimeSaved: number;
}

interface HourlyDataPoint {
    created: number;
    run_time: number;
    human_hours_saved: number;
    total_tasks: number;
    total_runtime: number;
    hour: string;
}

interface WeeklyDataPoint {
    created: string;
    run_time: number;
    human_hours_saved: number;
    total_tasks: number;
    total_runtime: number;
    day: string;
}

interface MonthlyDataPoint {
    created: string;
    run_time: number;
    human_hours_saved: number;
    total_tasks: number;
    total_runtime: number;
    week: string;
    weekNum: number;
}
const formatXAxis = (created: string | number, filter: string) => {
    const date = new Date(created);
    if (isNaN(date.getTime())) return "";

    if (filter === "Today" || filter === "Yesterday") {
        const hour = date.getHours();
        return hour % 2 === 0 ? `${hour}` : "";
    } else if (filter === "This Week") {
        return date.toLocaleDateString("en-US", { weekday: "short" });
    } else if (filter === "This Month") {
        return date.getDate() % 5 === 0 ? String(date.getDate()) : "";
    }
    return "";
};

const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) {
        return `${num}st`;
    }
    if (j === 2 && k !== 12) {
        return `${num}nd`;
    }
    if (j === 3 && k !== 13) {
        return `${num}rd`;
    }
    return `${num}th`;
};

const manualTaskCompletionTimeInSeconds = 150;

const calculateHumanHoursSaved = (totalTasks: number, totalRunTime: number) => {
    const timeSavedInSeconds = (totalTasks * manualTaskCompletionTimeInSeconds) - totalRunTime;
    return timeSavedInSeconds / 3600;
};

const generateHourlyData = (logs: LogData[], date: Date) => {
    const hourlyData: { [hour: number]: { run_time: number, human_hours_saved: number, count: number, total_tasks: number } } = {};

    for (let hour = 0; hour < 24; hour++) {
        hourlyData[hour] = { run_time: 0, human_hours_saved: 0, count: 0, total_tasks: 0 };
    }

    logs.forEach(log => {
        const logDate = new Date(log.created);
        if (!isNaN(logDate.getTime())) {
            const today = new Date(date);
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            if (logDate >= today && logDate < tomorrow) {
                const hour = logDate.getHours();
                hourlyData[hour].run_time += log.run_time;
                hourlyData[hour].total_tasks += log.rows_count;
                hourlyData[hour].count += 1;
            }
        }
    });

    return Array.from({ length: 24 }, (_, hour) => {
        const hourData = hourlyData[hour];
        const logCount = hourData.count || 1;

        const totalRunTime = hourData.run_time;
        const totalTasks = hourData.total_tasks;
        const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);

        return {
            created: new Date(date).setHours(hour, 0, 0, 0),
            run_time: hourData.count ? hourData.run_time / logCount : 0,
            human_hours_saved: humanHoursSaved,
            total_tasks: totalTasks,
            total_runtime: totalRunTime,
            hour: `${hour}`
        };
    });
};

const generateWeeklyData = (logs: LogData[]) => {
    const weekData = [];
    const now = new Date();
    const currentDay = now.getDay();

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - currentDay + i);
        date.setHours(0, 0, 0, 0);

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

        const dayLogs = logs.filter(log => {
            const logDate = new Date(log.created);
            return logDate >= date && logDate < nextDay;
        });

        const totalRunTime = dayLogs.reduce((sum, log) => sum + log.run_time, 0);
        const totalTasks = dayLogs.reduce((sum, log) => sum + log.rows_count, 0);
        const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
        const avgRunTime = dayLogs.length ? totalRunTime / dayLogs.length : 0;

        weekData.push({
            created: date.toISOString(),
            run_time: avgRunTime,
            human_hours_saved: humanHoursSaved,
            total_tasks: totalTasks,
            total_runtime: totalRunTime,
            day: date.toLocaleDateString("en-US", { weekday: "short" })
        });
    }

    return weekData;
};

const generateMonthlyData = (logs: LogData[]) => {
    const monthData = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const weeksInMonth = Math.ceil(daysInMonth / 7);

    for (let weekNum = 0; weekNum < weeksInMonth; weekNum++) {
        const weekStartDay = weekNum * 7 + 1;
        const weekStartDate = new Date(year, month, weekStartDay);

        const weekEndDay = Math.min((weekNum + 1) * 7, daysInMonth);
        const weekEndDate = new Date(year, month, weekEndDay + 1);

        if (weekStartDate > now) continue;

        const weekLogs = logs.filter(log => {
            const logDate = new Date(log.created);
            return logDate >= weekStartDate && logDate < weekEndDate;
        });

        const totalRunTime = weekLogs.reduce((sum, log) => sum + log.run_time, 0);
        const totalTasks = weekLogs.reduce((sum, log) => sum + log.rows_count, 0);
        const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
        const avgRunTime = weekLogs.length ? totalRunTime / weekLogs.length : 0;

        monthData.push({
            created: weekStartDate.toISOString(),
            run_time: avgRunTime,
            human_hours_saved: humanHoursSaved,
            total_tasks: totalTasks,
            total_runtime: totalRunTime,
            week: `${getOrdinalSuffix(weekNum + 1)} week`,
            weekNum: weekNum + 1
        });
    }

    return monthData;
};

export default function XpoDashboard() {
    const [logs, setLogs] = useState<LogData[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);
    // const [hourlyData, setHourlyData] = useState<any[]>([]);
    // const [weeklyData, setWeeklyData] = useState<any[]>([]);
    // const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([]);
const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>([]);
const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState("XPO Services Dashboard");
    const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
    const [selectedProcess, setSelectedProcess] = useState("All");
    const [totalMetrics, setTotalMetrics] = useState<TotalMetrics>({
        totalRuntime: 0,
        totalTasks: 0,
        totalTimeSaved: 0
    });

    useEffect(() => {
        async function fetchLogs() {
            try {
                const data = await pb.collection("xpo_logs").getFullList<LogData>();
                setLogs(data);
                setFilteredLogs(data);
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
        }
        fetchLogs();
    }, []);

    useEffect(() => {
        let filteredData = logs;
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const yesterdayStart = new Date(todayStart);
        yesterdayStart.setDate(todayStart.getDate() - 1);

        const weekStart = new Date();
        weekStart.setDate(now.getDate() - now.getDay());

        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        filteredData = filteredData.filter((log) => {
            const logDate = new Date(log.created);
            if (isNaN(logDate.getTime())) return false;

            switch (selectedDateFilter) {
                case "Today":
                    return logDate >= todayStart;
                case "Yesterday":
                    return logDate >= yesterdayStart && logDate < todayStart;
                case "This Week":
                    return logDate >= weekStart;
                case "This Month":
                    return logDate >= monthStart;
                default:
                    return true;
            }
        });

        if (selectedProcess !== "All") {
            filteredData = filteredData.filter((log) => log.partner_name === selectedProcess);
        }

        setFilteredLogs(filteredData);

        const totalRuntime = filteredData.reduce((sum, log) => sum + log.run_time, 0);
        const totalTasks = filteredData.reduce((sum, log) => sum + log.rows_count, 0);
        const totalTimeSaved = (totalTasks * manualTaskCompletionTimeInSeconds) - totalRuntime;

        setTotalMetrics({
            totalRuntime,
            totalTasks,
            totalTimeSaved
        });

        if (selectedDateFilter === "Today") {
            setHourlyData(generateHourlyData(filteredData, new Date()));
            setWeeklyData([]);
            setMonthlyData([]);
        } else if (selectedDateFilter === "Yesterday") {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            setHourlyData(generateHourlyData(filteredData, yesterday));
            setWeeklyData([]);
            setMonthlyData([]);
        } else if (selectedDateFilter === "This Week") {
            setWeeklyData(generateWeeklyData(filteredData));
            setHourlyData([]);
            setMonthlyData([]);
        } else if (selectedDateFilter === "This Month") {
            setMonthlyData(generateMonthlyData(filteredData));
            setHourlyData([]);
            setWeeklyData([]);
        } else {
            setHourlyData([]);
            setWeeklyData([]);
            setMonthlyData([]);
        }
    }, [selectedDateFilter, selectedProcess, logs]);

    // Define chart data based on selected filter
    const chartData = 
        selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
            ? hourlyData
            : selectedDateFilter === "This Week"
                ? weeklyData
                : selectedDateFilter === "This Month"
                    ? monthlyData
                    : filteredLogs;

    const formatHourlyXAxis = (timestamp: number) => {
        if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
            const date = new Date(timestamp);
            const hour = date.getHours();
            return hour % 2 === 0 ? `${hour}` : "";
        }
        return formatXAxis(timestamp, selectedDateFilter);
    };

    // Format time in hours, minutes, seconds
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    };

    return (
        <div className="relative flex h-screen text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-16 flex flex-col justify-start items-center bg-al-950 h-full fixed top-16 left-0 z-40">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mt-6 focus:outline-none g-al-950 p-2 rounded-md"
                >
                    {menuOpen ? (
                        <div className="text-white text-2xl">✖</div>
                    ) : (
                        <div className="flex flex-col space-y-1">
                            <div className="w-6 h-1 bg-white" />
                            <div className="w-6 h-1 bg-white" />
                            <div className="w-6 h-1 bg-white" />
                        </div>
                    )}
                </button>
            </div>

            {/* Sidebar Menu */}
            <div
                className={`fixed top-16 left-16 h-full w-64 bg-al-950 shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <ul className="space-y-4 text-lg">
                    <li 
                        className={`cursor-pointer ${activePage === "XPO Services Dashboard" ? "text-blue-500" : "text-white"}`}
                        onClick={() => { 
                            setActivePage("XPO Services Dashboard"); 
                            setMenuOpen(false); 
                        }}
                    >
                        XPO Services Dashboard
                    </li>
                    <hr className="border-primary" />

                    <li 
                        className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-blue-500" : "text-white"}`}
                        onClick={() => { 
                            setActivePage("XPO ServiceHub"); 
                            setMenuOpen(false); 
                        }}
                    >
                        XPO ServiceHub
                    </li>
                    <hr className="border-primary" />

                    <li 
                        className={`cursor-pointer ${activePage === "Profile" ? "text-blue-500" : "text-white"}`}
                        onClick={() => { 
                            setActivePage("Profile"); 
                            setMenuOpen(false); 
                        }}
                    >
                        Profile
                    </li>
                </ul>
            </div>

            {/* Main Dashboard */}
            <div className="flex-1 p-6 ml-16">
                <h1 className="text-xl font-bold mb-4">{activePage}</h1>

                {activePage === "XPO Services Dashboard" && (
                    <div>
                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            {/* Date Filter */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Date Range</label>
                                <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
                                    <SelectTrigger className="text-white">
                                        <SelectValue placeholder="Select Date Range" />
                                    </SelectTrigger>
                                    <SelectContent className="text-white">
                                        <SelectItem value="Today">Today</SelectItem>
                                        <SelectItem value="Yesterday">Yesterday</SelectItem>
                                        <SelectItem value="This Week">This Week</SelectItem>
                                        <SelectItem value="This Month">This Month</SelectItem>
                                        <SelectItem value="All">All Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Processes (Partner Name) Filter */}
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Processes</label>
                                <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                                    <SelectTrigger className="text-white">
                                        <SelectValue placeholder="Select Process" />
                                    </SelectTrigger>
                                    <SelectContent className="text-white">
                                        <SelectItem value="All">All</SelectItem>
                                        {Array.from(new Set(logs.map((log) => log.partner_name)))
                                            .filter(partner => partner !== '')
                                            .map((partner) => (
                                                <SelectItem key={partner} value={partner}>
                                                    {partner || "Unknown"}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                <h3 className="text-md font-semibold text-gray-400">Total Tasks</h3>
                                <p className="text-2xl font-bold">{totalMetrics.totalTasks}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                <h3 className="text-md font-semibold text-gray-400">Total Runtime</h3>
                                <p className="text-2xl font-bold">{formatTime(totalMetrics.totalRuntime)}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                <h3 className="text-md font-semibold text-gray-400">Total Time Saved</h3>
                                <p className="text-2xl font-bold">{formatTime(totalMetrics.totalTimeSaved)}</p>
                            </div>
                        </div>

                        {/* Graphs in One Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Process Runtime */}
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-semibold mb-4">Process Runtime</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                        <XAxis
                                            dataKey={
                                                selectedDateFilter === "This Week"
                                                    ? "day"
                                                    : selectedDateFilter === "This Month"
                                                        ? "week"
                                                        : "created"
                                            }
                                            tickFormatter={
                                                selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
                                                    ? formatHourlyXAxis
                                                    : selectedDateFilter === "This Week" || selectedDateFilter === "This Month"
                                                        ? (val) => val
                                                        : (val) => formatXAxis(val, selectedDateFilter)
                                            }
                                        />
                                        <YAxis
                                            label={{
                                                value: 'Runtime (seconds)',
                                                angle: -90,
                                                position: 'insideLeft',
                                                style: { textAnchor: 'middle', fill: '#fff' }
                                            }}
                                        />
                                        <Line type="monotone" dataKey="run_time" stroke="#059b9a" strokeWidth={2} dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                                <div className="mt-2 text-center text-gray-400">
                                    <p>Total Time Taken: {formatTime(totalMetrics.totalRuntime)}</p>
                                </div>
                            </div>

                            {/* Human Hours Saved */}
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-semibold mb-4">Human Hours Saved</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                        <XAxis
                                            dataKey={
                                                selectedDateFilter === "This Week"
                                                    ? "day"
                                                    : selectedDateFilter === "This Month"
                                                        ? "week"
                                                        : "created"
                                            }
                                            tickFormatter={
                                                selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
                                                    ? formatHourlyXAxis
                                                    : selectedDateFilter === "This Week" || selectedDateFilter === "This Month"
                                                        ? (val) => val
                                                        : (val) => formatXAxis(val, selectedDateFilter)
                                            }
                                        />
                                        <YAxis
                                            label={{
                                                value: 'Hours Saved',
                                                angle: -90,
                                                position: 'insideLeft',
                                                style: { textAnchor: 'middle', fill: '#fff' }
                                            }}
                                        />
                                        <Line type="monotone" dataKey="human_hours_saved" stroke="#FFAA00" strokeWidth={2} dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                                <div className="mt-2 text-center text-gray-400">
                                    <p>Time Saved: {formatTime(totalMetrics.totalTimeSaved)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}