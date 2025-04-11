

// export default XpoDashboard;

// "use client";

// import { useEffect, useState } from "react";
// import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, ComposedChart, Tooltip } from "recharts";
// import pb from "@/lib/pocketbase";
// import { Filters } from "./Filter";
// // import ExportXpoLogs from '@/components/ExportXpoLogs';

// interface XpoDashboardProps {
//     client: string;
// }

// interface LogData {
//     filename: string;
//     uuid: string;
//     rows_count: number;
//     run_time: number;
//     human_hours_saved: number;
//     partner_name: string;
//     created: string;
// }

// interface TotalMetrics {
//     totalRuntime: number;
//     totalTasks: number;
//     totalTimeSaved: number;
// }

// interface HourlyDataPoint {
//     created: number; // Keep as timestamp for internal use/sorting
//     run_time: number;
//     human_hours_saved: number;
//     total_tasks: number;
//     total_runtime: number;
//     hour: string; // Use for display if needed, separate from 'created'
// }

// interface WeeklyDataPoint {
//     created: string; // ISO string for internal use/sorting
//     run_time: number;
//     human_hours_saved: number;
//     total_tasks: number;
//     total_runtime: number;
//     day: string; // Use for display (XAxis dataKey)
// }

// interface MonthlyDataPoint {
//     created: string; // ISO string for internal use/sorting
//     run_time: number;
//     human_hours_saved: number;
//     total_tasks: number;
//     total_runtime: number;
//     week: string; // Use for display (XAxis dataKey)
//     weekNum: number;
// }

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
//     // Ensure runtime doesn't exceed theoretical manual time to avoid negative savings
//     const effectiveManualTime = Math.max(totalTasks * manualTaskCompletionTimeInSeconds, totalRunTime);
//     const timeSavedInSeconds = effectiveManualTime - totalRunTime;
//     return Math.max(0, timeSavedInSeconds / 3600); // Return hours, ensure non-negative
// };


// const formatTimeGeneral = (seconds: number) => {
//     if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '0s';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     if (hours > 0) {
//         return `${hours}h ${minutes}m ${remainingSeconds}s`;
//     } else if (minutes > 0) {
//         return `${minutes}m ${remainingSeconds}s`;
//     } else {
//         return `${remainingSeconds}s`;
//     }
// };

