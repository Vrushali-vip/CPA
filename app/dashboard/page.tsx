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
//     created_at: string; // Timestamp for filtering by date
// }

// export default function XpoDashboard() {
//     const [logs, setLogs] = useState<LogData[]>([]);
//     const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activePage, setActivePage] = useState("XPO Services Dashboard");

//     const [selectedPeriod, setSelectedPeriod] = useState("Jan 1 - Jan 31"); // Default period
//     const [selectedProcess, setSelectedProcess] = useState("All");

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

//     // Function to filter logs based on selectedPeriod and selectedProcess
//     useEffect(() => {
//         let filteredData = logs;

//         // Filter by Period (date range)
//         if (selectedPeriod !== "All") {
//             const [start, end] = selectedPeriod.split(" - ");
//             const startDate = new Date(`2025-${start}`);
//             const endDate = new Date(`2025-${end}`);
//             filteredData = filteredData.filter((log) => {
//                 const logDate = new Date(log.created_at);
//                 return logDate >= startDate && logDate <= endDate;
//             });
//         }

//         // Filter by Partner Name (Processes)
//         if (selectedProcess !== "All") {
//             filteredData = filteredData.filter((log) => log.partner_name === selectedProcess);
//         }

//         setFilteredLogs(filteredData);
//     }, [selectedPeriod, selectedProcess, logs]);

//     return (
//         <div className="relative flex h-screen bg-[#0D0D0D] text-white overflow-hidden">
//             {/* Sidebar + Space for Menu Button */}
//             <div className="w-16 flex flex-col justify-start items-center bg-[#1A1A1A] h-full fixed top-16 left-0 z-40">
//                 <button
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     className="mt-6 focus:outline-none bg-[#1A1A1A] p-2 rounded-md"
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

//             {/* Sidebar Menu (Restored Missing Menus) */}
//             <div
//                 className={`fixed top-16 left-16 h-full w-64 bg-[#1A1A1A] shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${
//                     menuOpen ? "translate-x-0" : "-translate-x-full"
//                 }`}
//             >
//                 <ul className="space-y-4 text-lg">
//                     <li className={`cursor-pointer ${activePage === "XPO Services Dashboard" ? "text-[#00FFAA]" : "text-white"}`}
//                         onClick={() => { setActivePage("XPO Services Dashboard"); setMenuOpen(false); }}>
//                         XPO Services Dashboard
//                     </li>
//                     <li className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-[#00FFAA]" : "text-white"}`}
//                         onClick={() => { setActivePage("XPO ServiceHub"); setMenuOpen(false); }}>
//                         XPO ServiceHub
//                     </li>
//                     <li className={`cursor-pointer ${activePage === "Profile" ? "text-[#00FFAA]" : "text-white"}`}
//                         onClick={() => { setActivePage("Profile"); setMenuOpen(false); }}>
//                         Profile
//                     </li>
//                 </ul>
//             </div>

//             {/* Overlay when menu is open */}
//             {menuOpen && <div className="fixed inset-0 bg-black opacity-80 z-20" onClick={() => setMenuOpen(false)}></div>}

//             {/* Main Dashboard */}
//             <div className="flex-1 p-6 ml-16">
//                 <h1 className="text-xl font-bold mb-4">{activePage}</h1>

//                 {activePage === "XPO Services Dashboard" && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         {/* Process Runtime Section */}
//                         <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg">
//                             {/* Filters */}
//                             <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
//                                 {/* Period Filter */}
//                                 <div className="flex flex-col">
//                                     <label className="text-sm text-gray-400 mb-1">Period</label>
//                                     <select
//                                         className="bg-[#222] text-white px-3 py-2 rounded-md"
//                                         value={selectedPeriod}
//                                         onChange={(e) => setSelectedPeriod(e.target.value)}
//                                     >
//                                         <option value="Jan 1 - Jan 31">Jan 1 - Jan 31</option>
//                                         <option value="Dec 1 - Dec 31">Dec 1 - Dec 31</option>
//                                         <option value="All">All Time</option>
//                                     </select>
//                                 </div>

//                                 {/* Processes (Partner Name) Filter */}
//                                 <div className="flex flex-col">
//                                     <label className="text-sm text-gray-400 mb-1">Processes</label>
//                                     <select
//                                         className="bg-[#222] text-white px-3 py-2 rounded-md"
//                                         value={selectedProcess}
//                                         onChange={(e) => setSelectedProcess(e.target.value)}
//                                     >
//                                         <option value="All">All</option>
//                                         {[...new Set(logs.map((log) => log.partner_name))].map((partner) => (
//                                             <option key={partner} value={partner}>{partner}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             <h2 className="text-lg font-semibold mb-4 text-[#00FFAA]">Process Runtime</h2>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <ComposedChart data={filteredLogs} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                                     <XAxis dataKey="filename" tick={{ fill: "white" }} />
//                                     <YAxis tick={{ fill: "white" }} />
//                                     <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />
//                                     <Line type="monotone" dataKey="run_time" stroke="#00FFAA" strokeWidth={2} />
//                                 </ComposedChart>
//                             </ResponsiveContainer>
//                         </div>

//                         {/* Human Hours Saved Section */}
//                         <div className="bg-[#222] p-6 rounded-lg shadow-lg">
//                             <h2 className="text-lg font-semibold mb-4 text-[#FFAA00]">Human Hours Saved</h2>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <ComposedChart data={logs}>
//                                     <Line type="monotone" dataKey="human_hours_saved" stroke="#FFAA00" strokeWidth={2} />
//                                 </ComposedChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, Line, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart } from "recharts";
import pb from "@/lib/pocketbase";

