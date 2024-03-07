import { useEffect, useState } from "react";
import { TbAlertCircle } from "react-icons/tb";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const NumberInput = ({
    name,
    placeholder = null,
    value = null,
    label = null,
    required = false,
    error = null,
    arrow = true,
    onChange,
    type = "number",
}) => {
    const [IsInvalid, setIsInvalid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    useEffect(() => {
        console.log(phoneNumber);
    }, [phoneNumber])

    const handleChange = (e) => {
        onChange(e.target.name, e.target.value);
        setIsInvalid(false);
    };

    if (type == "number") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={name} className="mb-1">
                    {label}
                    {required ? <span className="text-sm text-red-500 font-bold"> *</span> : null}
                </label>
                <input
                    type="number"
                    name={name}
                    id={name}
                    value={value}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 border-2 rounded-lg outline-none focus:border-sky-300 transition-all ${
                        !arrow &&
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    } ${IsInvalid || error ? "border-red-300 focus:border-red-300" : null}`}
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
    } else if (type == "phone") {
        return (
            <div className="flex flex-col w-full">
                <label htmlFor={name} className="mb-1">
                    {label}
                    {required ? <span className="text-sm text-red-500 font-bold"> *</span> : null}
                </label>
                <PhoneInput
                    country={"id"}
                    inputProps={{
                        name: name,
                        required: true,
                    }}
                    inputClass="!py-2 !w-full !border-2 !rounded-lg !outline-none focus:!border-sky-300 !transition-all !text-base !h-fit"
                    buttonClass="!border-b-2 !border-t-2 !border-l-2 !rounded-s-lg hover:!bg-red"
                    masks={{ id: "... .... .... .." }}
                    enableSearch={true}
                    disableSearchIcon={true}
                    value={phoneNumber}
                    onChange={name => setPhoneNumber({ name })}
                />
            </div>
        );
    }
};

export default NumberInput;