// const formatTooltipRuntime = (seconds: number | string | undefined | null): string => {
//     if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
//         return '0m0s';
//     }
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}m${remainingSeconds}s`;
// };

// const generateHourlyData = (logs: LogData[], date: Date) => {
//     const hourlyData: { [hour: number]: { run_time: number; count: number; total_tasks: number } } = {};

//     for (let hour = 0; hour < 24; hour++) {
//         hourlyData[hour] = { run_time: 0, count: 0, total_tasks: 0 };
//     }

//     const dayStart = new Date(date);
//     dayStart.setHours(0, 0, 0, 0);
//     const dayEnd = new Date(dayStart);
//     dayEnd.setDate(dayStart.getDate() + 1);

//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime()) && logDate >= dayStart && logDate < dayEnd) {
//             const hour = logDate.getHours();
//             if (hourlyData[hour]) {
//                 hourlyData[hour].run_time += log.run_time;
//                 hourlyData[hour].total_tasks += log.rows_count;
//                 hourlyData[hour].count += 1;
//             }
//         }
//     });

//     return Array.from({ length: 24 }, (_, hour) => {
//         const hourData = hourlyData[hour];
//         const logCount = hourData.count || 1;
//         const totalRunTimeForHour = hourData.run_time;
//         const totalTasksForHour = hourData.total_tasks;
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasksForHour, totalRunTimeForHour);
//         const baseTimestamp = new Date(date).setHours(hour, 0, 0, 0);

//         return {
//             created: baseTimestamp,
//             run_time: hourData.count ? totalRunTimeForHour / logCount : 0,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasksForHour,
//             total_runtime: totalRunTimeForHour,
//             hour: `${hour}`
//         };
//     });
// };


// const generateWeeklyData = (logs: LogData[]) => {
//     const weekDataMap: { [day: string]: { run_time: number; count: number; total_tasks: number; total_runtime: number; created: string} } = {};
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const now = new Date();
//     const todayStart = new Date(now.setHours(0, 0, 0, 0));
//     const currentDayOfWeek = todayStart.getDay();
//     const firstDayOfWeek = new Date(todayStart);
//     firstDayOfWeek.setDate(todayStart.getDate() - currentDayOfWeek);

//     for (let i = 0; i < 7; i++) {
//          const date = new Date(firstDayOfWeek);
//          date.setDate(firstDayOfWeek.getDate() + i);
//          const dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
//          weekDataMap[dayStr] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, created: date.toISOString() };
//     }


//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime()) && logDate >= firstDayOfWeek) {
//              const dayStr = logDate.toLocaleDateString("en-US", { weekday: "short" });
//              if (weekDataMap[dayStr]) {
//                  weekDataMap[dayStr].run_time += log.run_time;
//                  weekDataMap[dayStr].total_tasks += log.rows_count;
//                  weekDataMap[dayStr].total_runtime += log.run_time;
//                  weekDataMap[dayStr].count += 1;
//              }
//         }
//     });

//     return days.map(dayKey => {
//         const dayData = weekDataMap[dayKey];
//         const logCount = dayData.count || 1;
//         const totalTasks = dayData.total_tasks;
//         const totalRunTime = dayData.total_runtime;
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
//         const avgRunTime = dayData.count ? dayData.run_time / dayData.count : 0;

//         return {
//             created: dayData.created,
//             run_time: avgRunTime,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             day: dayKey
//         };
//     });
// };


// const generateMonthlyData = (logs: LogData[]) => {
//     const monthDataMap: { [weekKey: string]: { run_time: number; count: number; total_tasks: number; total_runtime: number; weekNum: number; created: string} } = {};
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();
//     const firstDayOfMonth = new Date(year, month, 1);
//     const lastDayOfMonth = new Date(year, month + 1, 0);

//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime()) && logDate >= firstDayOfMonth && logDate <= new Date(year, month + 1, 0)) {
//             const dayOfMonth = logDate.getDate();
//             const weekOfMonth = Math.ceil(dayOfMonth / 7);
//             const weekKey = `${getOrdinalSuffix(weekOfMonth)} week`;

//             if (!monthDataMap[weekKey]) {
//                  const weekStartDate = new Date(year, month, (weekOfMonth - 1) * 7 + 1);
//                  monthDataMap[weekKey] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, weekNum: weekOfMonth, created: weekStartDate.toISOString() };
//             }

//             monthDataMap[weekKey].run_time += log.run_time;
//             monthDataMap[weekKey].total_tasks += log.rows_count;
//             monthDataMap[weekKey].total_runtime += log.run_time;
//             monthDataMap[weekKey].count += 1;
//         }
//     });

//     const finalMonthData = [];
//     const totalWeeks = Math.ceil(lastDayOfMonth.getDate() / 7);
//     for (let i = 1; i <= totalWeeks; i++) {
//         const weekKey = `${getOrdinalSuffix(i)} week`;
//         if (monthDataMap[weekKey]) {
//             const weekData = monthDataMap[weekKey];
//             const logCount = weekData.count || 1;
//             const totalTasks = weekData.total_tasks;
//             const totalRunTime = weekData.total_runtime;
//             const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
//             const avgRunTime = weekData.count ? weekData.run_time / logCount : 0;

//              finalMonthData.push({
//                  created: weekData.created,
//                  run_time: avgRunTime,
//                  human_hours_saved: humanHoursSaved,
//                  total_tasks: totalTasks,
//                  total_runtime: totalRunTime,
//                  week: weekKey,
//                  weekNum: weekData.weekNum
//              });
//         } else {
//             const weekStartDate = new Date(year, month, (i - 1) * 7 + 1);
//              finalMonthData.push({
//                  created: weekStartDate.toISOString(),
//                  run_time: 0,
//                  human_hours_saved: 0,
//                  total_tasks: 0,
//                  total_runtime: 0,
//                  week: weekKey,
//                  weekNum: i
//              });
//         }
//     }


//     finalMonthData.sort((a, b) => a.weekNum - b.weekNum);
//     return finalMonthData.filter(d => new Date(d.created).getMonth() === month);
// };


// function XpoDashboard({ client }: XpoDashboardProps) {
//     const [logs, setLogs] = useState<LogData[]>([]);
//     const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);
//     const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([]);
//     const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>([]);
//     const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activePage, setActivePage] = useState("XPO Ops");
//     const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
//     const [selectedProcess, setSelectedProcess] = useState("All");
//     const [totalMetrics, setTotalMetrics] = useState<TotalMetrics>({
//         totalRuntime: 0,
//         totalTasks: 0,
//         totalTimeSaved: 0
//     });

//     const getHeadingText = () => {
//         if (activePage === "XPO Ops") {
//             return `Your ${client} Dashboard for Alphalake Services`;
//         } else if (activePage === "XPO ServiceHub") {
//             return "XPO ServiceHub";
//         } else if (activePage === "Profile") {
//             return "Profile";
//         } else {
//             return "Alphalake Services";
//         }
//     };

//     useEffect(() => {
//         if (client !== "XPO") return;

//         async function fetchLogs() {
//             try {
//                 const data = await pb.collection("xpo_logs").getFullList<LogData>({ sort: '-created' });
//                 setLogs(data);
//             } catch (error) {
//                 console.error("Error fetching logs:", error);
//             }
//         }
//         fetchLogs();
//     }, [client]);

//     useEffect(() => {
//         if (client !== "XPO") return;

//         let dataToFilter = logs;
//         const now = new Date();
//         const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
//         const yesterdayStart = new Date(todayStart);
//         yesterdayStart.setDate(todayStart.getDate() - 1);
//         const todayEnd = new Date(todayStart);
//         todayEnd.setDate(todayStart.getDate() + 1);

//         const currentDayOfWeek = todayStart.getDay();
//         const weekStart = new Date(todayStart);
//         weekStart.setDate(todayStart.getDate() - currentDayOfWeek);
//         const weekEnd = new Date(weekStart);
//         weekEnd.setDate(weekStart.getDate() + 7);


//         const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
//         const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

//         let currentlyFilteredData = dataToFilter.filter((log) => {
//             const logDate = new Date(log.created);
//             if (isNaN(logDate.getTime())) return false;

//             switch (selectedDateFilter) {
//                 case "Today":
//                     return logDate >= todayStart && logDate < todayEnd;
//                 case "Yesterday":
//                     return logDate >= yesterdayStart && logDate < todayStart;
//                 case "This Week":
//                     return logDate >= weekStart && logDate < weekEnd;
//                 case "This Month":
//                     return logDate >= monthStart && logDate < nextMonthStart;
//                 default:
//                     return true;
//             }
//         });

//         if (selectedProcess !== "All") {
//             currentlyFilteredData = currentlyFilteredData.filter((log) => log.partner_name === selectedProcess);
//         }

//         setFilteredLogs(currentlyFilteredData);

//         const totalRuntime = currentlyFilteredData.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = currentlyFilteredData.reduce((sum, log) => sum + log.rows_count, 0);
//         const totalTimeSavedInHours = calculateHumanHoursSaved(totalTasks, totalRuntime);
//         const totalTimeSaved = totalTimeSavedInHours * 3600;

//         setTotalMetrics({
//             totalRuntime,
//             totalTasks,
//             totalTimeSaved
//         });

//         if (selectedDateFilter === "Today") {
//             setHourlyData(generateHourlyData(currentlyFilteredData, new Date()));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "Yesterday") {
//             const yesterday = new Date();
//             yesterday.setDate(yesterday.getDate() - 1);
//             setHourlyData(generateHourlyData(currentlyFilteredData, yesterday));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Week") {
//             setWeeklyData(generateWeeklyData(currentlyFilteredData));
//             setHourlyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Month") {
//             setMonthlyData(generateMonthlyData(currentlyFilteredData));
//             setHourlyData([]);
//             setWeeklyData([]);
//         } else {
//              setHourlyData([]);
//              setWeeklyData([]);
//              setMonthlyData([]);
//         }
//     }, [client, selectedDateFilter, selectedProcess, logs]);

//     const chartData =
//         selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
//             ? hourlyData
//             : selectedDateFilter === "This Week"
//                 ? weeklyData
//                 : selectedDateFilter === "This Month"
//                     ? monthlyData
//                     : [];


//     const formatTimeForDisplay = formatTimeGeneral;

//      const xAxisDataKey =
//         selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
//             ? "created"
//             : selectedDateFilter === "This Week"
//                 ? "day"
//                 : selectedDateFilter === "This Month"
//                     ? "week"
//                     : "created";


//      const formatXAxisTick = (value: any) => {
//          if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
//              const date = new Date(value);
//              const hour = date.getHours();
//              return !isNaN(hour) && hour % 2 === 0 ? `${hour}` : "";
//          } else if (selectedDateFilter === "This Week" || selectedDateFilter === "This Month") {
//              return value;
//          }
//          return '';
//      };

//      const formatTooltipLabel = (label: any) => {
//          if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
//              const date = new Date(label);
//              if (isNaN(date.getTime())) return '';
//              const hour = date.getHours();
//              const nextHour = hour + 1;
//              return `Hour: ${hour}:00 - ${nextHour}:00`;
//          } else if (selectedDateFilter === "This Week") {
//              return `Day: ${label}`;
//          } else if (selectedDateFilter === "This Month") {
//               return `Week: ${label}`;
//          }
//          return '';
//      };


//     if (client !== "XPO") {
//         return <p className="p-6 text-red-500 font-bold">Unauthorized: This dashboard is only for XPO users.</p>;
//     }

//     return (
//         <div className="relative flex min-h-screen text-white overflow-hidden">
//              <div className="w-16 flex flex-col justify-start items-center bg-al-950 h-full fixed top-16 left-0 z-40">
//                  <button
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     className="mt-6 focus:outline-none bg-al-950 p-2 rounded-md"
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
//                 className={`fixed top-16 left-16 h-full w-64 bg-al-950 shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
//             >
//                  <ul className="space-y-4 text-lg">
//                     <li
//                         className={`cursor-pointer ${activePage === "XPO Ops" ? "text-primary" : "text-white"}`}
//                         onClick={() => {
//                             setActivePage("XPO Ops");
//                             setMenuOpen(false);
//                         }}
//                     >
//                         XPO Ops
//                     </li>
//                     <hr className="border-primary" />

//                     <li
//                         className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-primary" : "text-white"}`}
//                         onClick={() => {
//                             setActivePage("XPO ServiceHub");
//                             setMenuOpen(false);
//                         }}
//                     >
//                         XPO ServiceHub
//                     </li>
//                     <hr className="border-primary" />

//                     <li
//                         className={`cursor-pointer ${activePage === "Profile" ? "text-primary" : "text-white"}`}
//                         onClick={() => {
//                             setActivePage("Profile");
//                             setMenuOpen(false);
//                         }}
//                     >
//                         Profile
//                     </li>
//                 </ul>
//             </div>

//             <div className="flex-1 p-3 sm:p-4 md:p-6 ml-16">
//                 {activePage === "XPO Ops" && (
//                     <div>
//                         {/* <div className="p-4">
//                           <h1 className="text-xl font-semibold mb-4">Export XPO Logs</h1>
//                           <ExportXpoLogs />
//                         </div> */}

//                         <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">{getHeadingText()}</h1>

