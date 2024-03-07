import { useState } from "react";
import { TbAlertCircle } from "react-icons/tb";
import { motion } from "framer-motion";

const TextAreaInput = ({ name, placeholder = null, value = null, label, required = false, error = null, onChange }) => {
    const [IsInvalid, setIsInvalid] = useState(false)

    const handleChange = (e) => {
        onChange(e.target.name, e.target.value);
        setIsInvalid(false);
    }

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-1">
                {label}
                {required && name !== "email" ? <span className="text-sm text-red-500 font-bold"> *</span> : null}
            </label>
            <textarea
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                rows="3"
                className={`w-full px-3 py-2 border-2 rounded-lg outline-none focus:border-sky-300 transition-all ${IsInvalid || error ? "border-red-300 focus:border-red-300" : null}`}
                required={required}
                onChange={handleChange}
                onInvalid={() => setIsInvalid(true)}
            />
            {error && (
                <motion.div
                    className="flex gap-1 items-center text-red-400 font-bold mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <TbAlertCircle className="text-xl" />
                    <span>{error}</span>
                </motion.div>
            )}
        </div>
    );
};

export default TextAreaInput;