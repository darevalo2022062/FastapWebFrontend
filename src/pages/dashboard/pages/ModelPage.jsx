import { useEffect, useState } from 'react';
import { useGetAllModelsQuery } from '../../../services/modelApi';
import { DeseableIcon, EditIcon, EnableIcon } from '../../../components/icons';
import { Button, InputField, Modal } from '../../../components/common';
import { useForm } from 'react-hook-form';
import useModel from '../../../hooks/useModel';
import toast from 'react-hot-toast';

const ModelForm = ({ onSubmit, defaultValues = {}, submitText, isLoading, isAdding }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });

    const handleFormSubmit = (data) => {
        onSubmit(data);
        if (isAdding) {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='mb-5'>
                <InputField
                    id='name'
                    type='text'
                    text='Nombre del modelo'
                    name='name'
                    placeholder='Ingrese el modelo'
                    colorLabel={'text-gray-500'}
                    register={register}
                    validation={{
                        required: "El nombre del modelo es obligatorio",
                        minLength: {
                            value: 5,
                            message: "El nombre del modelo debe tener al menos 5 caracteres"
                        }
                    }}
                    errors={errors}
                />
            </div>
            <Button type='submit' text={isLoading ? 'Cargando...' : submitText} disabled={isLoading} />
        </form>
    );
};

const AddModal = ({ openModal, isModalOpen, closeModal }) => {
    const { createModel, error, status: createStatus } = useModel();

    useEffect(() => {
        if (createStatus.isSuccess) {
            toast.success('Se agregó correctamente el modelo');
        }
        if (createStatus.isError) {
            toast.error(error?.error || error?.data?.message || error?.message || 'Error al agregar el modelo. Inténtelo de nuevo.');
        }
    }, [createStatus.isSuccess, createStatus.isError, error]);

    const onSubmit = async (data) => await createModel(data);

    return (
        <div>
            <Button text={'Agregar'} onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-sm w-full">
                <div className='px-6 py-12'>
                    <ModelForm onSubmit={onSubmit} submitText="Agregar" isLoading={createStatus.isLoading} isAdding={true} />
                </div>
            </Modal>
        </div>
    );
};

const EditModal = ({ model, closeModal, isModalOpen }) => {
    const { updateModel, error, status: updateStatus } = useModel();

    useEffect(() => {
        if (updateStatus.isSuccess) {
            toast.success('Se editó exitosamente el modelo');
        }
        if (updateStatus.isError) {
            toast.error(error?.error || error?.data?.message || error?.message || 'Error al editar el modelo. Inténtelo de nuevo.');
        }
    }, [updateStatus.isSuccess, updateStatus.isError, error]);

    const onSubmit = async (data) => await updateModel(model._id, data);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-sm w-full">
            <div className='px-6 py-12'>
                <ModelForm onSubmit={onSubmit} defaultValues={model} submitText="Guardar" isLoading={updateStatus.isLoading} />
            </div>
        </Modal>
    );
};

const ModelPage = () => {
    const { data, refetch, error, isError, isSuccess, isLoading } = useGetAllModelsQuery();
    const { deleteModel, enableModel, status: deleteStatus } = useModel();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el texto de búsqueda

    useEffect(() => {
        if (!isModalOpen) {
            refetch();
        }
    }, [isModalOpen, refetch]);

    const openAddModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedModel(null);
    };

    const openEditModal = (model) => {
        setSelectedModel(model);
        setIsModalOpen(true);
    };

    const handleAction = async (id, status) => {
        const result = status ? await deleteModel(id) : await enableModel(id);
        if (result) {
            refetch();
        } else {
            toast.error('Error al actualizar el estado del modelo.');
        }
    };

    const filteredModels = data?.model.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen p-6">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar modelos..."
                    className="border border-gray-300 rounded px-3 py-2 w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AddModal closeModal={closeModal} isModalOpen={isModalOpen && !selectedModel} openModal={openAddModal} />
            </div>
            <div className="flex flex-col flex-grow bg-white shadow-lg border rounded-lg p-6 overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <div className="flex flex-col h-full justify-center items-center">
                    {isLoading && <p>Cargando modelos...</p>}
                    {isError && <p>{error?.data?.message || "Error al cargar los modelos. Inténtelo de nuevo."}</p>}
                    {isSuccess && (
                        <div className="overflow-x-auto flex-grow w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-rounded-lg">
                            <table className="min-w-full">
                                <thead className="border-b bg-white sticky top-0">
                                    <tr>
                                        <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Nombre del modelo</th>
                                        <th scope="col" className="text-center text-sm font-semibold text-gray-900 px-6 py-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredModels.map((model) => (
                                        <tr key={model._id} className="border-b">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{model.name}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                <button onClick={() => openEditModal(model)} className="text-green-500 hover:underline">
                                                    <EditIcon className="w-7 h-7" />
                                                </button>
                                                <button
                                                    className={`ml-4 ${model.status ? 'text-blue-500' : ' text-gray-400'} hover:underline transition-all duration-300 ease-in-out`}
                                                    onClick={() => handleAction(model._id, model.status)}
                                                >
                                                    <span className={`${deleteStatus.isLoading && model.status ? 'animate-spin' : ''}`}>
                                                        {model.status ? <EnableIcon className="w-7 h-7" /> : <DeseableIcon className="w-7 h-7" />}
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
            {selectedModel && (
                <EditModal
                    model={selectedModel}
                    isModalOpen={isModalOpen && selectedModel}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default ModelPage;