//                         <div className="flex flex-col sm:flex-row justify-end item-start sm:items-center mb-4">
//                             <div className="w-full sm:w-auto">
//                                 <Filters
//                                     selectedDateFilter={selectedDateFilter}
//                                     setSelectedDateFilter={setSelectedDateFilter}
//                                     selectedProcess={selectedProcess}
//                                     setSelectedProcess={setSelectedProcess}
//                                     logs={logs}
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
//                             <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-sm sm:text-md font-semibold text-gray-400">Total Tasks</h3>
//                                 <p className="text-xl sm:text-2xl font-bold">{totalMetrics.totalTasks}</p>
//                             </div>
//                             <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-sm sm:text-md font-semibold text-gray-400">Total Runtime</h3>
//                                 <p className="text-xl sm:text-2xl font-bold">{formatTimeForDisplay(totalMetrics.totalRuntime)}</p>
//                             </div>
//                             <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-sm sm:text-md font-semibold text-gray-400">Total Time Saved</h3>
//                                 <p className="text-xl sm:text-2xl font-bold">{formatTimeForDisplay(totalMetrics.totalTimeSaved)}</p>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
//                             <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Process Runtime</h2>
//                                 <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
//                                     <ResponsiveContainer width="100%" height="100%">
//                                         <ComposedChart data={chartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
//                                             <XAxis
//                                                 dataKey={xAxisDataKey}
//                                                 tickFormatter={formatXAxisTick}
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 interval={0}
//                                             />
//                                             <YAxis
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 // Removed tickFormatter here
//                                                 label={{
//                                                     value: 'Runtime (Minutes and seconds)', // Reverted label
//                                                     angle: -90,
//                                                     position: 'insideLeft',
//                                                     style: { textAnchor: 'middle', fill: '#fff', fontSize: '14px' },
//                                                 }}
//                                             />
//                                             <Tooltip
//                                                 contentStyle={{ backgroundColor: 'rgba(255, 255, 255)', border: 'none', borderRadius: '5px' }}
//                                                 itemStyle={{ color: '#059b9a' }}
//                                                 formatter={(value, name) => {
//                                                     if (name === 'run_time') {
//                                                         const formattedValue = formatTooltipRuntime(value as number);
//                                                         return [formattedValue, 'Avg Runtime'];
//                                                     }
//                                                     return [value, name];
//                                                 }}
//                                                 labelFormatter={formatTooltipLabel}
//                                             />
//                                             <Line
//                                                  type="monotone"
//                                                  dataKey="run_time"
//                                                  stroke="#059b9a"
//                                                  strokeWidth={2}
//                                                  dot={false}
//                                                  name="run_time"
//                                              />
//                                         </ComposedChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                                 <div className="mt-2 text-center text-sm sm:text-base">
//                                     <p>Total Time Taken: {formatTimeForDisplay(totalMetrics.totalRuntime)}</p>
//                                 </div>
//                             </div>

//                             <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Human Hours Saved</h2>
//                                 <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
//                                     <ResponsiveContainer width="100%" height="100%">
//                                         <ComposedChart data={chartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
//                                              <XAxis
//                                                 dataKey={xAxisDataKey}
//                                                 tickFormatter={formatXAxisTick}
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 interval={0}
//                                             />
//                                             <YAxis
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 tickFormatter={(value) => typeof value === 'number' ? value.toFixed(1) : value}
//                                                 label={{
//                                                     value: 'Human Time Saved',
//                                                     angle: -90,
//                                                     position: 'insideLeft',
//                                                     style: { textAnchor: 'middle', fill: '#fff', fontSize: '14px' },
//                                                 }}
//                                             />
//                                             <Tooltip
//                                                 contentStyle={{ backgroundColor: 'rgba(255, 255, 255)', border: 'none', borderRadius: '5px' }}
//                                                 itemStyle={{ color: '#0096FF' }}
//                                                 formatter={(value, name) => {
//                                                     if (name === 'human_hours_saved') {
//                                                         const numValue = typeof value === 'number' ? value : parseFloat(value as string);
//                                                         return [`${numValue.toFixed(2)} hrs`, 'Time Saved'];
//                                                     }
//                                                     return [value, name];
//                                                 }}
//                                                 labelFormatter={formatTooltipLabel}
//                                              />
//                                             <Line
//                                                 type="monotone"
//                                                 dataKey="human_hours_saved"
//                                                 stroke="#0096FF"
//                                                 strokeWidth={2}
//                                                 dot={false}
//                                                 name="human_hours_saved"
//                                             />
//                                         </ComposedChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                                 <div className="mt-2 text-center text-sm sm:text-base">
//                                     <p>Total Time Saved: {formatTimeForDisplay(totalMetrics.totalTimeSaved)}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                  {activePage === "XPO ServiceHub" && <div className="text-white">ServiceHub Content Placeholder</div>}
//                  {activePage === "Profile" && <div className="text-white">Profile Content Placeholder</div>}
//             </div>
//         </div>
//     );
// }

// export default XpoDashboard;

"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, ComposedChart, Tooltip } from "recharts";
import pb from "@/lib/pocketbase";
import { Filters } from "./Filter";

interface XpoDashboardProps {
    client: string;
}

interface LogData {
    filename: string;
    uuid: string;
    rows_count: number;
    run_time: number;
    human_hours_saved: number;
    partner_name: string;
    created: string;
}

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

interface AllTimeMonthlyDataPoint {
    monthKey: string;
    monthLabel: string;
    run_time: number;
    human_hours_saved: number;
    total_tasks: number;
    total_runtime: number;
}

const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return `${num}st`;
    if (j === 2 && k !== 12) return `${num}nd`;
    if (j === 3 && k !== 13) return `${num}rd`;
    return `${num}th`;
};

const manualTaskCompletionTimeInSeconds = 150;

const calculateHumanHoursSaved = (totalTasks: number, totalRunTime: number) => {
    const effectiveManualTime = Math.max(totalTasks * manualTaskCompletionTimeInSeconds, totalRunTime);
    const timeSavedInSeconds = effectiveManualTime - totalRunTime;
    return Math.max(0, timeSavedInSeconds / 3600);
};

const formatTimeGeneral = (seconds: number) => {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '0s';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
    if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
    return `${remainingSeconds}s`;
};

const formatTooltipRuntime = (seconds: number | string | undefined | null): string => {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '0m 0s';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
};

const generateHourlyData = (logs: LogData[], date: Date): HourlyDataPoint[] => {
    const hourlyData: { [hour: number]: { run_time: number; count: number; total_tasks: number; total_runtime: number } } = {};
    for (let hour = 0; hour < 24; hour++) {
        hourlyData[hour] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0 };
    }
    const dayStart = new Date(date); dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart); dayEnd.setDate(dayStart.getDate() + 1);

    logs.forEach(log => {
        const logDate = new Date(log.created);
        if (!isNaN(logDate.getTime()) && logDate >= dayStart && logDate < dayEnd) {
            const hour = logDate.getHours();
            if (hourlyData[hour]) {
                hourlyData[hour].run_time += log.run_time;
                hourlyData[hour].total_tasks += log.rows_count;
                hourlyData[hour].total_runtime += log.run_time;
                hourlyData[hour].count += 1;
            }
        }
    });

    return Array.from({ length: 24 }, (_, hour) => {
        const hourData = hourlyData[hour];
        const totalRunTimeForHour = hourData.total_runtime;
        const totalTasksForHour = hourData.total_tasks;
        const humanHoursSaved = calculateHumanHoursSaved(totalTasksForHour, totalRunTimeForHour);
        const baseTimestamp = new Date(date).setHours(hour, 0, 0, 0);
        const avgRunTime = hourData.count > 0 ? hourData.run_time / hourData.count : 0;
        return { created: baseTimestamp, run_time: avgRunTime, human_hours_saved: humanHoursSaved, total_tasks: totalTasksForHour, total_runtime: totalRunTimeForHour, hour: `${hour}` };
    });
};

