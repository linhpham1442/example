import { IMeProfile, IUserProfile, UserRole } from "@/common/types";
import React, { createContext, useCallback, useEffect, useReducer } from "react";

import { APP_TOKEN_KEY } from "@/common/utils/constants";
import RoleSelectionModal from "@/common/components/RoleSelectionModal";
import axios from "axios";
import { getMeProfile } from "@/common/api/user";
import instance from "@/common/utils/fetch";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { type } from "os";

type Action =
  | { type: "setUser"; data: any }
  | { type: "setProfile"; data: any }
  | { type: "setAuthenticated"; data: any }
  | { type: "setInitial"; data: any }
  | { type: "setRole"; data: UserRole }
  | { type: "setSFBalance"; data: any }
  | { type: "setInitialState" }
  | { type: "reset" };
type Dispatch = (action: Action) => void;

export type AuthContextState = {
  user: string;
  isAuthenticated: boolean;
  isInitial: boolean;
  profile: IUserProfile;
};
type AuthProviderProps = { children: React.ReactNode };

const initialState: AuthContextState = {
  user: "",
  isAuthenticated: false,
  isInitial: false,
  profile: {} as IUserProfile,
};

export const AuthContext = createContext<{ state: AuthContextState; dispatch: Dispatch } | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //Init data from api
    const token = localStorage.getItem(APP_TOKEN_KEY);
    if (token) {
      (async () => {
        try {
          const { data } = (await getMeProfile()).data;
          if (data) {
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
          } else {
            localStorage.removeItem(APP_TOKEN_KEY);
            localStorage.removeItem("sofin_key");
            dispatch({ type: "setAuthenticated", data: false });
            dispatch({ type: "setProfile", data: {} as IMeProfile });
            dispatch({ type: "setUser", data: "" });
            instance.defaults.headers.common["Authorization"] = ``;
            // dispatch({ type: "reset" });
            window.location.href = "/";
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem(APP_TOKEN_KEY);
          localStorage.removeItem("sofin_key");
          dispatch({ type: "setAuthenticated", data: false });
          dispatch({ type: "setProfile", data: {} as IMeProfile });
          dispatch({ type: "setUser", data: "" });
          instance.defaults.headers.common["Authorization"] = ``;
          // dispatch({ type: "reset" });
          window.location.href = "/";
        }
      })();
    }
  }, []);
  const value = { state, dispatch };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <RoleSelectionModal
        isOpen={UserRole.none === state?.profile?.role}
        userId={state?.profile?.id}
        onSubmitRole={(role: UserRole) => {
          dispatch({
            type: "setRole",
            data: role,
          });
        }}
      />
    </AuthContext.Provider>
  );
};

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.data,
      };
    case "setProfile":
      return {
        ...state,
        profile: action.data,
      };
    case "setAuthenticated":
      return {
        ...state,
        isAuthenticated: action.data,
      };
    case "setInitial":
      return {
        ...state,
        isInitial: action.data,
      };
    case "setInitialState":
      return {
        ...state,
        ...action.data,
      };
    case "setRole":
      return {
        ...state,
        profile: {
          ...state.profile,
          role: action.data,
        },
      };
    case "setSFBalance":
      return {
        ...state,
        profile: {
          ...state.profile,
          sfBalance: action.data,
        },
      };
    case "reset":
      return initialState;

    default:
      return state;
  }
};

export const useAuth = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  // const router = useRouter();

  const signinLocal = async (email: string, password: string, phoneNumber: string, name: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
      email,
      password,
      phoneNumber,
      name,
    });
    const accessToken = response.data.token;
    if (accessToken) {
      const decoded: any = jwt_decode(accessToken);
      localStorage.setItem(APP_TOKEN_KEY, accessToken);
      dispatch({ type: "setProfile", data: response.data.data });
      dispatch({ type: "setUser", data: decoded.verifiedAddress });
      dispatch({ type: "setAuthenticated", data: true });
    }
  };

  const loginWithGoogle = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/user/oauth2/google/request?callbackURL=${process.env.NEXT_PUBLIC_CALLBACK_URL_GOOGLE}`,
      "_self"
    );
  };

  const loginWithFacebook = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/user/oauth2/facebook/request?callbackURL=${process.env.NEXT_PUBLIC_CALLBACK_URL_FACEBOOK}`,
      "_self"
    );
  };

  const loginLocal = async (email: string, password: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      email,
      password,
    });
    const accessToken = response.data.token;
    if (accessToken) {
      const decoded: any = jwt_decode(accessToken);
      localStorage.setItem(APP_TOKEN_KEY, accessToken);
      dispatch({ type: "setProfile", data: response.data.data });
      dispatch({ type: "setUser", data: decoded.verifiedAddress });
      dispatch({ type: "setAuthenticated", data: true });
    }
  };

  const logout = async () => {
    localStorage.removeItem(APP_TOKEN_KEY);
    dispatch({ type: "setAuthenticated", data: false });
    dispatch({ type: "setProfile", data: {} as IMeProfile });
    dispatch({ type: "setUser", data: "" });
    instance.defaults.headers.common["Authorization"] = ``;
    // dispatch({ type: "reset" });
    window.location.href = "/";
  };

  // useEffect(() => {
  //   dispatch({ type: "setInitial", data: true });

  //   const accessToken = localStorage.getItem(APP_TOKEN_KEY);

  //   if (accessToken) {
  //     const decoded: any = jwt_decode(accessToken);
  //     dispatch({ type: "setUser", data: decoded.verifiedAddress });
  //     dispatch({ type: "setAuthenticated", data: true });
  //   }
  // }, [dispatch]);
  useEffect(() => {
    const accessToken = localStorage.getItem(APP_TOKEN_KEY);
    if (!accessToken) {
      dispatch({ type: "setInitial", data: true });
      dispatch({ type: "setAuthenticated", data: false });
    }
  }, [dispatch]);

  return {
    user: state.user,
    isInitial: state.isInitial,
    signinLocal,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    loginLocal,
    isAuthenticated: state.isAuthenticated,
    profile: state.profile,
  };
};
