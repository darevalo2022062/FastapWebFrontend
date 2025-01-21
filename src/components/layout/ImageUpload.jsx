import React, { useState } from 'react';
import { BsFillImageFill, BsCheckCircleFill } from 'react-icons/bs';

export const ImageUpload = ({ register, errors, edit }) => {

    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleImageChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        handleImageChange(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleImageChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="mb-6">
            <label
                className="block text-customBlue text-sm font-semibold mb-2"
                htmlFor="image"
            >
                Subir Imagen
            </label>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="image"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 rounded-lg cursor-pointer bg-customWhite transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed'
                        }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                >
                    {imagePreview ? (
                        <div className='grid grid-cols-2 gap-2'>
                            <img src={imagePreview} alt="Vista previa" className="max-w-44 h-full max-h-36 object-cover" />
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <BsCheckCircleFill className="w-10 h-10 text-green-500 mb-3" />
                                <p className="text-sm text-green-600 font-semibold">
                                    Imagen cargada
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <BsFillImageFill className="w-10 h-10 text-customBlue mb-3" />
                            <p className="text-sm text-customBlue">
                                Haz clic o arrastra la imagen aquí
                            </p>
                        </div>
                    )}
                    <input
                        id="image"
                        type="file"
                        name="image"
                        className="hidden"
                        accept="image/*"
                        {
                        ...edit ? {
                            console: console.log("Edit mode"),
                            ...register("image", { onChange: (e) => handleFileSelect(e) })
                        } : {
                            console: console.log("Create mode"),
                            ...register("image", {
                                required: "La imagen es obligatoria", // Este campo es opcional, según tus validaciones
                                onChange: (e) => handleFileSelect(e) // Asegúrate de que el archivo se maneje aquí
                            })
                        }

                        }
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </label>
            </div>
        </div>
    );
};