const generateWeeklyData = (logs: LogData[], weekStartDate: Date): WeeklyDataPoint[] => {
    const weekDataMap: { [day: string]: { run_time: number; count: number; total_tasks: number; total_runtime: number; created: string } } = {};
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const firstDayOfWeek = new Date(weekStartDate); firstDayOfWeek.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek); date.setDate(firstDayOfWeek.getDate() + i);
        const dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
        weekDataMap[dayStr] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, created: date.toISOString() };
    }
    const weekEndDate = new Date(firstDayOfWeek); weekEndDate.setDate(firstDayOfWeek.getDate() + 7);

    logs.forEach(log => {
        const logDate = new Date(log.created);
        if (!isNaN(logDate.getTime()) && logDate >= firstDayOfWeek && logDate < weekEndDate) {
            const dayStr = logDate.toLocaleDateString("en-US", { weekday: "short" });
            if (weekDataMap[dayStr]) {
                weekDataMap[dayStr].run_time += log.run_time;
                weekDataMap[dayStr].total_tasks += log.rows_count;
                weekDataMap[dayStr].total_runtime += log.run_time;
                weekDataMap[dayStr].count += 1;
            }
        }
    });

    return days.map(dayKey => {
        const dayData = weekDataMap[dayKey];
        if (!dayData) {
             const dateIndex = days.indexOf(dayKey);
             const date = new Date(firstDayOfWeek); date.setDate(firstDayOfWeek.getDate() + dateIndex);
             return { created: date.toISOString(), run_time: 0, human_hours_saved: 0, total_tasks: 0, total_runtime: 0, day: dayKey };
        }
        const totalTasks = dayData.total_tasks;
        const totalRunTime = dayData.total_runtime;
        const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
        const avgRunTime = dayData.count > 0 ? dayData.run_time / dayData.count : 0;
        return { created: dayData.created, run_time: avgRunTime, human_hours_saved: humanHoursSaved, total_tasks: totalTasks, total_runtime: totalRunTime, day: dayKey };
    });
};

const generateMonthlyData = (logs: LogData[]): MonthlyDataPoint[] => {
    const monthDataMap: { [weekKey: string]: { run_time: number; count: number; total_tasks: number; total_runtime: number; weekNum: number; created: string } } = {};
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    logs.forEach(log => {
        const logDate = new Date(log.created);
        if (!isNaN(logDate.getTime()) && logDate >= firstDayOfMonth && logDate < new Date(year, month + 1, 1)) {
            const dayOfMonth = logDate.getDate();
            const weekOfMonth = Math.ceil(dayOfMonth / 7);
            const weekKey = `${getOrdinalSuffix(weekOfMonth)} week`;
            if (!monthDataMap[weekKey]) {
                const weekStartDate = new Date(year, month, (weekOfMonth - 1) * 7 + 1);
                monthDataMap[weekKey] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, weekNum: weekOfMonth, created: weekStartDate.toISOString() };
            }
            monthDataMap[weekKey].run_time += log.run_time;
            monthDataMap[weekKey].total_tasks += log.rows_count;
            monthDataMap[weekKey].total_runtime += log.run_time;
            monthDataMap[weekKey].count += 1;
        }
    });

    const finalMonthData = [];
    const totalWeeks = Math.ceil(lastDayOfMonth.getDate() / 7);
    for (let i = 1; i <= totalWeeks; i++) {
        const weekKey = `${getOrdinalSuffix(i)} week`;
        const weekData = monthDataMap[weekKey];
        if (weekData) {
            const totalTasks = weekData.total_tasks;
            const totalRunTime = weekData.total_runtime;
            const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
            const avgRunTime = weekData.count > 0 ? weekData.run_time / weekData.count : 0;
            finalMonthData.push({ created: weekData.created, run_time: avgRunTime, human_hours_saved: humanHoursSaved, total_tasks: totalTasks, total_runtime: totalRunTime, week: weekKey, weekNum: weekData.weekNum });
        } else {
            const weekStartDate = new Date(year, month, (i - 1) * 7 + 1);
            finalMonthData.push({ created: weekStartDate.toISOString(), run_time: 0, human_hours_saved: 0, total_tasks: 0, total_runtime: 0, week: weekKey, weekNum: i });
        }
    }
    finalMonthData.sort((a, b) => a.weekNum - b.weekNum);
    return finalMonthData.filter(d => new Date(d.created).getMonth() === month);
};

const generateAllTimeData = (logs: LogData[]): AllTimeMonthlyDataPoint[] => {
    if (!logs || logs.length === 0) {
        return [];
    }
    const monthlySummary: { [monthKey: string]: { run_time_sum: number; count: number; total_tasks: number; total_runtime: number } } = {};

    const sortedLogs = [...logs].sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());

    sortedLogs.forEach(log => {
        const logDate = new Date(log.created);
        if (isNaN(logDate.getTime())) return;

        const year = logDate.getFullYear();
        const month = logDate.getMonth();
        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

        if (!monthlySummary[monthKey]) {
            monthlySummary[monthKey] = { run_time_sum: 0, count: 0, total_tasks: 0, total_runtime: 0 };
        }

        monthlySummary[monthKey].run_time_sum += log.run_time;
        monthlySummary[monthKey].total_tasks += log.rows_count;
        monthlySummary[monthKey].total_runtime += log.run_time;
        monthlySummary[monthKey].count += 1;
    });

    const allTimeData = Object.keys(monthlySummary).map(monthKey => {
        const data = monthlySummary[monthKey];
        const totalTasks = data.total_tasks;
        const totalRunTime = data.total_runtime;
        const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
        const avgRunTime = data.count > 0 ? data.run_time_sum / data.count : 0;

        const [year, month] = monthKey.split('-').map(Number);
        const monthDate = new Date(year, month - 1, 1);
        const monthLabel = monthDate.toLocaleDateString("en-US", { month: 'short', year: 'numeric' });

        return {
            monthKey,
            monthLabel,
            run_time: avgRunTime,
            human_hours_saved: humanHoursSaved,
            total_tasks: totalTasks,
            total_runtime: totalRunTime,
        };
    });

    allTimeData.sort((a, b) => a.monthKey.localeCompare(b.monthKey));

    return allTimeData;
};

