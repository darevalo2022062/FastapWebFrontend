import { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../../../services/productApi';
import { useGetAllColorsQuery } from '../../../services/colorApi';
import { useGetAllCategoriesQuery } from '../../../services/categoryApi';
import { useGetAllModelsQuery } from '../../../services/modelApi';
import { DeseableIcon, EditIcon, EnableIcon } from '../../../components/icons';
import { RiDeleteBin7Line } from "react-icons/ri";
import { SpecificationsInput } from '../components/index.js'
import { Button, InputField, Modal, TextArea, ComboBox } from '../../../components/common';
import { ColorSelect, ModelSelect } from '../components/index.js';
import { set, useForm } from 'react-hook-form';
import useColor from '../../../hooks/useColor';
import useProduct from '../../../hooks/useProduct';
import toast from 'react-hot-toast';

const ProductForm = ({ onSubmit, defaultValues = {}, submitText, isLoading, isAdding, edit }) => {
    const { register, control, handleSubmit, formState: { errors }, reset, watch, getValues, setValue } = useForm({ defaultValues });
    const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{8}|[a-fA-F0-9]{3})$/;
    const colorHexC = watch('colorHex', '#ffffff');
    const { data: categories, isLoading: categoryLoad } = useGetAllCategoriesQuery();
    const { data: colorOptions, isLoading: colorOptionsLoad } = useGetAllColorsQuery();
    const { data: modelOptions, isLoading: modelOptionsLoad } = useGetAllModelsQuery();
    const { data: allProducts, isLoading: allProductsLoad } = useGetAllProductsQuery();
    let state = [];
    const stateSend = [{ value: true, label: 'DISPONIBLE' }, { value: false, label: 'AGOTADO' }, { value: 'MAS VENDIDO', label: 'MAS VENDIDO' }];

    if (allProductsLoad == false && allProducts?.products.length > 0) {
        let masVendidos = allProducts?.products.filter(product => product.status == 'MAS VENDIDO');
        if (masVendidos.length >= 5) {
            state = [{ value: true, label: 'DISPONIBLE' }, { value: false, label: 'AGOTADO' }];
        } else {
            state = [{ value: true, label: 'DISPONIBLE' }, { value: false, label: 'AGOTADO' }, { value: 'MAS VENDIDO', label: 'MAS VENDIDO' }];
        }
    }




    useEffect(() => {
        if (colorHexC.startsWith('#') && hexRegex.test(colorHexC)) {
            setColorHexCode(colorHexC);
        } else {
            setColorHexCode('#ffffff');
        }
    }, [colorHexC]);

    const [colorHexCode, setColorHexCode] = useState(register?.colorHex || '#000');

    const handleColorChange = (selectedValues) => {
        setValue('colores', selectedValues);
    };

    const handleModelChange = (selectedValues) => {
        setValue('modelos', selectedValues);
    }

    const handleFormSubmit = (data) => {
        onSubmit(data);
        if (isAdding) {
            reset();
        }
    };

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit(handleFormSubmit)} autoComplete='off'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <InputField
                        id='name'
                        type='text'
                        text='Título de producto'
                        name='name'
                        higth='h-12'
                        placeholder='Ingrese el título del producto'
                        colorLabel={'text-gray-500'}
                        register={register}
                        validation={{
                            required: "El título del producto es obligatorio",
                            minLength: {
                                value: 3,
                                message: "El título debe tener al menos 3 caracteres"
                            }
                        }}
                        errors={errors}
                    />
                </div>

                <SpecificationsInput control={control} register={register} errors={errors} />

                <div className="mb-4">
                    <TextArea
                        id='description'
                        type='text'
                        text='Descripción'
                        name='description'
                        placeholder='Ingrese la descripción del producto'
                        colorLabel={'text-gray-500'}
                        register={register}
                        validation={{
                            required: " ",
                            minLength: {
                                value: 3,
                                message: "La descripción debe tener al menos 3 caracteres"
                            },
                            maxLength: {
                                value: 100,
                                message: "La descripción debe tener como máximo 100 caracteres"
                            }
                        }}
                        errors={errors}
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        id='price'
                        type='number'
                        text='Precio'
                        name='price'
                        placeholder='Ingrese el precio del producto'
                        colorLabel={'text-gray-500'}
                        register={register}
                        validation={{
                            required: "El precio del producto es obligatorio",
                            min: {
                                value: 1,
                                message: "El precio debe ser mayor a 0"
                            }
                        }}
                        errors={errors}
                    />
                </div>

                <div className="mb-4 col-span-2">

                    {
                        modelOptionsLoad ? <p>Cargando...</p> : (
                            <ModelSelect
                                defaultValue={defaultValues?.model?.map(value => new Object({ "value": value._id, "label": value.name })) || []}
                                options={modelOptions?.model}
                                onChange={handleModelChange}
                                value={[] || []}
                                text="Selecciona Modelos"
                                errors={errors}
                                name="modelos"
                            />
                        )
                    }

                </div>

                <div className="mb-4 col-span-2">
                    {
                        colorOptionsLoad ? <p>Cargando...</p> : (
                            <ColorSelect
                                defaultValue={defaultValues?.color?.map(value => new Object({ "value": value._id, "label": value.colorCode })) || []}
                                options={colorOptions?.data}
                                onChange={handleColorChange}
                                value={[] || []}
                                text="Selecciona Colores"
                                errors={errors}
                                name="colores"
                            />
                        )
                    }
                </div>

                <div className="mb-4">
                    {
                        categoryLoad ? <p>Cargando...</p> : (
                            <ComboBox
                                actualSelected={defaultValues?.category?._id || null}
                                errors={errors}
                                name='Categoria'
                                optionValue='_id'
                                optionLabel='name'
                                text='Categoría'
                                register={register}
                                colorLabel={'text-gray-500'}
                                options={categories?.category}
                            />
                        )
                    }
                </div>

                <div className="mb-4">
                    <ComboBox
                        actualSelected={defaultValues?.status || ""}
                        errors={errors}
                        name='Status'
                        text='Status'
                        optionValue='label'
                        optionLabel='label'
                        register={register}
                        colorLabel={'text-gray-500'}
                        options={defaultValues?.status == 'MAS VENDIDO' ? stateSend : state}
                    />
                </div>

            </div>

            <Button type='submit' text={isLoading ? 'Cargando...' : submitText} disabled={isLoading} className="mt-4" />
        </form>

    );
};


