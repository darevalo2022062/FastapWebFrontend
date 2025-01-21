import { useState } from "react";

const useAsyncAction = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const [status, setStatus] = useState({
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const handleAction = async (action, data) => {
        setStatus({ isLoading: true, isSuccess: false, isError: false });
        setError(null);
        setResponse(null);
        try {
            const result = await action(data).unwrap();
            setResponse(result);
            setStatus({ isLoading: false, isSuccess: true, isError: false });
            return result; // Retornar - Kaled Baboso
        } catch (err) {
            console.error("Failed to perform action:", err);
            setError(err);
            setStatus({ isLoading: false, isSuccess: false, isError: true });
            throw err; // Lanzar el error
        }
    };   

    return { handleAction, status, response, error };
};

export default useAsyncAction;
//authorization