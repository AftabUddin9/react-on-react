import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Card, Input, Typography, Select, Option, Button } from "@material-tailwind/react";


const Form = () => {

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
        unregister,
        reset,
    } = useForm({
        mode: "onTouched",
    });

    const domain = watch("domain");

    // * Remove from FORM
    useEffect(() => {
        if (domain !== "others") {
            unregister("otherdomainname");
        }
    }, [domain, unregister]);



    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        } else {
            setImagePreview(null);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

    const removeImage = () => {
        setImagePreview(null);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        selectedFile && formData.append('picture', selectedFile)
        console.log(formData);
    };

    return (
        <div className="h-screen grid place-items-center bg-gray-50">
            <Card color="transparent" shadow={true} className="p-7 bg-white">
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <br />
                <form className="mb-4 w-[500px] grid grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Controller
                            name="Username"
                            rules={{
                                required: "Username is Required",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters required",
                                },
                            }}
                            control={control}
                            render={({ field }) => (
                                <Input size="lg" {...field} label="Username" error={Boolean(errors?.Username?.message)} />
                            )}
                        />
                        {errors?.Username?.message && (
                            <span className="error-text">{errors?.Username?.message}</span>
                        )}
                    </div>
                    <div>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email ID is Required",
                                pattern: {
                                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                    message: "Email ID is invaild",
                                },
                            }}
                            render={({ field }) => (
                                <Input type="email" size="lg" {...field} label="Email ID" error={Boolean(errors?.email?.message)} />
                            )}
                        />
                        {errors?.email?.message && (
                            <span className="error-text">{errors?.email?.message}</span>
                        )}
                    </div>
                    <div>
                        <Controller
                            name="domain"
                            control={control}
                            rules={{
                                required: "Domain is Required",
                            }}
                            render={({ field }) => (
                                <Select label="Select Domain" {...field} error={Boolean(errors?.domain?.message)}>
                                    <Option value="designer">Designer</Option>
                                    <Option value="dev">Developer</Option>
                                    <Option value="tester">Tester</Option>
                                    <Option value="others">Others</Option>
                                </Select>
                            )}
                        />
                        {errors?.domain?.message && (
                            <span className="error-text">{errors?.domain?.message}</span>
                        )}
                    </div>
                    {domain === "others" && (
                        <div>
                            <Controller
                                name="otherdomainname"
                                control={control}
                                rules={{
                                    required: "Domain Name is Required",
                                }}
                                render={({ field }) => (
                                    <Input {...field} size="lg" label="Type Here" error={Boolean(errors?.otherdomainname?.message)} />
                                )}
                            />
                            {errors?.otherdomainname?.message && (
                                <span className="error-text">
                                    {errors?.otherdomainname?.message}
                                </span>
                            )}
                        </div>
                    )}
                    <div>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is Required",
                                pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                                    message: "Password not strong enough",
                                },
                            }}
                            render={({ field }) => (
                                <Input type="password" {...field} size="lg" label="Password" error={Boolean(errors?.password?.message)} />
                            )}
                        />
                        {errors?.password?.message && (
                            <span className="error-text">{errors?.password?.message}</span>
                        )}
                    </div>
                    <div>
                        <Controller
                            name="confirmpassword"
                            control={control}
                            rules={{
                                required: "Confirm Password is Required",
                                validate: (value) =>
                                    getValues("password") === value || "Passwords do not match",
                            }}
                            render={({ field }) => (
                                <Input type="password" {...field} size="lg" label="Confirm Password" error={Boolean(errors?.confirmpassword?.message)} />
                            )}
                        />
                        {errors?.confirmpassword?.message && (
                            <span className="error-text">
                                {errors?.confirmpassword?.message}
                            </span>
                        )}
                    </div>
                    <div className="col-span-2">
                        <div {...getRootProps()} className="p-4 w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer flex items-center justify-center">
                            <input name="picture" {...getInputProps()} />
                            {imagePreview ? (
                                <div className="relative w-[200px] h-fit">
                                    <img src={imagePreview} alt="Preview" className="max-h-[180px] w-auto h-auto object-cover" />
                                    <button type="button" onClick={removeImage} className="absolute top-0 right-0  bg-red-500 text-black rounded-full px-2 py-[0.8] transform translate-x-1/2 -translate-y-1/2">
                                        &times;
                                    </button>
                                </div>
                            ) : (
                                <p>Drag & drop an image here, or click to select one!</p>
                            )}
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-3">
                        <Button type="reset" variant="outlined" onClick={() => { reset(); setImagePreview(null); }}>
                            Reset
                        </Button>
                        <Button type="submit">Create Account</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Form;