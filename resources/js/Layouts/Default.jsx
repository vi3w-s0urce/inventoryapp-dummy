import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Layout = ({ children, flash = false }) => {
    const darkMode = useSelector((state) => state.darkMode);

    useEffect(() => {
        const { success, error, info } = flash;
        if (success) toast.success(success);
        if (error) toast.error(error);
        if (info) toast(info);
    }, [flash]);

    return (
        <main className={`min-h-screen bg-slate-100 text-slate-900 ${darkMode && "dark"} dark:bg-slate-900 dark:text-slate-200`} id="modal-root">
            <Toaster toastOptions={{ className: 'dark:!bg-slate-800 dark:!text-slate-200' }} />
            <motion.div
                className="bg-sky-200 w-[500px] h-[500px] absolute left-48 -top-96 rounded-full bg-opacity-50 dark:bg-sky-900"
                initial={{ y: -80 }}
                animate={{ y: 0 }}
            />
            {children}
        </main>
    );
};

export default Layout;