function XpoDashboard({ client }: XpoDashboardProps) {
    const [logs, setLogs] = useState<LogData[]>([]);
    const [, setFilteredLogs] = useState<LogData[]>([]);
    const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([]);
    const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>([]);
    const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
    const [allTimeData, setAllTimeData] = useState<AllTimeMonthlyDataPoint[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState("XPO Ops");
    const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
    const [selectedProcess, setSelectedProcess] = useState("All");
    const [totalMetrics, setTotalMetrics] = useState<TotalMetrics>({ totalRuntime: 0, totalTasks: 0, totalTimeSaved: 0 });

    const getHeadingText = () => {
        if (activePage === "XPO Ops") {
            return `Your ${client} Dashboard for Alphalake Services`;
        } else if (activePage === "XPO ServiceHub") {
            return "XPO ServiceHub";
        } else if (activePage === "Profile") {
            return "Profile";
        } else {
            return "Alphalake Services";
        }
    };

    useEffect(() => {
        if (client !== "XPO") return;
        async function fetchLogs() {
            try {
                const data = await pb.collection("xpo_logs").getFullList<LogData>({ sort: '-created' });
                setLogs(data);
            } catch (error) { console.error("Error fetching logs:", error); }
        }
        fetchLogs();
    }, [client]);

    useEffect(() => {
        if (client !== "XPO") return;

        const dataToFilter = logs;
        const now = new Date();
        const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
        const todayEnd = new Date(todayStart); todayEnd.setDate(todayStart.getDate() + 1);
        const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(todayStart.getDate() - 1);
        const currentDayOfWeek = todayStart.getDay();
        const weekStart = new Date(todayStart); weekStart.setDate(todayStart.getDate() - currentDayOfWeek);
        const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 7);
        const lastWeekStart = new Date(weekStart); lastWeekStart.setDate(weekStart.getDate() - 7);
        const lastWeekEnd = new Date(weekStart);
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        let currentlyFilteredData = dataToFilter.filter((log) => {
            const logDate = new Date(log.created);
            if (isNaN(logDate.getTime())) return false;
            switch (selectedDateFilter) {
                case "Today": return logDate >= todayStart && logDate < todayEnd;
                case "Yesterday": return logDate >= yesterdayStart && logDate < todayStart;
                case "This Week": return logDate >= weekStart && logDate < weekEnd;
                case "Last Week": return logDate >= lastWeekStart && logDate < lastWeekEnd;
                case "This Month": return logDate >= monthStart && logDate < nextMonthStart;
                case "All": return true;
                default: return true;
            }
        });

        if (selectedProcess !== "All") {
            currentlyFilteredData = currentlyFilteredData.filter((log) => log.partner_name === selectedProcess);
        }
        setFilteredLogs(currentlyFilteredData);

        const totalRuntime = currentlyFilteredData.reduce((sum, log) => sum + log.run_time, 0);
        const totalTasks = currentlyFilteredData.reduce((sum, log) => sum + log.rows_count, 0);
        const totalTimeSavedInHours = calculateHumanHoursSaved(totalTasks, totalRuntime);
        const totalTimeSaved = totalTimeSavedInHours * 3600;
        setTotalMetrics({ totalRuntime, totalTasks, totalTimeSaved });

        setHourlyData([]);
        setWeeklyData([]);
        setMonthlyData([]);
        setAllTimeData([]);

        if (selectedDateFilter === "Today") {
            setHourlyData(generateHourlyData(currentlyFilteredData, new Date()));
        } else if (selectedDateFilter === "Yesterday") {
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            setHourlyData(generateHourlyData(currentlyFilteredData, yesterday));
        } else if (selectedDateFilter === "This Week") {
            setWeeklyData(generateWeeklyData(currentlyFilteredData, weekStart));
        } else if (selectedDateFilter === "Last Week") {
            setWeeklyData(generateWeeklyData(currentlyFilteredData, lastWeekStart));
        } else if (selectedDateFilter === "This Month") {
            setMonthlyData(generateMonthlyData(currentlyFilteredData));
        } else if (selectedDateFilter === "All") {
             setAllTimeData(generateAllTimeData(currentlyFilteredData));
        }

    }, [client, selectedDateFilter, selectedProcess, logs]);

    const chartData =
        selectedDateFilter === "Today" || selectedDateFilter === "Yesterday" ? hourlyData :
        selectedDateFilter === "This Week" || selectedDateFilter === "Last Week" ? weeklyData :
        selectedDateFilter === "This Month" ? monthlyData :
        selectedDateFilter === "All" ? allTimeData :
        [];

    const formatTimeForDisplay = formatTimeGeneral;

    const xAxisDataKey =
        selectedDateFilter === "Today" || selectedDateFilter === "Yesterday" ? "created" :
        selectedDateFilter === "This Week" || selectedDateFilter === "Last Week" ? "day" :
        selectedDateFilter === "This Month" ? "week" :
        selectedDateFilter === "All" ? "monthLabel" :
        "created";

        const formatXAxisTick = (value: string | number | Date): string => {
            if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
                const date = new Date(value);
                const hour = date.getHours();
                return !isNaN(hour) && hour % 2 === 0 ? `${hour}` : "";
            } else if (selectedDateFilter === "This Week" || selectedDateFilter === "Last Week" || 
                       selectedDateFilter === "This Month" || selectedDateFilter === "All") {
                return String(value);
            }
            return '';
        };

        const formatTooltipLabel = (label: number): string => {
            if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
                const date = new Date(label);
                if (isNaN(date.getTime())) return '';
                const hour = date.getHours();
                const nextHour = hour + 1;
                return `Hour: ${hour}:00 - ${nextHour}:00`;
            } else if (selectedDateFilter === "This Week" || selectedDateFilter === "Last Week") {
                return `Day: ${label}`;
            } else if (selectedDateFilter === "This Month") {
                return `Week: ${label}`;
            } else if (selectedDateFilter === "All") {
                return `Month: ${label}`;
            }
            return String(label);
        };

    if (client !== "XPO") {
        return <p className="p-6 text-red-500 font-bold">Unauthorized: This dashboard is only for XPO users.</p>;
    }

    return (
        <div className="relative flex min-h-screen text-white overflow-hidden">
            <div className="w-16 flex flex-col justify-start items-center bg-al-950 h-full fixed top-16 left-0 z-40">
                <button onClick={() => setMenuOpen(!menuOpen)} className="mt-6 focus:outline-none bg-al-950 p-2 rounded-md">
                    {menuOpen ? (<div className="text-white text-2xl">✖</div>) : (<div className="flex flex-col space-y-1"><div className="w-6 h-1 bg-white" /><div className="w-6 h-1 bg-white" /><div className="w-6 h-1 bg-white" /></div>)}
                </button>
            </div>
            <div className={`fixed top-16 left-16 h-full w-64 bg-al-950 shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <ul className="space-y-4 text-lg">
                    <li className={`cursor-pointer ${activePage === "XPO Ops" ? "text-primary" : "text-white"}`} onClick={() => { setActivePage("XPO Ops"); setMenuOpen(false); }}>XPO Ops</li>
                    <hr className="border-primary" />
                    <li className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-primary" : "text-white"}`} onClick={() => { setActivePage("XPO ServiceHub"); setMenuOpen(false); }}>XPO Support</li>
                    <hr className="border-primary" />
                </ul>
            </div>

            <div className="flex-1 p-3 sm:p-4 md:p-6 ml-16">
                {activePage === "XPO Ops" && (
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">{getHeadingText()}</h1>

                        <div className="flex flex-col sm:flex-row justify-end item-start sm:items-center mb-4">
                            <div className="w-full sm:w-auto">
                                <Filters
                                    selectedDateFilter={selectedDateFilter}
                                    setSelectedDateFilter={setSelectedDateFilter}
                                    selectedProcess={selectedProcess}
                                    setSelectedProcess={setSelectedProcess}
                                    logs={logs}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
                            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
                                <h3 className="text-md sm:text-md font-semibold text-gray-400">Total Tasks</h3>
                                <p className="text-xl sm:text-2xl font-bold">{totalMetrics.totalTasks}</p>
                            </div>
                            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
                                <h3 className="text-md sm:text-md font-semibold text-gray-400">Total Runtime</h3>
                                <p className="text-xl sm:text-2xl font-bold">{formatTimeForDisplay(totalMetrics.totalRuntime)}</p>
                            </div>
                            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
                                <h3 className="text-md sm:text-md font-semibold text-gray-400">Total Time Saved</h3>
                                <p className="text-xl sm:text-2xl font-bold">{formatTimeForDisplay(totalMetrics.totalTimeSaved)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">

                            <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
                                <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
                                    {selectedDateFilter === 'All' ? 'Total Human Hours Saved per Month' : 'Human Time Saved'}
                                </h2>
                                <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
                                    {chartData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={chartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
                                                <XAxis dataKey={xAxisDataKey} tickFormatter={formatXAxisTick} stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: '14px' }} tickLine={{ stroke: "#ffffff" }} interval={0} />
                                                <YAxis stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: '14px' }} tickLine={{ stroke: "#ffffff" }} tickFormatter={(value) => typeof value === 'number' ? value.toFixed(1) : value} label={{ value: 'Hours Saved', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#fff' }, offset: -10 }} />
                                                <Tooltip contentStyle={{ backgroundColor: '#0096FF', border: '1px solid #4b5563', borderRadius: '5px' }} labelStyle={{ color: '#ffffff', marginBottom: '5px', fontWeight: 'bold' }} itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                                                    formatter={(value, name, props) => {
                                                        if (name === 'human_hours_saved') {
                                                            const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                                                            let displayValue = `${numValue.toFixed(2)} hrs`;
                                                            if (props.payload && props.payload.total_tasks !== undefined) {
                                                                displayValue += ` (${props.payload.total_tasks} tasks)`;
                                                            }
                                                            const tooltipTitle = selectedDateFilter === 'All' ? 'Total Saved' : 'Time Saved';
                                                            return [displayValue, tooltipTitle];
                                                        }
                                                        return [value, name];
                                                    }}
                                                    labelFormatter={formatTooltipLabel}
                                                />
                                                <Line type="monotone" dataKey="human_hours_saved" stroke="#0096FF" strokeWidth={2} dot={false} name="human_hours_saved" />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    ) : (<div className="flex items-center justify-center h-full text-gray-500">No data available for selected period.</div>)}
                                </div>
                                <div className="mt-2 text-center text-sm sm:text-base">
                                    <p>Total Time Saved: {formatTimeForDisplay(totalMetrics.totalTimeSaved)}</p>
                                </div>
                            </div>

                            <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
                                 <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
                                     {selectedDateFilter === 'All' ? 'Average Process Runtime per Month' : 'Process Runtime'}
                                 </h2>
                                <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
                                    {chartData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={chartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
                                                <XAxis dataKey={xAxisDataKey} tickFormatter={formatXAxisTick} stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: '14px' }} tickLine={{ stroke: "#ffffff" }} interval={0} />
                                                <YAxis
                        yAxisId="left"
                        stroke="#ffffff"
                        tick={{ fill: "#ffffff", fontSize: '14px' }}
                        tickLine={{ stroke: "#ffffff" }}
                        tickFormatter={(value) => {
                            if (typeof value === 'number' && !isNaN(value)) {
                                return `${Math.round(value)}s`;
                            }
                            return '';
                        }}
                        label={{
                            value: 'Runtime (Minutes and seconds)',
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#fff' },
                            offset: -10 
                        }}
                    />                                                
                    <Tooltip
                        contentStyle={{ backgroundColor: '#059b9a', border: '1px solid #4b5563', borderRadius: '5px' }}
                        labelStyle={{ color: '#ffffff', marginBottom: '5px', fontWeight: 'bold' }}
                        itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                        formatter={(value, name) => {
                            if (name === 'run_time') {
                                const formattedValue = formatTooltipRuntime(value as number);
                                const displayValue = formattedValue;
                                const tooltipTitle = 'Avg Runtime';
                                return [displayValue, tooltipTitle]; 
                            }
                            
                            return [value, name];
                        }}
                        labelFormatter={formatTooltipLabel} 
                    />
                                                <Line yAxisId="left" type="monotone" dataKey="run_time" stroke="#059b9a" strokeWidth={2} dot={false} name="run_time" />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    ) : (<div className="flex items-center justify-center h-full text-gray-500">No data available for selected period.</div>)}
                                </div>
                                <div className="mt-2 text-center text-sm sm:text-base">
                                    <p>Total Time Taken: {formatTimeForDisplay(totalMetrics.totalRuntime)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {activePage === "XPO ServiceHub" && <div className="text-white p-6">ServiceHub Content Placeholder</div>}
                {activePage === "Profile" && <div className="text-white p-6">Profile Content Placeholder</div>}
            </div>
        </div>
    );
}

