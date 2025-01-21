import { useEffect } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useParams } from "react-router-dom";

const ConfirmEmail = () => {

    const { authorization } = useParams();
    console.log("authorization en Frontend es : ",authorization);

    const {
        checkAccount,
        error,
        status: { isLoading, isError },
        response,
    } = useUser();

    useEffect(() => {
        const info = checkAccount(authorization);
        console.log("se logro?: ",info);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-8xl font-bold text-gray-800">Cargando...</h1>
                    <p className="text-4xl font-medium text-gray-800">¡Estamos confirmando tu cuenta, danos un momento!</p>
                </div>
            ) : (
                <div className="bg-gray-100">
                    <div className="h-screen flex flex-col justify-center items-center">
                        <h1 className="text-8xl font-bold text-gray-800">Perfecto!</h1>
                        <p className="text-4xl font-medium text-gray-800">¡Tu cuenta ha sido confirmada!</p>
                        <Link to="/" className="mt-4 text-xl text-blue-600 hover:underline">Iniciar sesión</Link>
                    </div>
                </div>
            )}
        </>

    )
}

export default ConfirmEmail;