
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

interface CombinedDataPoint {
    created?: number | string;
    hour?: string;
    day?: string;
    week?: string;
    weekNum?: number;
    monthKey?: string;
    monthLabel?: string;

    run_time: number | null;
    human_hours_saved: number | null;
    total_tasks?: number;
    total_runtime?: number;

    previous_run_time: number | null;
    previous_human_hours_saved: number | null;
}
interface ChartTooltipPayload {
    payload?: {
      hour?: string;
      day?: string;
      week?: string;
      monthLabel?: string;
    };
  }

// interface TooltipPayloadItem {
//     payload: CombinedDataPoint;
//     name: string;
//     value: number | string | null;
//     dataKey: string;
// }

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
            if (hourlyData[hour] !== undefined) {
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
    const nextMonthFirstDay = new Date(year, month + 1, 1);

    const currentMonthLogs = logs.filter(log => {
        const logDate = new Date(log.created);
        return !isNaN(logDate.getTime()) && logDate >= firstDayOfMonth && logDate < nextMonthFirstDay;
    });

    currentMonthLogs.forEach(log => {
        const logDate = new Date(log.created);
        const dayOfMonth = logDate.getDate();
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        const weekKey = `${getOrdinalSuffix(weekOfMonth)} week`;
        if (!monthDataMap[weekKey]) {
            const weekStartDate = new Date(year, month, (weekOfMonth - 1) * 7 + 1);
            if (weekStartDate.getMonth() === month) {
                monthDataMap[weekKey] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, weekNum: weekOfMonth, created: weekStartDate.toISOString() };
            }
        }
        if (monthDataMap[weekKey]) {
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
        const weekStartDate = new Date(year, month, (i - 1) * 7 + 1);

        if (weekStartDate.getMonth() !== month) continue;

        if (weekData) {
            const totalTasks = weekData.total_tasks;
            const totalRunTime = weekData.total_runtime;
            const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
            const avgRunTime = weekData.count > 0 ? weekData.run_time / weekData.count : 0;
            finalMonthData.push({ created: weekData.created, run_time: avgRunTime, human_hours_saved: humanHoursSaved, total_tasks: totalTasks, total_runtime: totalRunTime, week: weekKey, weekNum: weekData.weekNum });
        } else {
            finalMonthData.push({ created: weekStartDate.toISOString(), run_time: 0, human_hours_saved: 0, total_tasks: 0, total_runtime: 0, week: weekKey, weekNum: i });
        }
    }
    finalMonthData.sort((a, b) => a.weekNum - b.weekNum);
    return finalMonthData;
};

const generateMonthlyDataForDate = (logs: LogData[], targetDate: Date): MonthlyDataPoint[] => {
    const monthDataMap: { [weekKey: string]: { run_time: number; count: number; total_tasks: number; total_runtime: number; weekNum: number; created: string } } = {};
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const nextMonthFirstDay = new Date(year, month + 1, 1);

    const targetMonthLogs = logs.filter(log => {
        const logDate = new Date(log.created);
        return !isNaN(logDate.getTime()) && logDate >= firstDayOfMonth && logDate < nextMonthFirstDay;
    });

    targetMonthLogs.forEach(log => {
        const logDate = new Date(log.created);
        const dayOfMonth = logDate.getDate();
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        const weekKey = `${getOrdinalSuffix(weekOfMonth)} week`;
        const weekNum = weekOfMonth;

        if (!monthDataMap[weekKey]) {
            const weekStartDate = new Date(year, month, (weekNum - 1) * 7 + 1);
            if (weekStartDate.getMonth() === month) {
                monthDataMap[weekKey] = { run_time: 0, count: 0, total_tasks: 0, total_runtime: 0, weekNum: weekNum, created: weekStartDate.toISOString() };
            }
        }
        if (monthDataMap[weekKey]) {
            monthDataMap[weekKey].run_time += log.run_time;
            monthDataMap[weekKey].total_tasks += log.rows_count;
            monthDataMap[weekKey].total_runtime += log.run_time;
            monthDataMap[weekKey].count += 1;
        }
    });

    const finalMonthData = [];
    const totalWeeksInMonth = Math.ceil(lastDayOfMonth.getDate() / 7);

    for (let i = 1; i <= totalWeeksInMonth; i++) {
        const weekKey = `${getOrdinalSuffix(i)} week`;
        const weekData = monthDataMap[weekKey];
        const weekStartDate = new Date(year, month, (i - 1) * 7 + 1);

        if (weekStartDate.getMonth() !== month) continue;

        if (weekData) {
            const totalTasks = weekData.total_tasks;
            const totalRunTime = weekData.total_runtime;
            const humanHoursSaved = calculateHumanHoursSaved(totalTasks, totalRunTime);
            const avgRunTime = weekData.count > 0 ? weekData.run_time / weekData.count : 0;
            finalMonthData.push({
                created: weekData.created,
                run_time: avgRunTime,
                human_hours_saved: humanHoursSaved,
                total_tasks: totalTasks,
                total_runtime: totalRunTime,
                week: weekKey,
                weekNum: weekData.weekNum
            });
        } else {
            finalMonthData.push({
                created: weekStartDate.toISOString(),
                run_time: 0,
                human_hours_saved: 0,
                total_tasks: 0,
                total_runtime: 0,
                week: weekKey,
                weekNum: i
            });
        }
    }
    finalMonthData.sort((a, b) => a.weekNum - b.weekNum);
    return finalMonthData;
};

const generateAllTimeData = (logs: LogData[]): AllTimeMonthlyDataPoint[] => {
    if (!logs || logs.length === 0) {
        return [];
    }
    const monthlySummary: { [monthKey: string]: { run_time_sum: number; count: number; total_tasks: number; total_runtime: number } } = {};

    logs.forEach(log => {
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
    const [combinedChartData, setCombinedChartData] = useState<CombinedDataPoint[]>([]);
    const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
    const [selectedProcess, setSelectedProcess] = useState("All");
    const [totalMetrics, setTotalMetrics] = useState<TotalMetrics>({ totalRuntime: 0, totalTasks: 0, totalTimeSaved: 0 });

    const getHeadingText = () => {
        return `Your ${client} Dashboard for Alphalake Services`;
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

        const allLogs = logs;
        const now = new Date();

        const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
        const todayEnd = new Date(todayStart); todayEnd.setDate(todayStart.getDate() + 1);

        const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(todayStart.getDate() - 1);
        const yesterdayEnd = new Date(todayStart);

        const dayBeforeYesterdayStart = new Date(yesterdayStart); dayBeforeYesterdayStart.setDate(yesterdayStart.getDate() - 1);
        const dayBeforeYesterdayEnd = new Date(yesterdayStart);

        const currentDayOfWeek = todayStart.getDay();
        const weekStart = new Date(todayStart); weekStart.setDate(todayStart.getDate() - currentDayOfWeek);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 7);

        const lastWeekStart = new Date(weekStart); lastWeekStart.setDate(weekStart.getDate() - 7);
        const lastWeekEnd = new Date(weekStart);

        const weekBeforeLastStart = new Date(lastWeekStart); weekBeforeLastStart.setDate(lastWeekStart.getDate() - 7);
        const weekBeforeLastEnd = new Date(lastWeekStart);

        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        monthStart.setHours(0, 0, 0, 0);
        const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        nextMonthStart.setHours(0, 0, 0, 0);

        const lastMonth = new Date(monthStart); lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
        lastMonthStart.setHours(0, 0, 0, 0);
        const lastMonthEnd = new Date(monthStart);

        let currentPeriodLogs = allLogs.filter((log) => {
            const logDate = new Date(log.created);
            if (isNaN(logDate.getTime())) return false;
            switch (selectedDateFilter) {
                case "Today": return logDate >= todayStart && logDate < todayEnd;
                case "Yesterday": return logDate >= yesterdayStart && logDate < yesterdayEnd;
                case "This Week": return logDate >= weekStart && logDate < weekEnd;
                case "Last Week": return logDate >= lastWeekStart && logDate < lastWeekEnd;
                case "This Month": return logDate >= monthStart && logDate < nextMonthStart;
                case "All": return true;
                default: return true;
            }
        });

        let previousPeriodLogs: LogData[] = [];
        const needsPreviousData = ["Today", "Yesterday", "This Week", "Last Week", "This Month"].includes(selectedDateFilter);
        let previousPeriodStartDate: Date | null = null;

        if (needsPreviousData) {
            if (selectedDateFilter === "Today") {
                previousPeriodStartDate = yesterdayStart;
                previousPeriodLogs = allLogs.filter(log => {
                    const logDate = new Date(log.created);
                    return !isNaN(logDate.getTime()) && logDate >= yesterdayStart && logDate < yesterdayEnd;
                });
            } else if (selectedDateFilter === "Yesterday") {
                previousPeriodStartDate = dayBeforeYesterdayStart;
                previousPeriodLogs = allLogs.filter(log => {
                    const logDate = new Date(log.created);
                    return !isNaN(logDate.getTime()) && logDate >= dayBeforeYesterdayStart && logDate < dayBeforeYesterdayEnd;
                });
            } else if (selectedDateFilter === "This Week") {
                previousPeriodStartDate = lastWeekStart;
                previousPeriodLogs = allLogs.filter(log => {
                    const logDate = new Date(log.created);
                    return !isNaN(logDate.getTime()) && logDate >= lastWeekStart && logDate < lastWeekEnd;
                });
            } else if (selectedDateFilter === "Last Week") {
                previousPeriodStartDate = weekBeforeLastStart;
                previousPeriodLogs = allLogs.filter(log => {
                    const logDate = new Date(log.created);
                    return !isNaN(logDate.getTime()) && logDate >= weekBeforeLastStart && logDate < weekBeforeLastEnd;
                });
            } else if (selectedDateFilter === "This Month") {
                previousPeriodStartDate = lastMonthStart;
                previousPeriodLogs = allLogs.filter(log => {
                    const logDate = new Date(log.created);
                    return !isNaN(logDate.getTime()) && logDate >= lastMonthStart && logDate < lastMonthEnd;
                });
            }
        }

        if (selectedProcess !== "All") {
            currentPeriodLogs = currentPeriodLogs.filter((log) => log.partner_name === selectedProcess);
            if (needsPreviousData) {
                previousPeriodLogs = previousPeriodLogs.filter((log) => log.partner_name === selectedProcess);
            }
        }
        setFilteredLogs(currentPeriodLogs);

        const totalRuntime = currentPeriodLogs.reduce((sum, log) => sum + log.run_time, 0);
        const totalTasks = currentPeriodLogs.reduce((sum, log) => sum + log.rows_count, 0);
        const totalTimeSavedInHours = calculateHumanHoursSaved(totalTasks, totalRuntime);
        const totalTimeSaved = totalTimeSavedInHours * 3600;
        setTotalMetrics({ totalRuntime, totalTasks, totalTimeSaved });

        let currentChartData: HourlyDataPoint[] | WeeklyDataPoint[] | MonthlyDataPoint[] | AllTimeMonthlyDataPoint[] = [];
        let previousChartData: HourlyDataPoint[] | WeeklyDataPoint[] | MonthlyDataPoint[] | AllTimeMonthlyDataPoint[] = [];
        let mergedData: CombinedDataPoint[] = [];

        try {
            if (needsPreviousData && previousPeriodStartDate) {
                if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
                    const currentPeriodDate = selectedDateFilter === "Today" ? todayStart : yesterdayStart;
                    currentChartData = generateHourlyData(currentPeriodLogs, currentPeriodDate);
                    previousChartData = generateHourlyData(previousPeriodLogs, previousPeriodStartDate);
                    mergedData = currentChartData.map((currentPoint, index) => {
                        const previousPoint = previousChartData[index] as HourlyDataPoint;
                        return {
                            ...currentPoint,
                            previous_run_time: previousPoint?.run_time ?? null,
                            previous_human_hours_saved: previousPoint?.human_hours_saved ?? null,
                        };
                    });
                } else if (selectedDateFilter === "This Week" || selectedDateFilter === "Last Week") {
                    const currentPeriodStartDate = selectedDateFilter === "This Week" ? weekStart : lastWeekStart;
                    currentChartData = generateWeeklyData(currentPeriodLogs, currentPeriodStartDate);
                    previousChartData = generateWeeklyData(previousPeriodLogs, previousPeriodStartDate);
                    mergedData = currentChartData.map((currentPoint) => {
                        const previousPoint = previousChartData.find(p => (p as WeeklyDataPoint).day === (currentPoint as WeeklyDataPoint).day) as WeeklyDataPoint;
                        return {
                            ...currentPoint,
                            previous_run_time: previousPoint?.run_time ?? null,
                            previous_human_hours_saved: previousPoint?.human_hours_saved ?? null,
                        };
                    });
                } else if (selectedDateFilter === "This Month") {
                    currentChartData = generateMonthlyData(currentPeriodLogs);
                    previousChartData = generateMonthlyDataForDate(previousPeriodLogs, previousPeriodStartDate);

                    const currentWeekMap = new Map((currentChartData as MonthlyDataPoint[]).map(p => [p.weekNum, p]));
                    const previousWeekMap = new Map((previousChartData as MonthlyDataPoint[]).map(p => [p.weekNum, p]));
                    const baseWeeks = currentChartData.length > 0 ? currentChartData :
                        (previousChartData.length > 0 ? (previousChartData as MonthlyDataPoint[]).map(p => ({ weekNum: p.weekNum, week: p.week, created: p.created })) : []) as MonthlyDataPoint[];

                    mergedData = baseWeeks.map(basePoint => {
                        const weekNum = basePoint.weekNum;
                        const currentPoint = currentWeekMap.get(weekNum);
                        const previousPoint = previousWeekMap.get(weekNum);

                        return {
                            created: basePoint.created,
                            week: basePoint.week,
                            weekNum: basePoint.weekNum,
                            run_time: currentPoint?.run_time ?? null,
                            human_hours_saved: currentPoint?.human_hours_saved ?? null,
                            total_tasks: currentPoint?.total_tasks,
                            total_runtime: currentPoint?.total_runtime,
                            previous_run_time: previousPoint?.run_time ?? null,
                            previous_human_hours_saved: previousPoint?.human_hours_saved ?? null,
                        };
                    }).sort((a, b) => (a.weekNum ?? 0) - (b.weekNum ?? 0));
                }
            }
            else if (selectedDateFilter === "All") {
                currentChartData = generateAllTimeData(currentPeriodLogs);
                mergedData = currentChartData.map(p => ({
                    ...p,
                    previous_run_time: null,
                    previous_human_hours_saved: null
                }));
            } else {
                mergedData = [];
            }

            setCombinedChartData(mergedData);

        } catch (error) {
            console.error("Error processing chart data:", error);
            setCombinedChartData([]);
        }

    }, [client, selectedDateFilter, selectedProcess, logs]);

    const xAxisDataKey =
        selectedDateFilter === "Today" || selectedDateFilter === "Yesterday" ? "hour" :
            selectedDateFilter === "This Week" || selectedDateFilter === "Last Week" ? "day" :
                selectedDateFilter === "This Month" ? "week" :
                    selectedDateFilter === "All" ? "monthLabel" :
                        "created";

    const formatXAxisTick = (value: string | number): string => {
        if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
            const hour = typeof value === 'number' ? value : parseInt(value, 10);
            return ! isNaN(hour) && hour % 2 === 0 ? `${hour}` : "";
        } else if (selectedDateFilter === "This Week" || selectedDateFilter === "Last Week" ||
            selectedDateFilter === "This Month" || selectedDateFilter === "All") {
            return String(value); // Directly display day/week/monthLabel
        }
        return ''; // Default hide
    };

    const formatTooltipLabel = (label: string | number, payload: ChartTooltipPayload[]): string => {

        if (!payload || payload.length === 0 || !payload[0] || !payload[0].payload) {
            return String(label);
        }
        const pointData = payload[0].payload as CombinedDataPoint;

        if (selectedDateFilter === "Today" || selectedDateFilter === "Yesterday") {
            const hourStr = pointData.hour ?? String(label);
            const hour = parseInt(hourStr, 10);
            if (isNaN(hour)) return '';
            const nextHour = hour + 1;
            // Indicate the primary day being shown in the tooltip
            const dayIndicator = selectedDateFilter === "Yesterday" ? " (Yesterday)" : " (Today)";
            return `Hour: ${hour}:00 - ${nextHour}:00${dayIndicator}`;
        } else if (selectedDateFilter === "This Week" || selectedDateFilter === "Last Week") {
            // Indicate the primary week being shown
            const weekIndicator = selectedDateFilter === "Last Week" ? " (Last Week)" : " (This Week)";
            return `Day: ${pointData.day ?? label}${weekIndicator}`;
        } else if (selectedDateFilter === "This Month") {
            return `Week: ${pointData.week ?? label}`; 
        } else if (selectedDateFilter === "All") {
            return `Month: ${pointData.monthLabel ?? label}`;
        }
        return String(label); 
    };


    if (client !== "XPO") {
        return <p className="p-6 text-red-500 font-bold">Unauthorized: This dashboard is only for XPO users.</p>;
    }

    const showDashedLine = ["Today", "Yesterday", "This Week", "Last Week", "This Month"].includes(selectedDateFilter);

    return (
        <div className="relative flex min-h-screen text-white overflow-hidden pl-14">  
            <div className="flex-1 p-3 sm:p-4 md:p-6"> 
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
                            <p className="text-xl sm:text-2xl font-bold">{formatTimeGeneral(totalMetrics.totalRuntime)}</p>
                        </div>
                        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg">
                            <h3 className="text-md sm:text-md font-semibold text-gray-400">Total Time Saved</h3>
                            <p className="text-xl sm:text-2xl font-bold">{formatTimeGeneral(totalMetrics.totalTimeSaved)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">

                        <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
                            <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
                                {selectedDateFilter === 'All' ? 'Total Human Hours Saved per Month' : 'Human Time Saved'}
                                {showDashedLine && <span className="text-sm text-gray-400"> (vs Previous Period)</span>}
                            </h2>
                            <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
                                {combinedChartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={combinedChartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
                                            <XAxis
                                                dataKey={xAxisDataKey}
                                                tickFormatter={formatXAxisTick}
                                                stroke="#ffffff"
                                                tick={{ fill: "#ffffff", fontSize: '14px' }}
                                                tickLine={{ stroke: "#ffffff" }}
                                                interval="preserveStartEnd" 
                                                padding={{ left: 10, right: 10 }} 
                                            />
                                            <YAxis
                                                stroke="#ffffff"
                                                tick={{ fill: "#ffffff", fontSize: '14px' }}
                                                tickLine={{ stroke: "#ffffff" }}
                                                tickFormatter={(value) => typeof value === 'number' ? value.toFixed(1) : value}
                                                label={{ value: 'Hours Saved', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#fff' }, offset: -25 }}
                                                domain={['auto', 'auto']} 
                                                allowDecimals={true}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0096FF', border: '1px solid #4b5563', borderRadius: '5px' }}
                                                labelStyle={{ color: '#ffffff', marginBottom: '5px', fontWeight: 'bold' }}
                                                itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                                                formatter={(value, name, props) => {
                                                    const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                                                    if (value === null || isNaN(numValue)) return [null, name]; 

                                                    let periodLabel = "Current Period"; 
                                                    if (name === 'human_hours_saved') {
                                                        periodLabel = selectedDateFilter === 'All' ? 'Total Saved' :
                                                            selectedDateFilter === 'Yesterday' ? 'Yesterday' :
                                                                selectedDateFilter === 'Last Week' ? 'Last Week' :
                                                                    'Current Period';
                                                        let displayValue = `${numValue.toFixed(2)} hrs`;
                                                        if (props.payload && props.payload.total_tasks !== undefined && props.payload.total_tasks !== null) {
                                                            displayValue += ` (${props.payload.total_tasks} tasks)`;
                                                        }
                                                        return [displayValue, periodLabel];
                                                    }
                                                    if (name === 'previous_human_hours_saved') {
                                                        periodLabel = selectedDateFilter === 'Today' ? 'Yesterday' :
                                                            selectedDateFilter === 'Yesterday' ? 'Day Before' :
                                                                selectedDateFilter === 'This Week' ? 'Last Week' :
                                                                    selectedDateFilter === 'Last Week' ? 'Week Before Last' :
                                                                        selectedDateFilter === 'This Month' ? 'Last Month' :
                                                                            'Previous Period';
                                                        return [`${numValue.toFixed(2)} hrs`, periodLabel];
                                                    }
                                                    return [numValue.toFixed(2), name]; 
                                                }}
                                                labelFormatter={formatTooltipLabel} 
                                            />
                                            <Line type="monotone" dataKey="human_hours_saved" stroke="#0096FF" strokeWidth={2} dot={false} name="human_hours_saved" connectNulls />
                                            {showDashedLine && (
                                                <Line type="monotone" dataKey="previous_human_hours_saved" stroke="#0096FF" strokeWidth={2} dot={false} strokeDasharray="5 5" name="previous_human_hours_saved" connectNulls />
                                            )}
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                ) : (<div className="flex items-center justify-center h-full text-gray-500">No data available for selected period.</div>)}
                            </div>
                            <div className="mt-2 text-center text-sm sm:text-base">
                                <p>Total Time Saved ({selectedDateFilter}): {formatTimeGeneral(totalMetrics.totalTimeSaved)}</p>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg">
                            <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4">
                                {selectedDateFilter === 'All' ? 'Average Process Runtime per Month' : 'Process Runtime'}
                                {showDashedLine && <span className="text-sm text-gray-400"> (vs Previous Period)</span>}
                            </h2>
                            <div className="h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 2xl:h-80">
                                {combinedChartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={combinedChartData} margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ffffff" />
                                            <XAxis
                                                dataKey={xAxisDataKey}
                                                tickFormatter={formatXAxisTick}
                                                stroke="#ffffff"
                                                tick={{ fill: "#ffffff", fontSize: '14px' }}
                                                tickLine={{ stroke: "#ffffff" }}
                                                interval="preserveStartEnd"
                                                padding={{ left: 10, right: 10 }}
                                            />
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
                                                    offset: -25
                                                }}
                                                domain={['auto', 'auto']} 
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#059b9a', border: '1px solid #4b5563', borderRadius: '5px' }}
                                                labelStyle={{ color: '#ffffff', marginBottom: '5px', fontWeight: 'bold' }}
                                                itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                                                formatter={(value, name) => {
                                                    const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                                                    if (value === null || isNaN(numValue)) return [null, name]; 

                                                    let periodLabel = "Current Period"; 
                                                    if (name === 'run_time') {
                                                        periodLabel = selectedDateFilter === 'All' ? 'Avg Runtime' :
                                                            selectedDateFilter === 'Yesterday' ? 'Yesterday' :
                                                                selectedDateFilter === 'Last Week' ? 'Last Week' :
                                                                    'Current Period';
                                                        const formattedValue = formatTooltipRuntime(numValue);
                                                        return [formattedValue, periodLabel];
                                                    }
                                                    if (name === 'previous_run_time') {
                                                        periodLabel = selectedDateFilter === 'Today' ? 'Yesterday' :
                                                            selectedDateFilter === 'Yesterday' ? 'Day Before' :
                                                                selectedDateFilter === 'This Week' ? 'Last Week' :
                                                                    selectedDateFilter === 'Last Week' ? 'Week Before Last' :
                                                                        selectedDateFilter === 'This Month' ? 'Last Month' :
                                                                            'Previous Period';
                                                        const formattedValue = formatTooltipRuntime(numValue);
                                                        return [formattedValue, periodLabel];
                                                    }
                                                    return [formatTooltipRuntime(numValue), name]; 
                                                }}
                                                labelFormatter={formatTooltipLabel} 
                                            />
                                            <Line yAxisId="left" type="monotone" dataKey="run_time" stroke="#059b9a" strokeWidth={2} dot={false} name="run_time" connectNulls />
                                            {showDashedLine && (
                                                <Line yAxisId="left" type="monotone" dataKey="previous_run_time" stroke="#059b9a" strokeWidth={2} dot={false} strokeDasharray="5 5" name="previous_run_time" connectNulls />
                                            )}
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                ) : (<div className="flex items-center justify-center h-full text-gray-500">No data available for selected period.</div>)}
                            </div>
                            <div className="mt-2 text-center text-sm sm:text-base">
                                <p>Total Runtime ({selectedDateFilter}): {formatTimeGeneral(totalMetrics.totalRuntime)}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default XpoDashboard;