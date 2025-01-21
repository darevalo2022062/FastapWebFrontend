import {
    useCreateProductMutation,
    useGetProductsQuery,
    useGetAllProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useEnableProductMutation,
    useDeleteTotalProductMutation
} from '../services/productApi';
import useAsyncAction from '../utils/useAsyncAction';

const useProduct = () => {
    const { handleAction, status, response, error } = useAsyncAction();

    const [createProduct] = useCreateProductMutation();
    const { data: activeProducts, refetch: refetchActiveProducts } = useGetProductsQuery();
    const { data: allProducts, refetch: refetchAllProducts } = useGetAllProductsQuery();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [enableProduct] = useEnableProductMutation();
    const [deleteTotalProduct] = useDeleteTotalProductMutation();

    const handleCreateProduct = (productData) => handleAction(createProduct, productData);
    const handleUpdateProduct = (productData) => handleAction(updateProduct, productData);
    const handleDeleteProduct = (productId) => handleAction(deleteProduct, productId);
    const handleEnableProduct = (productId) => handleAction(enableProduct, productId);
    const handleDeleteTotalProduct = (productId) => handleAction(deleteTotalProduct, productId);

    return {
        createProduct: handleCreateProduct,
        updateProduct: handleUpdateProduct,
        deleteProduct: handleDeleteProduct,
        enableProduct: handleEnableProduct,
        deleteTotalProduct: handleDeleteTotalProduct,
        activeProducts,
        allProducts,
        refetchActiveProducts,
        refetchAllProducts,
        status,
        response,
        error,
    };
}

export default useProduct;