const AddModal = ({ openModal, isModalOpen, closeModal }) => {
    const { createProduct, error, status: createStatus } = useProduct();
    useEffect(() => {
        if (createStatus.isSuccess) {
            toast.success('Se agregó correctamente el producto');
        }
        if (createStatus.isError) {
            toast.error(error?.error || error?.data?.message || error?.message || 'Error al agregar el producto. Inténtelo de nuevo.');
        }
    }, [createStatus.isSuccess, createStatus.isError, error]);

    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.Categoria);

        data?.colores?.forEach((color) => {
            formData.append('color', color);
        });
        data?.modelos?.forEach((model) => {
            formData.append('model', model);
        });

        formData.append('price', data.price);
        formData.append('specification', JSON.stringify(data?.specifications) || null);
        formData.append('status', data.Status);
        await createProduct(formData);
    };


    return (
        <div>
            <Button text={'Agregar'} onClick={openModal} />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                maxWidth="max-w-full sm:max-w-2xl"
            >
                <div className='px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 space-y-6'>
                    <ProductForm
                        onSubmit={onSubmit}
                        submitText="Agregar"
                        isLoading={createStatus.isLoading}
                        isAdding={true}
                    />
                </div>
            </Modal>
        </div>
    );
};

const EditModal = ({ element, closeModal, isModalOpen }) => {

    const { updateProduct, error, status: updateStatus } = useProduct();

    useEffect(() => {
        if (updateStatus.isSuccess) {
            toast.success('Se editó exitosamente el producto');
            closeModal();
        }
        if (updateStatus.isError) {
            toast.error(error?.error || error?.data?.message || error?.message || 'Error al editar el producto. Inténtelo de nuevo.');
        }
    }, [updateStatus.isSuccess, updateStatus.isError, error]);

    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append('id', element._id);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.Categoria);

        data?.colores?.forEach((color) => {
            formData.append('color', color);
        });
        data?.modelos?.forEach((model) => {
            formData.append('model', model);
        });

        formData.append('price', data.price);
        formData.append('specification', JSON.stringify(data?.specifications) || null);
        formData.append('status', data.Status);
        await updateProduct(formData);
    }

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-md w-full">
            <div className='px-6 py-12'>
                {console.log("Elementos Actuales: ", element)}
                <ProductForm onSubmit={onSubmit} edit={true} defaultValues={element} submitText="Guardar" isLoading={updateStatus.isLoading} />
            </div>
        </Modal>
    );
};

const DeleteModal = ({ element, closeModal, isModalOpen }) => {
    const { deleteTotalProduct, error, status: deleteStatus } = useProduct();

    useEffect(() => {
        if (deleteStatus.isSuccess) {
            toast.success('Se eliminó exitosamente el producto');
            closeModal();
        }
        if (deleteStatus.isError) {
            toast.error(error?.error || error?.data?.message || error?.message || 'Error al eliminar el producto. Inténtelo de nuevo.');
        }
    }, [deleteStatus.isSuccess, deleteStatus.isError, error, closeModal]);

    const handleDelete = async () => {
        await deleteTotalProduct(element._id);
    };

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-md w-full">
            <div className='px-6 py-12 text-center'>
                <h2 className="text-xl font-semibold mb-4">¿Estás seguro de que deseas eliminar este producto?</h2>
                <p className="mb-6">Esta acción no se puede deshacer.</p>
                <div className="flex justify-center space-x-4">
                    <Button text="Cancelar" variant='secundary' onClick={closeModal} className="bg-gray-400" />
                    <Button text="Eliminar" variant='danger' onClick={handleDelete} className="btn btn-red" />
                </div>
            </div>
        </Modal>
    );
};

