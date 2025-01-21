import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputField, Button } from "../../../common";
import { iconV2 } from "../../../../assets/images";
import useUser from "../../../../hooks/useUser";
import clsx from "clsx";
import toast from "react-hot-toast";

export const LoginForm = ({ toggleForm, onClose, onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    login,
    error,
    status: { isLoading, isError },
  } = useUser();

  const onSubmit = async (data) => {
    try {
      const info = await login(data);
      toast(info.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
      onLoginSuccess();
    } catch (error) {
      toast.error(
        error?.error ||
          error.data.message ||
          error?.message ||
          "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-8">
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <img src={iconV2} className="w-16" />
        <p className="text-xl font-bold">Iniciar sesión</p>
        <span className="text-sm max-w-[90%] text-center text-[#8B8E98]">
          Empieza con nuestra aplicación, sólo tienes que iniciar la sesión y
          disfrutar de la experiencia.
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="mb-5">
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
            }}
          />
        </div>
        <div className={clsx("mb-10", { "mb-5": isError })}>
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
            }}
          />
        </div>
        <div className="w-full mt-5">
          <Button
            type="submit"
            text={isLoading ? "Iniciando..." : "Inicia sesión"}
            disabled={isLoading}
          />
        </div>
      </form>
      <div className="mt-2 text-center">
        <button
          onClick={toggleForm}
          type="button"
          className="w-full text-center"
        >
          ¿No tienes una cuenta?
          <span className="ml-2 text-blue-500 cursor-pointer hover:underline">
            Regístrate aquí
          </span>
        </button>
      </div>
    </div>
  );
};
