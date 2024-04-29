import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
    TbShoppingCart,
    TbCube,
    TbReport,
    TbShoppingBag,
    TbAlbum,
    TbLayoutDashboard,
    TbUser,
    TbUserCircle,
    TbSettings,
    TbSettings2,
    TbMoon,
    TbLogout2,
    TbPlus,
    TbCircleFilled,
    TbMinus,
    TbSunMoon,
} from "react-icons/tb";
import { RxDotFilled } from "react-icons/rx";
import Logo from "../../assets/image/Logo.svg";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slice";
import DarkModeToggle from "../Components/button/DarkModeToggle";

const Sidebar = () => {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    const currentRoute = useSelector((state) => state.currentRoute);

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSubProductOpen, setIsSubProductOpen] = useState(false);

    const handleProfileOpen = () => {
        if (isProfileOpen) {
            setIsProfileOpen(false);
        } else {
            setIsProfileOpen(true);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        router.get(route("logout"));
    };

    return (
        <aside className="h-screen fixed top-0 left-0 w-8 sm:w-80 bg-white dark:bg-slate-800 overflow-clip shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex w-full p-5 items-center justify-between mb-5">
                    <div className="flex items-center">
                        <motion.img src={Logo} className="w-6 mr-2" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                        <motion.p className="text-xl font-bold" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                            <span className="text-sky-500">ARGE</span>Inventory
                        </motion.p>
                    </div>
                    <motion.div whileHover={{ x: -5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <MdKeyboardArrowLeft className="text-4xl text-slate-400 cursor-pointer" />
                    </motion.div>
                </div>
                <div className="px-3 mb-5">
                    <p className="text-slate-400 dark:text-slate-500 font-bold text-md mb-2 ml-2 text-sm">OVERVIEW</p>
                    <Link href={route("dashboard")}>
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                currentRoute.route == "dashboard"
                                    ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <TbLayoutDashboard className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Dashboard</p>
                        </motion.div>
                    </Link>
                    <Link href={route("order.index")}>
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                currentRoute.route == "order"
                                    ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <TbShoppingCart className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Order</p>
                        </motion.div>
                    </Link>
                    <motion.div
                        className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                            currentRoute.route == "report"
                                ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                        }`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <TbReport className="text-2xl mr-3" />
                        <p className="font-bold text-lg">Report</p>
                    </motion.div>
                </div>
                <div className="px-3 mb-5">
                    <p className="text-slate-400 dark:text-slate-500 font-bold text-md mb-2 ml-2 text-sm">MANAGEMENT</p>
                    <motion.div className="my-1 px-1" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <div
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${
                                currentRoute.route == "product"
                                    ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                            onClick={() => {
                                isSubProductOpen ? setIsSubProductOpen(false) : setIsSubProductOpen(true);
                            }}
                        >
                            <TbCube className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Product</p>
                            {isSubProductOpen || currentRoute.subRoute ? (
                                <TbMinus className="text-xl ml-auto mr-2" />
                            ) : (
                                <TbPlus className="text-xl ml-auto mr-2" />
                            )}
                        </div>
                        <AnimatePresence>
                            {isSubProductOpen || currentRoute.route == "product" ? (
                                <motion.div
                                    className="text-slate-600 dark:text-slate-400 overflow-hidden mt-1"
                                    initial={{ height: 0 }}
                                    animate={{ height: "inherit" }}
                                    exit={{ height: 0 }}
                                >
                                    <Link
                                        href={route("category.index")}
                                        className={`flex items-center p-2 cursor-pointer rounded-lg ml-8 transition-all ${
                                            currentRoute.subRoute == "category" ? "text-sky-500" : "hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                    >
                                        <RxDotFilled className="text-2xl mr-2" />
                                        <p className="font-bold text-lg">Category</p>
                                    </Link>
                                    <Link
                                        href={route("product.index")}
                                        className={`flex items-center p-2 cursor-pointer rounded-lg ml-8 transition-all ${
                                            currentRoute.subRoute == "master" ? "text-sky-500" : "hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                    >
                                        <RxDotFilled className="text-2xl mr-2" />
                                        <p className="font-bold text-lg">Product Master</p>
                                    </Link>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </motion.div>
                    <Link href={route("supplier.index")}>
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                currentRoute.route == "supplier"
                                    ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <TbAlbum className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Supplier</p>
                        </motion.div>
                    </Link>
                    <Link href={route("customer.index")}>
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                currentRoute.route == "customer"
                                    ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <TbShoppingBag className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Customer</p>
                        </motion.div>
                    </Link>
                    {auth.isAdmin && (
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                currentRoute.route == "user"
                                    ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <TbUserCircle className="text-2xl mr-3" />
                            <p className="font-bold text-lg">User</p>
                        </motion.div>
                    )}
                </div>
            </div>
            <div>
                <div className="text-slate-600 px-3">
                    <motion.div
                        className={`flex items-center justify-between p-2 m-1 rounded-lg ${
                            isDarkMode ? "bg-sky-100 text-sky-500 dark:bg-sky-900" : "text-slate-600 dark:text-slate-400"
                        } transition-all`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center">
                            <TbSunMoon className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Theme Mode</p>
                        </div>
                        <DarkModeToggle />
                    </motion.div>
                    {auth.isAdmin && (
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                currentRoute.route == "setting"
                                    ? "bg-sky-100 text-sky-500 dark:bg-sky-900"
                                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <TbSettings2 className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Setting</p>
                        </motion.div>
                    )}
                </div>
                <div className="bg-slate-200 dark:bg-slate-700 w-auto h-0.5 mx-5"></div>
                <div className="relative m-3">
                    <AnimatePresence>
                        {isProfileOpen && (
                            <>
                                <motion.div
                                    className="bg-white dark:bg-slate-800 shadow-xl absolute p-3 bottom-20 w-full rounded-xl border-2 dark:border-slate-600 z-50"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <div className="flex items-center p-2 rounded-lg cursor-pointer transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-700">
                                        <TbSettings2 className="text-2xl mr-3" />
                                        <p className="font-bold text-lg">Profile Setting</p>
                                    </div>
                                    <div
                                        className="flex items-center p-2 rounded-lg cursor-pointer transition-all text-slate-600 dark:text-slate-400 hover:bg-red-100 hover:text-red-500 hover:dark:bg-red-900 dark:hover:bg-opacity-50"
                                        onClick={handleLogout}
                                    >
                                        <TbLogout2 className="text-2xl mr-3" />
                                        <p className="font-bold text-lg">Logout</p>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                    <div
                        className={`flex items-center p-2 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer rounded-xl transition-all ${
                            isProfileOpen && "bg-sky-100 dark:bg-sky-900"
                        }`}
                        onClick={handleProfileOpen}
                    >
                        <motion.div
                            className="w-12 h-12 bg-slate-500 rounded-xl mr-3"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                        />
                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                            <p className="font-bold text-xl">{auth.user && auth.user.name}</p>
                            <p className="text-slate-500 dark:text-slate-400">{auth.user && auth.user.email}</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
