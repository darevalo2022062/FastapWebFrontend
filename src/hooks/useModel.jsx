import {
    useCreateModelMutation,
    useUpdateModelMutation,
    useDeleteModelMutation,
    useEnableModelMutation
} from '../services/modelApi';
import useAsyncAction from '../utils/useAsyncAction';

const useModel = () => {
    const { handleAction, status, response, error } = useAsyncAction();
    const [createModel] = useCreateModelMutation();
    const [updateModel] = useUpdateModelMutation();
    const [deleteModel] = useDeleteModelMutation();
    const [enableModel] = useEnableModelMutation();

    const handleCreateModel = (modelData) => handleAction(createModel, modelData);
    const handleUpdateModel = (modelId, modelData) => handleAction(updateModel, { id: modelId, ...modelData });
    const handleDeleteModel = (modelId) => handleAction(deleteModel, modelId);
    const handleEnableModel = (modelId) => handleAction(enableModel, modelId);

    return {
        createModel: handleCreateModel,
        updateModel: handleUpdateModel,
        deleteModel: handleDeleteModel,
        enableModel: handleEnableModel,
        status,
        response,
        error,
    };
}

export default useModel;
