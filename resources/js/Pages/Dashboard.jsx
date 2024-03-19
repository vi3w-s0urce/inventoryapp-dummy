import { Head } from "@inertiajs/react";
import { TbBox, TbBoxSeam, TbShoppingBag, TbShoppingCart } from "react-icons/tb";
import { motion } from "framer-motion";
import { Doughnut, Line } from "react-chartjs-2";
import Layout from "../Layouts/Default";
import Sidebar from "../Layouts/Sidebar";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip, Filler, ArcElement } from "chart.js";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser, setCurrentRoute } from "../Redux/slice";

const Dashboard = ({ flash, user, isAdmin }) => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.darkMode);

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

    useEffect(() => {
        dispatch(setCurrentRoute({ route: "dashboard" }));
        dispatch(setUser({ user, isAdmin }));
    }, []);

    const lineChartRef = useRef(null);

    var label_monhtly = [];
    var data_monthly = [];
    var data_monthly2 = [];

    for (let i = 1; i <= 31; i++) {
        label_monhtly.push(i);
        data_monthly.push(Math.floor(Math.random() * 100));
        data_monthly2.push(Math.floor(Math.random() * 100));
    }

    const dataStocksChart = {
        labels: label_monhtly,
        datasets: [
            {
                label: "Stock In",
                data: data_monthly,
                borderColor: "#0ea5e9",
                borderWidth: 2,
                fill: false,
                // tension: 0.5,
            },
            {
                label: "Stock Out",
                data: data_monthly2,
                borderColor: "#ef4444",
                borderWidth: 2,
                fill: false,
                // tension: 0.5,
            },
        ],
    };

    const dataOrdersChart = {
        labels: ["Completed", "Waiting", "Canceled"],
        datasets: [
            {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: ["#22c55e", "#0ea5e9", "#ef4444"],
                hoverOffset: 12,
            },
        ],
    };

    const stocksChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    color: "#e2e8f0",
                    z: -10,
                },
            },
            y: {
                grid: {
                    color: "#e2e8f0",
                    z: -10,
                },
            },
        },
    };

    const ordersChartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        borderColor: "white",
    };

    if (darkMode) {
        stocksChartOptions.scales.x.grid.color = "#334155";
        stocksChartOptions.scales.y.grid.color = "#334155";
        ordersChartOptions.borderColor = "#1e293b";
    }

    return (
        <Layout flash={flash}>
            <Head>
                <title>Dashboard | ARGEInventory</title>
            </Head>
            <Sidebar />
            <section className="ml-80 p-8 relative">
                <div className="mb-5">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Inventory Statistics</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-5">
                    <motion.div
                        className="bg-white dark:bg-slate-800 shadow-lg rounded-xl flex items-center p-5 gap-3 col-span-2"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="p-2 bg-sky-100 dark:bg-sky-500 dark:bg-opacity-20 text-sky-500 rounded-xl mr-2">
                            <TbShoppingCart className="text-6xl" />
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Orders</p>
                            <p className="text-4xl font-bold">9</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-white dark:bg-slate-800 shadow-lg rounded-xl flex items-center p-5 gap-3 col-span-2"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="p-2 bg-sky-100 dark:bg-sky-500 dark:bg-opacity-20 text-sky-500 rounded-xl mr-2">
                            <TbBox className="text-6xl" />
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Product</p>
                            <p className="text-4xl font-bold">212</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-white dark:bg-slate-800 shadow-lg rounded-xl flex items-center p-5 gap-3 col-span-2"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="p-2 bg-sky-100 dark:bg-sky-500 dark:bg-opacity-20 text-sky-500 rounded-xl mr-2">
                            <TbBoxSeam className="text-6xl" />
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Stocks</p>
                            <p className="text-4xl font-bold">1341</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-white dark:bg-slate-800 shadow-lg rounded-xl flex items-center p-5 gap-3 col-span-2"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="p-2 bg-sky-100 dark:bg-sky-500 dark:bg-opacity-20 text-sky-500 rounded-xl mr-2">
                            <TbShoppingBag className="text-6xl" />
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Customers</p>
                            <p className="text-4xl font-bold">32</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-5 gap-3 col-span-5"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between mb-5">
                            <p className="text-xl font-bold">Stocks Analystic</p>
                            <select>
                                <option>Weekly</option>
                                <option>Daily</option>
                            </select>
                        </div>
                        <div>
                            <div className="flex justify-center gap-5 mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full w-4 h-4 bg-sky-500"></div>
                                    <p className="font-bold text-sky-500">Stock In</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full w-4 h-4 bg-red-500"></div>
                                    <p className="font-bold text-red-500">Stock Out</p>
                                </div>
                            </div>
                            <Line data={dataStocksChart} options={stocksChartOptions} ref={lineChartRef} />
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-5 gap-3 col-span-3"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-between mb-5">
                            <p className="text-xl font-bold">Orders Analystic</p>
                        </div>
                        <div className="flex justify-center mb-5 flex-wrap">
                            <div>
                                <h1 className="text-2xl font-bold text-green-500">300</h1>
                                <div className="flex items-center gap-2 mr-5">
                                    <div className="rounded-full w-4 h-4 bg-green-500"></div>
                                    <p className="font-bold text-slate-500 dark:text-slate-400">Completed</p>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-sky-500">50</h1>
                                <div className="flex items-center gap-2 mr-5">
                                    <div className="rounded-full w-4 h-4 bg-sky-500"></div>
                                    <p className="font-bold text-slate-500 dark:text-slate-400">Waiting</p>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-red-500">100</h1>
                                <div className="flex items-center gap-2 mr-5">
                                    <div className="rounded-full w-4 h-4 bg-red-500"></div>
                                    <p className="font-bold text-slate-500 dark:text-slate-400">Canceled</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Doughnut data={dataOrdersChart} options={ordersChartOptions} className="w-96 h-96" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Dashboard;
