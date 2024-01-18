import { motion } from "framer-motion";
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
} from "react-icons/tb";
import Logo from "../../assets/image/Logo.svg";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slice/authSlice";

const Sidebar = ({ page }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [isActive, setIsActive] = useState(page);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);


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
        <aside className="h-screen fixed top-0 left-0 w-8 sm:w-80 bg-white overflow-clip shadow-lg flex flex-col justify-between">
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
                    <p className="text-slate-400 font-bold text-md mb-2 ml-2 text-sm">OVERVIEW</p>
                    <motion.div
                        className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                            isActive == "dashboard" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
                        }`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <TbLayoutDashboard className="text-2xl mr-3" />
                        <p className="font-bold text-lg">Dashboard</p>
                    </motion.div>
                    <motion.div
                        className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                            isActive == "order" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
                        }`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <TbShoppingCart className="text-2xl mr-3" />
                        <p className="font-bold text-lg">Order</p>
                    </motion.div>
                    <motion.div
                        className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                            isActive == "report" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
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
                    <p className="text-slate-400 font-bold text-md mb-2 ml-2 text-sm">MANAGEMENT</p>
                    <motion.div
                        className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                            isActive == "product" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
                        }`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <TbCube className="text-2xl mr-3" />
                        <p className="font-bold text-lg">Product</p>
                    </motion.div>
                    <motion.div
                        className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                            isActive == "supplier" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
                        }`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <TbAlbum className="text-2xl mr-3" />
                        <p className="font-bold text-lg">Supplier</p>
                    </motion.div>
                    <motion.div
                        className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                            isActive == "customer" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
                        }`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <TbShoppingBag className="text-2xl mr-3" />
                        <p className="font-bold text-lg">Customer</p>
                    </motion.div>
                    {auth.isAdmin && (
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                isActive == "user" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
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
                        className={`flex items-center group/darkmode p-2 m-1 rounded-lg cursor-pointer hover:bg-gradient-to-l hover:from-sky-700 hover:to-slate-700 hover:text-white ${
                            isDarkMode ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
                        } transition-all`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <TbMoon className="text-2xl mr-3 group/darkmode-hover:text-white" />
                        <p className="font-bold text-lg group/darkmode-hover:text-white">Dark Mode</p>
                    </motion.div>
                    {auth.isAdmin && (
                        <motion.div
                            className={`flex items-center p-2 m-1 rounded-lg cursor-pointer transition-all ${
                                isActive == "setting" ? "bg-sky-100 text-sky-500" : "text-slate-600 hover:bg-slate-200"
                            }`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <TbSettings2 className="text-2xl mr-3" />
                            <p className="font-bold text-lg">Setting</p>
                        </motion.div>
                    )}
                </div>
                <div className="bg-slate-200 w-auto h-0.5 mx-5"></div>
                <div className="relative m-3">
                    {isProfileOpen && (
                        <>
                            <motion.div
                                className="bg-white shadow-xl absolute p-3 bottom-20 w-full rounded-xl border-2"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex items-center p-2 rounded-lg cursor-pointer transition-all text-slate-600 hover:bg-slate-200">
                                    <TbSettings2 className="text-2xl mr-3" />
                                    <p className="font-bold text-lg">Profile Setting</p>
                                </div>
                                <div
                                    className="flex items-center p-2 rounded-lg cursor-pointer transition-all text-slate-600 hover:bg-red-100 hover:text-red-500"
                                    onClick={handleLogout}
                                >
                                    <TbLogout2 className="text-2xl mr-3" />
                                    <p className="font-bold text-lg">Logout</p>
                                </div>
                            </motion.div>
                        </>
                    )}
                    <div
                        className={`flex items-center p-2 hover:bg-slate-200 cursor-pointer rounded-xl transition-all ${isProfileOpen && "bg-sky-100"}`}
                        onClick={handleProfileOpen}
                    >
                        <motion.div
                            className="w-12 h-12 bg-slate-500 rounded-xl mr-3"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                        />
                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                            <p className="font-bold text-xl">{auth.user && auth.user.name}</p>
                            <p className="text-slate-500">{auth.user && auth.user.email}</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