interface LogData {
    filename: string;
    uuid: string;
    rows_count: number;
    run_time: number;
    human_hours_saved: number;
    partner_name: string;
    created_at: string; // Timestamp for filtering by date
}

export default function XpoDashboard() {
    const [logs, setLogs] = useState<LogData[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState("XPO Services Dashboard");

    const [selectedPeriod, setSelectedPeriod] = useState("Jan 1 - Jan 31"); // Default period
    const [selectedProcess, setSelectedProcess] = useState("All");

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

    // Function to filter logs based on selectedPeriod and selectedProcess
    useEffect(() => {
        let filteredData = logs;

        // Filter by Period (date range)
        if (selectedPeriod !== "All") {
            const [start, end] = selectedPeriod.split(" - ");
            const startDate = new Date(`2025-${start}`);
            const endDate = new Date(`2025-${end}`);
            filteredData = filteredData.filter((log) => {
                const logDate = new Date(log.created_at);
                return logDate >= startDate && logDate <= endDate;
            });
        }

        if (selectedProcess !== "All") {
            filteredData = filteredData.filter((log) => log.partner_name === selectedProcess);
        }

        setFilteredLogs(filteredData);
    }, [selectedPeriod, selectedProcess, logs]);

    return (
        <div className="relative flex h-screen text-white overflow-hidden">
            {/* Sidebar + Space for Menu Button */}
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

            <div
                className={`fixed top-16 left-16 h-full w-64 bg-al-950 shadow-lg p-6 flex flex-col z-30 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* <ul className="space-y-4 text-lg">
                    <li className={`cursor-pointer ${activePage === "XPO Services Dashboard" ? "text-[]" : "text-white"}`}
                        onClick={() => { setActivePage("XPO Services Dashboard"); setMenuOpen(false); }}>
                        XPO Services Dashboard
                    </li>
                    <li className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-[]" : "text-white"}`}
                        onClick={() => { setActivePage("XPO ServiceHub"); setMenuOpen(false); }}>
                        XPO ServiceHub
                    </li>
                    <li className={`cursor-pointer ${activePage === "Profile" ? "text-[]" : "text-white"}`}
                        onClick={() => { setActivePage("Profile"); setMenuOpen(false); }}>
                        Profile
                    </li>
                </ul> */}
                <ul className="space-y-4 text-lg">
                    <li className={`cursor-pointer ${activePage === "XPO Services Dashboard" ? "text-[]" : "text-white"}`}
                        onClick={() => { setActivePage("XPO Services Dashboard"); setMenuOpen(false); }}>
                        XPO Services Dashboard
                    </li>
                    <hr className="border-primary" /> 

                    <li className={`cursor-pointer ${activePage === "XPO ServiceHub" ? "text-[]" : "text-white"}`}
                        onClick={() => { setActivePage("XPO ServiceHub"); setMenuOpen(false); }}>
                        XPO ServiceHub
                    </li>
                    <hr className="border-primary" /> 

                    <li className={`cursor-pointer ${activePage === "Profile" ? "text-[]" : "text-white"}`}
                        onClick={() => { setActivePage("Profile"); setMenuOpen(false); }}>
                        Profile
                    </li>
                </ul>

            </div>

            {/* Overlay when menu is open */}
            {menuOpen && <div className="fixed inset-0 bg-gray-800 opacity-80 z-20" onClick={() => setMenuOpen(false)}></div>}

            {/* Main Dashboard */}
            <div className="flex-1 p-6 ml-16">
                <h1 className="text-xl font-bold mb-4">{activePage}</h1>

                {activePage === "XPO Services Dashboard" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Process Runtime Section */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            {/* Filters */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                                {/* Period Filter */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-400 mb-1">Period</label>
                                    <select
                                        className="bg-[#222] text-white px-3 py-2 rounded-md"
                                        value={selectedPeriod}
                                        onChange={(e) => setSelectedPeriod(e.target.value)}
                                    >
                                        <option value="Jan 1 - Jan 31">Jan 1 - Jan 31</option>
                                        <option value="Dec 1 - Dec 31">Dec 1 - Dec 31</option>
                                        <option value="All">All Time</option>
                                    </select>
                                </div>

                                {/* Processes (Partner Name) Filter */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-400 mb-1">Processes</label>
                                    <select
                                        className="bg-[#222] text-white px-3 py-2 rounded-md"
                                        value={selectedProcess}
                                        onChange={(e) => setSelectedProcess(e.target.value)}
                                    >
                                        <option value="All">All</option>
                                        {Array.from(new Set(logs.map((log) => log.partner_name))).map((partner) => (
                                            <option key={partner} value={partner}>{partner}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <h2 className="text-lg font-semibold mb-4">Process Runtime</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <ComposedChart data={filteredLogs}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="filename" tick={{ fill: "white" }} />
                                    <YAxis tick={{ fill: "white" }} />
                                    <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />
                                    <Line
                                        type="monotone"
                                        dataKey="run_time"
                                        stroke="#059b9a"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-end h-full ">
                            <h2 className="text-lg font-semibold mb-4">Human Hours Saved</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <ComposedChart data={logs}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="filename" tick={{ fill: "white" }} />
                                    <YAxis tick={{ fill: "white" }} />
                                    <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />
                                    <Line type="monotone" dataKey="human_hours_saved" stroke="#FFAA00" strokeWidth={2} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