export default XpoDashboard;

// "use client";

// import { useEffect, useState } from "react";
// import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, ComposedChart, Tooltip } from "recharts";
// import pb from "@/lib/pocketbase";
// import { Filters } from "./Filter";
// // import ExportXpoLogs from '@/components/ExportXpoLogs';

// interface XpoDashboardProps {
//     client: string;
// }

// interface LogData {
//     filename: string;
//     uuid: string;
//     rows_count: number;
//     run_time: number;
//     human_hours_saved: number;
//     partner_name: string;
//     created: string;
// }

// interface TotalMetrics {
//     totalRuntime: number;
//     totalTasks: number;
//     totalTimeSaved: number;
// }

// interface HourlyDataPoint {
//     created: number;
//     run_time: number;
//     human_hours_saved: number;
//     total_tasks: number;
//     total_runtime: number;
//     hour: string;
// }

// interface WeeklyDataPoint {
//     created: string;
//     run_time: number;
//     human_hours_saved: number;
//     total_tasks: number;
//     total_runtime: number;
//     day: string;
// }

// interface MonthlyDataPoint {
//     created: string;
//     run_time: number;
//     human_hours_saved: number;
//     total_tasks: number;
//     total_runtime: number;
//     week: string;
//     weekNum: number;
// }

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
//     const effectiveManualTime = Math.max(totalTasks * manualTaskCompletionTimeInSeconds, totalRunTime);
//     const timeSavedInSeconds = effectiveManualTime - totalRunTime;
//     return Math.max(0, timeSavedInSeconds / 3600);
// };


