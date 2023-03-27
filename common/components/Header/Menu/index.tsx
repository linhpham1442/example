import { Button, Dropdown, Menu, notification } from "antd";
import React, { useState } from "react";

// import LoginModal from "../../LoginModal";
// import SigninModal from "../../SigninModal";
import { useAuth } from "@/common/hooks/useAuth";
import { useRouter } from "next/router";

// import SwitchTheme from "../shared/SwitchTheme";

interface MenuHeaderProps {
  className?: string;
  toggleOpen?: () => void;
  isShowToggleTheme: boolean;
}
const MenuHeader: React.FC<MenuHeaderProps> = (props) => {
  const { className } = props;
  const { logout, isAuthenticated, profile } = useAuth();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSigninModal, setIsOpenSigninModal] = useState(false);

  const { loginWithFacebook, loginWithGoogle, loginLocal, signinLocal } = useAuth();

  const router = useRouter();

  const handleCloseModal = () => {
    setIsOpenLoginModal(false);
    setIsOpenSigninModal(false);
  };

  const handleLogin = () => {
    console.log("handle", isOpenLoginModal);
    setIsOpenLoginModal(true);
  };

  const handleSignin = () => {
    console.log("handle", isOpenSigninModal);
    setIsOpenSigninModal(true);
  };

  const items = [
    {
      label: <span onClick={logout}>Logout</span>,
      key: "1",
    },
  ];

  return (
    <div className={className}>
      <div className="relative mt-0">
        {!isAuthenticated ? (
          <div className="space-x-5">
            <Button type="primary" onClick={handleLogin} size="middle">
              Log in
            </Button>
            <Button type="primary" onClick={handleSignin} size="middle">
              Sign in
            </Button>
          </div>
        ) : (
          <Dropdown.Button
            type="primary"
            menu={{ items }}
            onClick={() => {
              router.push("/profile");
            }}
          >
            Hello {profile.name}
          </Dropdown.Button>
        )}
      </div>

      {/* <LoginModal
        isOpen={isOpenLoginModal}
        onSelectGoogle={loginWithGoogle}
        onSelectFacebook={loginWithFacebook}
        onLoginLocal={loginLocal}
        onClose={() => {
          setIsOpenLoginModal(false);
        }}
        setCloseModal={handleCloseModal}
      />
      <SigninModal
        isOpen={isOpenSigninModal}
        onSelectGoogle={loginWithGoogle}
        onSelectFacebook={loginWithFacebook}
        onSigninLocal={signinLocal}
        onClose={() => {
          setIsOpenSigninModal(false);
        }}
        setCloseModal={handleCloseModal}
      /> */}
    </div>
  );
};

export default MenuHeader;
