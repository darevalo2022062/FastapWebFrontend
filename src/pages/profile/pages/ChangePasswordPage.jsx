import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, InputField } from "../../../components/common";
import useUser from "../../../hooks/useUser";
import { useCloseSessionMutation } from "../../../services/userApi";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [closeSession] = useCloseSessionMutation();

  const {
    changePassword,
    error,
    status: { isLoading },
  } = useUser();

  const onSubmit = async (data) => {
    try {
      const pass = await changePassword(data);
      toast.success(pass.message);
      await closeSession();
      window.location.reload();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Cambiar contraseña
        </h2>
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="currentPassword"
            type="password"
            text="Contraseña actual"
            placeholder="Ingresa tu contraseña actual"
            colorLabel="text-gray-500"
            register={register}
            name="currentPassword"
            errors={errors}
            validation={{
              required: "La contraseña actual es obligatoria",
            }}
          />

          <InputField
            id="newPassword"
            type="password"
            text="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            colorLabel="text-gray-500"
            register={register}
            name="newPassword"
            errors={errors}
            validation={{
              required: "La nueva contraseña es obligatoria",
            }}
          />

          <InputField
            id="confirmPassword"
            type="password"
            text="Confirmar contraseña"
            placeholder="Confirma tu nueva contraseña"
            colorLabel="text-gray-500"
            register={register}
            name="confirmPassword"
            errors={errors}
            validation={{
              required: "La confirmación de la contraseña es obligatoria",
            }}
          />
          {error && (
            <div className="text-center text-red-500">
              {error?.error ||
                error.data.message ||
                error?.message ||
                "Error al iniciar sesión"}
            </div>
          )}
          <Button
            type="submit"
            text={isLoading ? "Cargando..." : "Cambiar contraseña"}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