// const formatTimeGeneral = (seconds: number) => {
//     if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) return '0s';
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     if (hours > 0) {
//         return `${hours}h ${minutes}m ${remainingSeconds}s`;
//     } else if (minutes > 0) {
//         return `${minutes}m ${remainingSeconds}s`;
//     } else {
//         return `${remainingSeconds}s`;
//     }
// };

// const formatTooltipRuntime = (seconds: number | string | undefined | null): string => {
//     if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
//         return '0m0s';
//     }
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}m${remainingSeconds}s`;
// };

// const generateHourlyData = (logs: LogData[], date: Date) => {
//     const hourlyData: { [hour: number]: { run_time: number; count: number; total_tasks: number } } = {};

//     for (let hour = 0; hour < 24; hour++) {
//         hourlyData[hour] = { run_time: 0, count: 0, total_tasks: 0 };
//     }

//     const dayStart = new Date(date);
//     dayStart.setHours(0, 0, 0, 0);
//     const dayEnd = new Date(dayStart);
//     dayEnd.setDate(dayStart.getDate() + 1);

//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime()) && logDate >= dayStart && logDate < dayEnd) {
//             const hour = logDate.getHours();
//             if (hourlyData[hour]) {
//                 hourlyData[hour].run_time += log.run_time;
//                 hourlyData[hour].total_tasks += log.rows_count;
//                 hourlyData[hour].count += 1;
//             }
//         }
//     });

//     return Array.from({ length: 24 }, (_, hour) => {
//         const hourData = hourlyData[hour];
//         const logCount = hourData.count || 1;
//         const totalRunTimeForHour = hourData.run_time;
//         const totalTasksForHour = hourData.total_tasks;
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasksForHour, totalRunTimeForHour);
//         const baseTimestamp = new Date(date).setHours(hour, 0, 0, 0);

//         return {
//             created: baseTimestamp,
//             run_time: hourData.count ? totalRunTimeForHour / logCount : 0,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasksForHour,
//             total_runtime: totalRunTimeForHour,
//             hour: `${hour}`
//         };
//     });
// };


// const generateWeeklyData = (logs: LogData[]) => {
//     const weekDataMap: { [day: string]: { run_time: number; count: number; total_tasks: number; total_runtime: number; created: string} } = {};
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const now = new Date();
//     const todayStart = new Date(now.setHours(0, 0, 0, 0));
//     const currentDayOfWeek = todayStart.getDay();
//     const firstDayOfWeek = new Date(todayStart);
//     firstDayOfWeek.setDate(todayStart.getDate() - currentDayOfWeek);

//     for (let i = 0; i < 7; i++) {
//          const date = new Date(firstDayOfWeek);
//          date.setDate(firstDayOfWeek.getDate() + i);
//          const dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
//          weekDataMap[dayStr] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, created: date.toISOString() };
//     }


//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime()) && logDate >= firstDayOfWeek) {
//              const dayStr = logDate.toLocaleDateString("en-US", { weekday: "short" });
//              if (weekDataMap[dayStr]) {
//                  weekDataMap[dayStr].run_time += log.run_time;
//                  weekDataMap[dayStr].total_tasks += log.rows_count;
//                  weekDataMap[dayStr].total_runtime += log.run_time;
//                  weekDataMap[dayStr].count += 1;
//              }
//         }
//     });

//     return days.map(dayKey => {
//         const dayData = weekDataMap[dayKey];
//         const totalTasks = dayData.total_tasks;
//         const totalRunTime = dayData.total_runtime;
//         const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
//         const avgRunTime = dayData.count ? dayData.run_time / dayData.count : 0;

//         return {
//             created: dayData.created,
//             run_time: avgRunTime,
//             human_hours_saved: humanHoursSaved,
//             total_tasks: totalTasks,
//             total_runtime: totalRunTime,
//             day: dayKey
//         };
//     });
// };


// const generateMonthlyData = (logs: LogData[]) => {
//     const monthDataMap: { [weekKey: string]: { run_time: number; count: number; total_tasks: number; total_runtime: number; weekNum: number; created: string} } = {};
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = now.getMonth();
//     const firstDayOfMonth = new Date(year, month, 1);
//     const lastDayOfMonth = new Date(year, month + 1, 0);

//     logs.forEach(log => {
//         const logDate = new Date(log.created);
//         if (!isNaN(logDate.getTime()) && logDate >= firstDayOfMonth && logDate <= new Date(year, month + 1, 0)) {
//             const dayOfMonth = logDate.getDate();
//             const weekOfMonth = Math.ceil(dayOfMonth / 7);
//             const weekKey = `${getOrdinalSuffix(weekOfMonth)} week`;

//             if (!monthDataMap[weekKey]) {
//                  const weekStartDate = new Date(year, month, (weekOfMonth - 1) * 7 + 1);
//                  monthDataMap[weekKey] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, weekNum: weekOfMonth, created: weekStartDate.toISOString() };
//             }

//             monthDataMap[weekKey].run_time += log.run_time;
//             monthDataMap[weekKey].total_tasks += log.rows_count;
//             monthDataMap[weekKey].total_runtime += log.run_time;
//             monthDataMap[weekKey].count += 1;
//         }
//     });

//     const finalMonthData = [];
//     const totalWeeks = Math.ceil(lastDayOfMonth.getDate() / 7);
//     for (let i = 1; i <= totalWeeks; i++) {
//         const weekKey = `${getOrdinalSuffix(i)} week`;
//         if (monthDataMap[weekKey]) {
//             const weekData = monthDataMap[weekKey];
//             const logCount = weekData.count || 1;
//             const totalTasks = weekData.total_tasks;
//             const totalRunTime = weekData.total_runtime;
//             const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
//             const avgRunTime = weekData.count ? weekData.run_time / logCount : 0;

//              finalMonthData.push({
//                  created: weekData.created,
//                  run_time: avgRunTime,
//                  human_hours_saved: humanHoursSaved,
//                  total_tasks: totalTasks,
//                  total_runtime: totalRunTime,
//                  week: weekKey,
//                  weekNum: weekData.weekNum
//              });
//         } else {
//             const weekStartDate = new Date(year, month, (i - 1) * 7 + 1);
//              finalMonthData.push({
//                  created: weekStartDate.toISOString(),
//                  run_time: 0,
//                  human_hours_saved: 0,
//                  total_tasks: 0,
//                  total_runtime: 0,
//                  week: weekKey,
//                  weekNum: i
//              });
//         }
//     }


//     finalMonthData.sort((a, b) => a.weekNum - b.weekNum);
//     return finalMonthData.filter(d => new Date(d.created).getMonth() === month);
// };


// function XpoDashboard({ client }: XpoDashboardProps) {
//     const [logs, setLogs] = useState<LogData[]>([]);
//     const [, setFilteredLogs] = useState<LogData[]>([]);
//     const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([]);
//     const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>([]);
//     const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activePage, setActivePage] = useState("XPO Ops");
//     const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
//     const [selectedProcess, setSelectedProcess] = useState("All");
//     const [totalMetrics, setTotalMetrics] = useState<TotalMetrics>({
//         totalRuntime: 0,
//         totalTasks: 0,
//         totalTimeSaved: 0
//     });

//     const getHeadingText = () => {
//         if (activePage === "XPO Ops") {
//             return `Your ${client} Dashboard for Alphalake Services`;
//         } else if (activePage === "XPO ServiceHub") {
//             return "XPO ServiceHub";
//         } else if (activePage === "Profile") {
//             return "Profile";
//         } else {
//             return "Alphalake Services";
//         }
//     };

//     useEffect(() => {
//         if (client !== "XPO") return;

//         async function fetchLogs() {
//             try {
//                 const data = await pb.collection("xpo_logs").getFullList<LogData>({ sort: '-created' });
//                 setLogs(data);
//             } catch (error) {
//                 console.error("Error fetching logs:", error);
//             }
//         }
//         fetchLogs();
//     }, [client]);

//     useEffect(() => {
//         if (client !== "XPO") return;

//         const dataToFilter = logs;
//         const now = new Date();
//         const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
//         const yesterdayStart = new Date(todayStart);
//         yesterdayStart.setDate(todayStart.getDate() - 1);
//         const todayEnd = new Date(todayStart);
//         todayEnd.setDate(todayStart.getDate() + 1);

//         const currentDayOfWeek = todayStart.getDay();
//         const weekStart = new Date(todayStart);
//         weekStart.setDate(todayStart.getDate() - currentDayOfWeek);
//         const weekEnd = new Date(weekStart);
//         weekEnd.setDate(weekStart.getDate() + 7);


//         const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
//         const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

//         let currentlyFilteredData = dataToFilter.filter((log) => {
//             const logDate = new Date(log.created);
//             if (isNaN(logDate.getTime())) return false;

//             switch (selectedDateFilter) {
//                 case "Today":
//                     return logDate >= todayStart && logDate < todayEnd;
//                 case "Yesterday":
//                     return logDate >= yesterdayStart && logDate < todayStart;
//                 case "This Week":
//                     return logDate >= weekStart && logDate < weekEnd;
//                 case "This Month":
//                     return logDate >= monthStart && logDate < nextMonthStart;
//                 default:
//                     return true;
//             }
//         });

//         if (selectedProcess !== "All") {
//             currentlyFilteredData = currentlyFilteredData.filter((log) => log.partner_name === selectedProcess);
//         }

//         setFilteredLogs(currentlyFilteredData);

//         const totalRuntime = currentlyFilteredData.reduce((sum, log) => sum + log.run_time, 0);
//         const totalTasks = currentlyFilteredData.reduce((sum, log) => sum + log.rows_count, 0);
//         const totalTimeSavedInHours = calculateHumanHoursSaved(totalTasks, totalRuntime);
//         const totalTimeSaved = totalTimeSavedInHours * 3600;

//         setTotalMetrics({
//             totalRuntime,
//             totalTasks,
//             totalTimeSaved
//         });

//         if (selectedDateFilter === "Today") {
//             setHourlyData(generateHourlyData(currentlyFilteredData, new Date()));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "Yesterday") {
//             const yesterday = new Date();
//             yesterday.setDate(yesterday.getDate() - 1);
//             setHourlyData(generateHourlyData(currentlyFilteredData, yesterday));
//             setWeeklyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Week") {
//             setWeeklyData(generateWeeklyData(currentlyFilteredData));
//             setHourlyData([]);
//             setMonthlyData([]);
//         } else if (selectedDateFilter === "This Month") {
//             setMonthlyData(generateMonthlyData(currentlyFilteredData));
//             setHourlyData([]);
//             setWeeklyData([]);
//         } else {
//              setHourlyData([]);
//              setWeeklyData([]);
//              setMonthlyData([]);
//         }
//     }, [client, selectedDateFilter, selectedProcess, logs]);

//     const chartData =
//         selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
//             ? hourlyData
//             : selectedDateFilter === "This Week"
//                 ? weeklyData
//                 : selectedDateFilter === "This Month"
//                     ? monthlyData
//                     : [];


//     const formatTimeForDisplay = formatTimeGeneral;

//      const xAxisDataKey =
//         selectedDateFilter === "Today" || selectedDateFilter === "Yesterday"
//             ? "created"
//             : selectedDateFilter === "This Week"
//                 ? "day"
//                 : selectedDateFilter === "This Month"
//                     ? "week"
//                     : "created";

//          const formatXAxisTick = (value: number | string): string => { 
//             if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
//                 if (typeof value === 'number') { 
//                     const date = new Date(value);
//                     const hour = date.getHours();
//                     return !isNaN(hour) && hour % 2 === 0 ? `${hour}` : "";
//                 }
//                 return '';
   
//             } else if (selectedDateFilter === "This Week" || selectedDateFilter === "This Month") {
//                 if (typeof value === 'string') { 
//                     return value;
//                 }
//                 return '';
//             }
//             return '';
//         };
//          const formatTooltipLabel = (label: number | string): string => { 
//             if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
//                 if (typeof label === 'number') { 
//                     const date = new Date(label);
//                     if (isNaN(date.getTime())) return ''; 
//                     const hour = date.getHours();
//                     const nextHour = hour + 1;
//                     return `Hour: ${hour}:00 - ${nextHour % 24}:00`;
//                 }
//                 return ''; 
   
//             } else if (selectedDateFilter === "This Week") {
//                  if (typeof label === 'string') { 
//                     return `Day: ${label}`;
//                 }
//                 return ''; 
   
//             } else if (selectedDateFilter === "This Month") {
//                  if (typeof label === 'string') { 
//                      return `Week: ${label}`;
//                 }
//                 return ''; 
//             }
            
//             return '';
//         };


//     if (client !== "XPO") {
//         return <p className="p-6 text-red-500 font-bold">Unauthorized: This dashboard is only for XPO users.</p>;
//     }

//     return (
//         <div className="relative flex min-h-screen text-white overflow-hidden">
//              <div className="w-16 flex flex-col justify-start items-center bg-al-950 h-full fixed top-16 left-0 z-40">
//                  <button
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     className="mt-6 focus:outline-none bg-al-950 p-2 rounded-md"
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
//                 className={`fixed top-16 left-16 h-full w-64 bg-al-950 shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
//             >
//                  <ul className="space-y-4 text-lg">
//                     <li
//                         className={`cursor-pointer ${activePage === "XPO OpsHub" ? "text-primary" : "text-white"}`}
//                         onClick={() => {
//                             setActivePage("XPO OpsHub");
//                             setMenuOpen(false);
//                         }}
//                     >
//                         XPO Ops
//                     </li>
//                     <hr className="border-primary" />

