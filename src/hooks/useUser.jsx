import {
  useCreateUserMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useReadUserQuery,
  useEnableUserMutation,
  useRecoveryMutation,
  useChangePasswordMutation,
  useCheckAccountMutation,
} from "../services/userApi";
import useAsyncAction from "../utils/useAsyncAction";

const useUser = () => {
  const [createUser] = useCreateUserMutation();
  const [recovery] = useRecoveryMutation();
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [enableUser] = useEnableUserMutation();
  const [checkAccount] = useCheckAccountMutation();
  const [changePassword] = useChangePasswordMutation();
  const { handleAction, status, response, error } = useAsyncAction();

  const handlerCreateUser = (userData) => handleAction(createUser, userData);
  const handlerChangePassword = (userData) => handleAction(changePassword, userData);
  const handlerLogin = (loginData) => handleAction(login, loginData);
  const handlerUpdateUser = (userData) => handleAction(updateUser, userData);
  const handlerDeleteUser = (userData) => handleAction(deleteUser, userData);
  const handlerEnableUser = (userId) => handleAction(enableUser, userId);
  const handlerRecovery = (userData) => handleAction(recovery, userData);
  const handlerCheckAccount = (authorization) => handleAction(checkAccount, authorization);
  
  const handlerUserData = () => {
    return useReadUserQuery();
  };

  return {
    createUser: handlerCreateUser,
    recovery: handlerRecovery,
    login: handlerLogin,
    updateUser: handlerUpdateUser,
    deleteUser: handlerDeleteUser,
    enableUser: handlerEnableUser,
    changePassword: handlerChangePassword,
    userData: handlerUserData,
    checkAccount: handlerCheckAccount,
    status,
    response,
    error,
  };
};

export default useUser;
