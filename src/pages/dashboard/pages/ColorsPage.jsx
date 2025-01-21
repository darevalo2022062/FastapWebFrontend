import { useEffect, useState } from 'react';
import { useGetAllColorsQuery } from '../../../services/colorApi';
import { DeseableIcon, EditIcon, EnableIcon } from '../../../components/icons';
import { RiDeleteBin7Line } from "react-icons/ri";
import { ImageUpload } from '../../../components/layout/ImageUpload';
import { Button, InputField, Modal, } from '../../../components/common';
import { set, useForm } from 'react-hook-form';
import useColor from '../../../hooks/useColor';
import toast from 'react-hot-toast';

const ColorForm = ({ onSubmit, defaultValues = {}, submitText, isLoading, isAdding, edit }) => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ defaultValues });
    const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{8}|[a-fA-F0-9]{3})$/;
    const colorHexC = watch('colorHex', '#ffffff');

    useEffect(() => {
        if (colorHexC.startsWith('#') && hexRegex.test(colorHexC)) {
            setColorHexCode(colorHexC);
        } else {
            setColorHexCode('#ffffff');
        }
    }, [colorHexC]);

    const [colorHexCode, setColorHexCode] = useState(register.colorHex || '#000');
    console.log("ColorHec ", register.colorHex);

    const handleFormSubmit = (data) => {
        onSubmit(data);
        if (isAdding) {
            reset();
        }
    };

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit(handleFormSubmit)} autoComplete='off'>
            <div className='mb-3'>
                <InputField
                    id='colorCode'
                    type='text'
                    text='Código de color'
                    name='colorCode'
                    placeholder='Ingrese el código de color'
                    colorLabel={'text-gray-500'}
                    register={register}
                    validation={{
                        required: "Código de color es obligatorio",
                        minLength: {
                            value: 3,
                            message: "El código de color debe tener al menos 3 caracteres"
                        }
                    }}
                    errors={errors}
                />
            </div>
            <div className="mb-3 flex justify-between items-center">
                <div className="min-h-[56px]"> {/* Ajusta este valor según el espacio que necesitas */}
                    <InputField
                        id='colorHex'
                        type='text'
                        text='Código Hexadecimal'
                        name='colorHex'
                        placeholder='Ingrese el código Hexadecimal'
                        colorLabel={'text-gray-500'}
                        wheigth='w-80'
                        register={register}
                        validation={{
                            required: " ",
                            minLength: {
                                value: 3,
                                message: ""
                            }
                        }}
                        errors={errors}
                    />
                </div>
                <div style={{ backgroundColor: colorHexCode }} className="border border-gray-400 rounded-full w-10 h-10 ml-2 pl-9 self-end" />
            </div>

            <ImageUpload register={register} errors={errors} edit={edit} />

            <Button type='submit' text={isLoading ? 'Cargando...' : submitText} disabled={isLoading} />
        </form>
    );
};


const AddModal = ({ openModal, isModalOpen, closeModal }) => {
    const { createColor, error, status: createStatus } = useColor();

    useEffect(() => {
        if (createStatus.isSuccess) {
            toast.success('Se agregó correctamente el color');
        }
        if (createStatus.isError) {
            toast.error(error?.error || error?.data?.message || error?.message || 'Error al agregar el color. Inténtelo de nuevo.');
        }
    }, [createStatus.isSuccess, createStatus.isError, error]);

    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append('colorCode', data.colorCode);
        formData.append('colorHex', data.colorHex);
        formData.append('image', data.image[0]);  // Asegúrate de que el archivo se maneje correctamente

        console.log("Data-IMG: ", data.image[0]);  // Esto debería mostrar el archivo seleccionado
        console.log("Data: ", data);
        console.log("Data-IMG: ", data.image[0]);

        await createColor(formData);
    };

    return (
        <div>
            <Button text={'Agregar'} onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-md w-full">
                <div className='px-6 py-12'>
                    <ColorForm onSubmit={onSubmit} submitText="Agregar" isLoading={createStatus.isLoading} isAdding={true} />
                </div>
            </Modal>
        </div>
    );
};