//                     <li
//                         className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-primary" : "text-white"}`}
//                         onClick={() => {
//                             setActivePage("XPO ServiceHub");
//                             setMenuOpen(false);
//                         }}
//                     >
//                         XPO Support
//                     </li>
//                     <hr className="border-primary" />

//                     {/* <li
//                         className={`cursor-pointer ${activePage === "Profile" ? "text-primary" : "text-white"}`}
//                         onClick={() => {
//                             setActivePage("Profile");
//                             setMenuOpen(false);
//                         }}
//                     >
//                         Profile
//                     </li> */}
//                 </ul>
//             </div>

//             <div className="flex-1 p-3 sm:p-4 md:p-6 ml-16">
//                 {activePage === "XPO Ops" && (
//                     <div>
//                         {/* <div className="p-4">
//                           <h1 className="text-xl font-semibold mb-4">Export XPO Logs</h1>
//                           <ExportXpoLogs />
//                         </div> */}

//                         <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">{getHeadingText()}</h1>

//                         <div className="flex flex-col sm:flex-row justify-end item-start sm:items-center mb-4">
//                             <div className="w-full sm:w-auto">
//                                 <Filters
//                                     selectedDateFilter={selectedDateFilter}
//                                     setSelectedDateFilter={setSelectedDateFilter}
//                                     selectedProcess={selectedProcess}
//                                     setSelectedProcess={setSelectedProcess}
//                                     logs={logs}
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
//                             <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-sm sm:text-md font-semibold">Total Tasks</h3>
//                                 <p className="text-xl sm:text-2xl font-bold">{totalMetrics.totalTasks}</p>
//                             </div>
//                             <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-sm sm:text-md font-semibold">Total Runtime</h3>
//                                 <p className="text-xl sm:text-2xl font-bold">{formatTimeForDisplay(totalMetrics.totalRuntime)}</p>
//                             </div>
//                             <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
//                                 <h3 className="text-sm sm:text-md font-semibold">Total Time Saved</h3>
//                                 <p className="text-xl sm:text-2xl font-bold">{formatTimeForDisplay(totalMetrics.totalTimeSaved)}</p>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
//                             <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">Human Time Saved</h2>
//                                 <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
//                                     <ResponsiveContainer width="100%" height="100%">
//                                         <ComposedChart data={chartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
//                                              <XAxis
//                                                 dataKey={xAxisDataKey}
//                                                 tickFormatter={formatXAxisTick}
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 interval={0}
//                                             />
//                                             <YAxis
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 tickFormatter={(value) => typeof value === 'number' ? value.toFixed(1) : value}
//                                                 label={{
//                                                     value: 'Hours saved',
//                                                     angle: -90,
//                                                     position: 'insideLeft',
//                                                     style: { textAnchor: 'middle', fill: '#fff', fontSize: '16px' },
//                                                 }}
//                                             />
//                                             <Tooltip
//                                                 contentStyle={{ backgroundColor: 'rgba(255, 255, 255)', border: 'none', borderRadius: '5px' }}
//                                                 itemStyle={{ color: '#0096FF' }}
//                                                 formatter={(value, name) => {
//                                                     if (name === 'human_hours_saved') {
//                                                         const numValue = typeof value === 'number' ? value : parseFloat(value as string);
//                                                         return [`${numValue.toFixed(2)} hrs`, 'Time Saved'];
//                                                     }
//                                                     return [value, name];
//                                                 }}
//                                                 labelFormatter={formatTooltipLabel}
//                                              />
//                                             <Line
//                                                 type="monotone"
//                                                 dataKey="human_hours_saved"
//                                                 stroke="#0096FF"
//                                                 strokeWidth={2}
//                                                 dot={false}
//                                                 name="human_hours_saved"
//                                             />
//                                         </ComposedChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                                 <div className="mt-2 text-center text-sm sm:text-base">
//                                     <p>Total Time Saved: {formatTimeForDisplay(totalMetrics.totalTimeSaved)}</p>
//                                 </div>
//                             </div>

//                              {/* Process Runtime Chart - Moved Second */}
//                             <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
//                                 <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">Process Runtime</h2>
//                                 <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
//                                     <ResponsiveContainer width="100%" height="100%">
//                                         <ComposedChart data={chartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
//                                             <XAxis
//                                                 dataKey={xAxisDataKey}
//                                                 tickFormatter={formatXAxisTick}
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 interval={0}
//                                             />
//                                             <YAxis
//                                                 stroke="#ffffff"
//                                                 tick={{ fill: "#ffffff", fontSize: '14px' }}
//                                                 tickLine={{ stroke: "#ffffff" }}
//                                                 label={{
//                                                     value: 'Runtime (Minutes and seconds)',
//                                                     angle: -90,
//                                                     position: 'insideLeft',
//                                                     style: { textAnchor: 'middle', fill: '#fff', fontSize: '16px' },
//                                                 }}
//                                             />
//                                             <Tooltip
//                                                 contentStyle={{ backgroundColor: 'rgba(255, 255, 255)', border: 'none', borderRadius: '5px' }}
//                                                 itemStyle={{ color: '#059b9a' }}
//                                                 formatter={(value, name) => {
//                                                     if (name === 'run_time') {
//                                                         const formattedValue = formatTooltipRuntime(value as number);
//                                                         return [formattedValue, 'Avg Runtime'];
//                                                     }
//                                                     return [value, name];
//                                                 }}
//                                                 labelFormatter={formatTooltipLabel}
//                                             />
//                                             <Line
//                                                  type="monotone"
//                                                  dataKey="run_time"
//                                                  stroke="#059b9a"
//                                                  strokeWidth={2}
//                                                  dot={false}
//                                                  name="run_time"
//                                              />
//                                         </ComposedChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                                 <div className="mt-2 text-center text-sm sm:text-base">
//                                     <p>Total Time Taken: {formatTimeForDisplay(totalMetrics.totalRuntime)}</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 )}
//                  {activePage === "XPO ServiceHub" && <div className="text-white">ServiceHub Content Placeholder</div>}
//                  {activePage === "Profile" && <div className="text-white">Profile Content Placeholder</div>}
//             </div>
//         </div>
//     );
// }

// export default XpoDashboard;