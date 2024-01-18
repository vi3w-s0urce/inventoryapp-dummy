import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Layout = ({ children, flash = false }) => {
    useEffect(() => {
        const { success, error, info } = flash;
        if (success) toast.success(success);
        if (error) toast.error(error);
        if (info) toast(info);
    }, [flash]);

    return (
        <>
            <main className="min-h-screen bg-slate-100 text-slate-900" id="modal-root">
                <Toaster />
                {children}
            </main>
        </> 
    );
};

export default Layout;