const EditModal = ({ element, closeModal, isModalOpen }) => {
    console.log("element ", element);
    console.log("isModalOpen ", isModalOpen);
    console.log("closeModal ", closeModal);
    const { updateColor, error, status: updateStatus } = useColor();

    useEffect(() => {
        if (updateStatus.isSuccess) {
            toast.success('Se editó exitosamente el elemento');
        }
        if (updateStatus.isError) {
            toast.error(error?.error || error?.data?.message || error?.message || 'Error al editar el modelo. Inténtelo de nuevo.');
        }
    }, [updateStatus.isSuccess, updateStatus.isError, error]);

    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append('id', element._id);
        formData.append('colorCode', data.colorCode);
        formData.append('colorHex', data.colorHex);
        formData.append('image', data.image[0]);

        // Asegúrate de que el archivo se maneje correctamente
        await updateColor(formData);
    }

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-md w-full">
            <div className='px-6 py-12'>
                <ColorForm onSubmit={onSubmit} edit={true} defaultValues={element} submitText="Guardar" isLoading={updateStatus.isLoading} />
            </div>
        </Modal>
    );
};


const ColorsPage = () => {
    const { data, refetch, error, isError, isSuccess, isLoading } = useGetAllColorsQuery();
    const { deleteColor, deleteTotalColor, enableColor, status: deleteStatus } = useColor();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);
    //const [deleteElement, setDeleteElement] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!isModalOpen) {
            refetch();
        }
    }, [isModalOpen, refetch]);

    const openAddModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedElement(null);
    };

    const openEditModal = (model) => {
        setSelectedElement(model);
        setIsModalOpen(true);
    };



    const handleAction = async (id, status) => {
        const result = status ? await deleteColor(id) : await enableColor(id);
        if (result) {
            refetch();
        } else {
            toast.error('Error al actualizar el estado del modelo.');
        }
    };

    const filteredColor = data?.data.filter(color =>
        color.colorCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen p-6">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar color..."
                    className="border border-gray-300 rounded px-3 py-2 w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AddModal closeModal={closeModal} isModalOpen={isModalOpen && !selectedElement} openModal={openAddModal} />
            </div>
            <div className="flex flex-col flex-grow bg-white shadow-lg border rounded-lg p-6 overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <div className="flex flex-col h-full justify-center items-center">
                    {isLoading && <p>Cargando categorías...</p>}
                    {isError && <p>{error?.data?.message || "Error al cargar las categorías. Inténtelo de nuevo."}</p>}
                    {isSuccess && (
                        <div className="overflow-x-auto flex-grow w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-rounded-lg">
                            <table className="min-w-full">
                                <thead className="border-b bg-white sticky top-0">
                                    <tr>
                                        <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Código de color</th>
                                        <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Código hexadecimal</th>
                                        <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Imagen</th>
                                        <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredColor.map((element) => (
                                        <tr key={element._id} className="border-b">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{element.colorCode}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{element.colorHex}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                <img src={element.image} className='h-7 lg:h-20 w-7 lg:w-20 object-cover mx-auto rounded-sm' />
                                            </td>

                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                <button onClick={() => openEditModal(element)} className="text-green-500 hover:underline">
                                                    <EditIcon className="w-7 h-7" />
                                                </button>
                                                <button
                                                    className={`ml-4 ${element.status ? 'text-blue-500' : ' text-gray-400'} hover:underline transition-all duration-300 ease-in-out`}
                                                    onClick={() => handleAction(element._id, element.status)}
                                                >
                                                    <span className={`${deleteStatus.isLoading && element.status ? 'animate-spin' : ''}`}>
                                                        {element.status ? <EnableIcon className="w-7 h-7" /> : <DeseableIcon className="w-7 h-7" />}
                                                    </span>
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen == true && selectedElement && (
                <EditModal
                    element={selectedElement}
                    isModalOpen={isModalOpen && selectedElement}
                    closeModal={closeModal}
                />
            )}
            {isModalOpen=='edit' && selectedElement && (
                <DeleteModal
                    element={selectedElement}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            )}

        </div>
    );
};

export default ColorsPage;