const ProductsPage = () => {
    const { data, refetch, error, isError, isSuccess, isLoading } = useGetAllProductsQuery();
    const { deleteProduct, enableProduct, status: deleteStatus } = useProduct();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInfo, setSelectedInfo] = useState(null);

    useEffect(() => {
        if (!isModalOpen) {
            refetch();
        }
    }, [isModalOpen, refetch]);

    const handleInfoClick = (info) => {
        setSelectedInfo(info);
    };

    const handleClose = () => {
        setSelectedInfo(null);
    };


    const openAddModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedElement(null);
    };

    const openEditModal = (model) => {
        setSelectedElement(model);
        setIsModalOpen(true);
    };

    const openDeleteModal = (model) => {
        setSelectedElement(model);
        setIsModalOpen('edit');
    }

    const handleAction = async (id, status) => {
        const result = status == 'DESACTIVO' ? await enableProduct(id) : await deleteProduct(id);

        if (result) {
            refetch();
        } else {
            toast.error('Error al actualizar el estado del producto.');
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('modal-background')) {
            handleClose();
        }
    };

    const filteredProducts = data?.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen p-6">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    className="border border-gray-300 rounded px-3 py-2 w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AddModal closeModal={closeModal} isModalOpen={isModalOpen && !selectedElement} openModal={openAddModal} />
            </div>
            <div className="flex flex-col flex-grow bg-white shadow-lg border rounded-lg p-6 overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <div className="flex flex-col h-full justify-center items-center">
                    {isLoading && <p>Cargando productos...</p>}
                    {isError && <p>{error?.data?.message || "Error al cargar los productos. Inténtelo de nuevo."}</p>}
                    {isSuccess && (
                        <>
                            <div className="overflow-x-auto flex-grow w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-rounded-lg">
                                <table className="min-w-full">
                                    <thead className="border-b bg-white sticky top-0">
                                        <tr>
                                            <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Título de producto</th>
                                            <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Descripción</th>
                                            <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Categoría</th>
                                            <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Colores</th>
                                            <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Modelos</th>
                                            <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">price</th>
                                            <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredProducts.map((element) => (
                                            <tr key={element?._id} className="border-b">
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    {element?.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    {element?.description?.length > 20 ? (
                                                        <span className='hover:underline decoration-solid cursor-pointer' onClick={() => handleInfoClick(element?.description)}>
                                                            {element?.description.substring(0, 20)}...
                                                        </span>
                                                    ) : (
                                                        element?.description
                                                    )}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    {element?.category?.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    <span className='hover:underline decoration-solid cursor-pointer' onClick={() => handleInfoClick(element?.color.map(color => color?.colorCode).join(', '))}>
                                                        {element?.color.map(color => color?.colorCode).join(', ').substring(0, 20)}...
                                                    </span>
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    <span className='hover:underline decoration-solid cursor-pointer' onClick={() => handleInfoClick(element?.model.map(model => model?.name).join(', '))}>
                                                        {element?.model.map(model => model?.name).join(', ').substring(0, 20)}...
                                                    </span>
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    {element?.price}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    <button onClick={() => openEditModal(element)} className="text-green-500 hover:underline">
                                                        <EditIcon className="w-7 h-7" />
                                                    </button>
                                                    <button
                                                        className={`ml-4 ${element.status != 'DESACTIVO' ? 'text-blue-500' : ' text-gray-400'} hover:underline transition-all duration-300 ease-in-out`}
                                                        onClick={() => handleAction(element?._id, element.status)}
                                                    >
                                                        <span className={`${deleteStatus.isLoading && element.status != 'DESACTIVO' ? 'animate-spin' : ''}`}>
                                                            {element.status != 'DESACTIVO' ? <EnableIcon className="w-7 h-7" /> : <DeseableIcon className="w-7 h-7" />}
                                                        </span>
                                                    </button>
                                                    <button onClick={() => openDeleteModal(element)} className='text-sm text-red-600 font-light ml-4 whitespace-nowrap text-center'>
                                                        <RiDeleteBin7Line className="w-7 h-7" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            {selectedInfo && (
                                <div
                                    className="modal-background fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
                                    onClick={handleBackgroundClick}
                                >
                                    <div
                                        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 sm:mx-6 lg:mx-8"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={handleClose}
                                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                        <h3 className="text-lg font-semibold mb-4">Información Completa</h3>
                                        <div className="text-sm text-gray-700 whitespace-pre-wrap">{selectedInfo}</div>
                                    </div>
                                </div>
                            )}
                        </>
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
            {isModalOpen == 'edit' && selectedElement && (
                <DeleteModal
                    element={selectedElement}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            )}

        </div>
    );
};

export default ProductsPage;