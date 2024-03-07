import Select from "react-select";
import makeAnimated from "react-select/animated";
import { motion } from "framer-motion";
import { TbAlertCircle } from "react-icons/tb";

const SelectInput = ({ options, label, required = false, name, error, placeholder, formatOptionLabel, value, onChange }) => {
    const animatedComponents = makeAnimated();

    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: 44,
            borderWidth: 2,
            borderColor: state.isFocused ? "#7dd3fc" : error ? "#fca5a5" : "#e5e7eb",
            borderRadius: "0.5rem",
        }),
    };

    const handleChange = (selected) => {
        onChange(name, selected.value)
    };

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name} className="mb-1">
                {label}
                {required && name !== "email" ? <span className="text-sm text-red-500 font-bold"> *</span> : null}
            </label>
            <Select
                options={options}
                components={animatedComponents}
                name={name}
                placeholder={placeholder}
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
                value={value}
                onChange={handleChange}
                required={required}
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

export default SelectInput;
