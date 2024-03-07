import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoute } from "../../Redux/slice";
import Layout from "../../Layouts/Default";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { TbPlus } from "react-icons/tb";
import { MdKeyboardArrowLeft } from "react-icons/md";
import TextInput from "../../Components/input/TextInput";
import TextAreaInput from "../../Components/input/TextAreaInput";
import SelectInput from "../../Components/input/SelectInput";

const ProductCategoryEdit = ({ flash }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentRoute({ route: "product", subRoute: "category" }));
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        color: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('category.store'))
    }

    const handleReset = () => {
        setData({ name: "", description: "", color: null });
    };

    const categoryColorOptions = [
        { value: "Red", label: "Red" },
        { value: "Green", label: "Green" },
        { value: "Blue", label: "Blue" },
        { value: "Yellow", label: "Yellow" },
        { value: "Purple", label: "Purple" },
        { value: "Cyan", label: "Cyan" },
    ];

    const categoryColorFormatSelect = ({ label, value }) => (
        <div
            className={`flex items-center ${
                value == "Red"
                    ? "text-red-500"
                    : value == "Green"
                    ? "text-green-500"
                    : value == "Blue"
                    ? "text-blue-500"
                    : value == "Yellow"
                    ? "text-yellow-500"
                    : value == "Purple"
                    ? "text-purple-500"
                    : value == "Cyan"
                    ? "text-cyan-500"
                    : null
            }`}
        >
            <div
                className={`mr-3 h-5 w-5 rounded-full ${
                    value == "Red"
                        ? "bg-red-500"
                        : value == "Green"
                        ? "bg-green-500"
                        : value == "Blue"
                        ? "bg-blue-500"
                        : value == "Yellow"
                        ? "bg-yellow-500"
                        : value == "Purple"
                        ? "bg-purple-500"
                        : value == "Cyan"
                        ? "bg-cyan-500"
                        : null
                } `}
            ></div>
            <p className="font-bold">{label}</p>
        </div>
    );

    return (
        <Layout flash={flash}>
            <Head>
                <title>Edit Category | ARGEInventory</title>
            </Head>
            <Sidebar />
            <section className="ml-80 p-8 relative">
                <div className="mb-5">
                    <h1 className="text-3xl font-bold">Product Category</h1>
                    <p className="text-slate-500 text-lg">Add New Product Category</p>
                </div>
                <div className="bg-white shadow-lg p-5 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-xl font-bold">Create Product Category</p>
                        <Link
                            href={route("category.index")}
                            className="flex items-center gap-2 bg-slate-200 text-slate-500 px-3 py-2 rounded-lg font-bold"
                        >
                            <MdKeyboardArrowLeft className="font-bold text-xl" /> Back
                        </Link>
                    </div>
                    <div className="flex justify-center w-full">
                        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-3">
                            <div className="flex w-full gap-3">
                                <TextInput
                                    type="text"
                                    name="name"
                                    label="Name"
                                    placeholder="Enter Category Name"
                                    required={true}
                                    onChange={setData}
                                    value={data.name}
                                    error={errors.name && errors.name}
                                />
                                <SelectInput
                                    name="color"
                                    label="Color"
                                    placeholder="Select Category Color"
                                    options={categoryColorOptions}
                                    formatOptionLabel={categoryColorFormatSelect}
                                    value={data.value}
                                    onChange={setData}
                                    error={errors.color && errors.color}
                                    required={true}
                                />
                            </div>
                            <TextAreaInput
                                name="description"
                                label="Description"
                                placeholder="Enter Category Description"
                                required={true}
                                onChange={setData}
                                value={data.description}
                                error={errors.description && errors.description}
                            />
                            <div className="flex items-center gap-3 justify-end mt-3">
                                <button type="reset" onClick={handleReset} className="bg-red-500 text-white px-5 py-2 rounded-lg font-bold">
                                    Reset
                                </button>
                                <button type="submit" className="bg-sky-500 text-white px-5 py-2 rounded-lg font-bold">
                                    Edit Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ProductCategoryEdit;