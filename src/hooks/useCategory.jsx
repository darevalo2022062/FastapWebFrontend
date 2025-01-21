import {
    useCreateCategoryMutation,
    useGetCategoryQuery,
    useGetAllCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useEnableCategoryMutation
} from '../services/categoryApi';
import useAsyncAction from '../utils/useAsyncAction';

const useCategory = () => {
    const { handleAction, status, response, error } = useAsyncAction();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [enableCategory] = useEnableCategoryMutation();

    const handleCreateCategory = (categoryData) => handleAction(createCategory, categoryData);
    const handleUpdateCategory = (categoryId, categoryData) => handleAction(updateCategory, { id: categoryId, ...categoryData });
    const handleDeleteCategory = (categoryId) => handleAction(deleteCategory, categoryId);
    const handleEnableCategory = (categoryId) => handleAction(enableCategory, categoryId);

    return {
        createCategory: handleCreateCategory,
        updateCategory: handleUpdateCategory,
        deleteCategory: handleDeleteCategory,
        enableCategory: handleEnableCategory,
        status,
        response,
        error,
    };
}

export default useCategory;
