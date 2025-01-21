import {
    useCreateColorMutation,
    useUpdateColorMutation,
    useDeleteColorMutation,
    useEnableColorMutation,
    useDeleteTotalColorMutation
} from '../services/colorApi';
import useAsyncAction from '../utils/useAsyncAction';

const useColor = () => {
    
    const prepareFormData = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'img' && data[key][0]) {
                formData.append(key, data[key][0]); // Append file
            } else {
                formData.append(key, data[key]);
            }
        });
        return formData;
    };

    const { handleAction, status, response, error } = useAsyncAction();
    const [createColor] = useCreateColorMutation();
    const [updateColor] = useUpdateColorMutation();
    const [deleteColor] = useDeleteColorMutation();
    const [deleteTotalColor] = useDeleteTotalColorMutation();
    const [enableColor] = useEnableColorMutation();

    const handleCreateColor = (colorData) => handleAction(createColor, colorData);
    const handleUpdateColor = (colorData) => handleAction(updateColor, colorData );
    const handleDeleteColor = (colorId) => handleAction(deleteColor, colorId);
    const handleDeleteTotalColor = (colorId) => handleAction(deleteTotalColor, colorId);
    const handleEnableColor = (colorId) => handleAction(enableColor, colorId);

    return {
        createColor: handleCreateColor,
        updateColor: handleUpdateColor,
        deleteColor: handleDeleteColor,
        enableColor: handleEnableColor,
        deleteTotalColor: handleDeleteTotalColor,
        status,
        response,
        error,
    };
}

export default useColor;
