import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { iconV2 } from "../../../../assets/images";
import useUser from "../../../../hooks/useUser";
import { Button, InputField } from "../../../common";

export const RegisterForm = ({ toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    createUser,
    error,
    status: { isLoading, isError },
    response,
  } = useUser();

  const onSubmit = async (data) => {
    try {
      const info = await createUser(data);
      toast.success(response?.message || info.message);
      setTimeout(() => {
        toggleForm();
      }, 2000);
    } catch (error) {
      toast.error(
        error?.error ||
          error.data.message ||
          error?.message ||
          "Error al crear la cuenta"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8">
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <img src={iconV2} className="w-16" />
        <p className="text-xl font-bold">Registrate</p>
        <span className="text-sm max-w-[90%] text-center text-[#8B8E98]">
          Regístrate en nuestra aplicación, sólo tienes que completar los campos
          y disfrutar de la experiencia.
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        <div>
          <InputField
            id="username"
            type="text"
            text="Nombre de usuario"
            colorLabel="text-gray-500"
            register={register}
            name="username"
            errors={errors}
            validation={{
              required: "El nombre de usuario es obligatorio",
              minLength: {
                value: 3,
                message:
                  "El nombre de usuario debe tener al menos 3 caracteres",
              },
            }}
          />
        </div>
        <div>
          <InputField
            id="name"
            type="text"
            text="Nombre completo"
            colorLabel="text-gray-500"
            register={register}
            name="name"
            errors={errors}
            validation={{
              required: "El nombre completo es obligatorio",
            }}
          />
        </div>
        <div>
          <InputField
            id="email"
            type="email"
            text="Correo electrónico"
            colorLabel="text-gray-500"
            register={register}
            name="email"
            errors={errors}
            validation={{
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "El formato del correo electrónico no es válido",
              },
            }}
          />
        </div>
        <div>
          <InputField
            id="password"
            type="password"
            text="Contraseña"
            colorLabel="text-gray-500"
            register={register}
            name="password"
            errors={errors}
            validation={{
              required: "La contraseña es obligatoria",
              minLength: {
                value: 5,
                message:
                  "La contraseña debe tener al menos 5 caracteres, mayúsculas, minúsculas y números",
              },
            }}
          />
        </div>
        <div className="w-full mt-5">
          <Button
            type="submit"
            text={isLoading ? "Creando..." : "Crear cuenta"}
            disabled={isLoading}
          />
        </div>
      </form>
      {isError && (
        <div className="mt-2 text-center text-red-500">
          {error?.message || error.data.message}
        </div>
      )}
      <div className="mt-2 text-center">
        <p onClick={toggleForm} type="button" className="">
          ¿Ya tienes una cuenta?
          <span
            onClick={toggleForm}
            className="ml-2 text-blue-500 cursor-pointer hover:underline"
          >
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
};
