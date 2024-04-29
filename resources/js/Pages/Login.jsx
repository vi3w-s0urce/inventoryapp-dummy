import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import LoginBackground from "../../assets/image/LoginBackground.svg";
import Layout from "../Layouts/Default";
import TextInput from "../Components/input/TextInput";
import PasswordInput from "../Components/input/PasswordInput";
import CheckboxInput from "../Components/input/CheckboxInput";
import Button from "../Components/button/Button";
import Logo from "../../assets/image/Logo.svg";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Login = ({ flash }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleLogin = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    useEffect(() => {
        if (Object.keys(errors).length) {
            setData("password", "");
        }
    }, [errors]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleRemember = (e) => {
        setData( 'remember', e.target.checked );
    };

    return (
        <Layout flash={flash}>
            <Head>
                <title>Login | ARGEInventory</title>
            </Head>
            <div className="flex w-full h-screen">
                <div className="hidden sm:flex h-full w-full p-5 items-center justify-center relative">
                    <motion.div
                        className="absolute w-3/4 h-3/4 bg-sky-200 -top-1/3 -left-1/4 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                    ></motion.div>
                    <motion.div
                        className="absolute w-2/6 h-2/6 bg-sky-200 top-1/4 -left-32 rounded-full z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                    ></motion.div>
                    <img src={Logo} className="absolute top-12 left-12 w-10 mr-2 z-10" />
                    <img src={LoginBackground} className="max-w-xl w-full z-10" />
                </div>
                <div className="bg-white w-full flex flex-col justify-center items-center p-10 sm:rounded-l-3xl shadow-md dark:bg-slate-800">
                    <div className="max-w-96 w-full">
                        <div className="mb-12 flex items-center">
                            <motion.img src={Logo} className="w-6 mr-2" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                            <motion.p className="text-xl font-bold" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                <span className="text-sky-500">ARGE</span>Inventory
                            </motion.p>
                        </div>
                        <div className="mb-5">
                            <h1 className="text-3xl font-bold mb-1">Welcome!</h1>
                            <h1 className="text-md text-slate-400">Please login to access your account.</h1>
                        </div>
                        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
                            <TextInput
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                                required={true}
                                onChange={setData}
                                login={true}
                                value={data.email}
                                error={errors.email && errors.email}
                            />
                            <PasswordInput
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                onChange={setData}
                                error={errors.password && errors.password}
                                value={data.password}
                            />
                            <div className="flex items-center gap-3">
                                <CheckboxInput name="remember" onChange={handleRemember} />
                                <span>Remember Me</span>
                            </div>
                            <Button type="submit" name="login" label="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
