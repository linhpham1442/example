import { getMeProfile } from "@/common/api/user";
import { AuthContext, AuthContextState } from "@/common/hooks/useAuth";
import { useContext } from "react";

export default function useInitUserData() {
  const { dispatch } = useContext(AuthContext);

  const initUserData = async () => {
    try {
      const { data } = (await getMeProfile()).data;
      dispatch({
        type: "setInitialState",
        data: {
          isAuthenticated: true,
          isInitial: true,
          user: data.name,
          profile: {
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            authType: data.authType,
            userRole: data.userRole,
            sfBalance: data.sfBalance,
            sofinBalance: data.sofinBalance,
          },
        } as AuthContextState,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return initUserData;
}
