import { Button, ModalProps, Modal } from "antd";

import Image from "next/image";
import React, {useState} from "react";
import { ReactNode } from "react";
export interface ILoginModalProps {
  isOpen: ModalProps["open"];
  onClose: ModalProps["onCancel"];
  setCloseModal: () => void;
  onSelectGoogle: () => void;
  onSelectFacebook: () => void;
  onLoginLocal: (email: string, password: string) => Promise<void>;
}
const LoginModal = ({ isOpen, onClose, onSelectFacebook, onSelectGoogle, onLoginLocal, setCloseModal }: ILoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = async (e: any) => {
    e.preventDefault();
    await onLoginLocal(email, password);
    setCloseModal()
  }
  return (
    <Modal
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={"500px"}
    >
      <div className="w-full m-auto">
        <div className="flex mx-auto justify-center">
          <Image src="/svg/logo.svg" alt="" width={100} height={100} />
        </div>
        <h1 className="text-3xl md:mt-3 font-semibold text-center text-[#2B1C50] uppercase">Welcome to SOFIN</h1>
        <form className="mt-8">
          <div className="mb-5">
            <label className="block md:text-[14px] text-sm font-semibold text-gray-800">Email</label>
            <input
              type="email"
              placeholder="Email"
              onChange={ e => {setEmail(e.target.value)}}
              className="block w-full px-4 py-2 mt-2 text-[#2B1C50] bg-white border rounded-md focus:border-[#8AB0F9] focus:ring-[#8AB0F9] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-5">
            <label className="block md:text-[14px] text-sm font-semibold text-gray-800">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={ e => {setPassword(e.target.value)}}
              className="block w-full px-4 py-2 mt-2 text-[#2B1C50] bg-white border rounded-md focus:border-[#8AB0F9] focus:ring-[#8AB0F9] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-[#2B1C50] font-bold md:text-[16px]  hover:underline">
            Forgot your password?
          </a>
          <div className="mt-6">
            <button onClick={onLogin} className="w-full md:text-[16px] font-bold px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#333A6D] rounded-md hover:bg-[#8AB0F9] focus:outline-none focus:bg-[#333A6D]">
              Log In
            </button>
          </div>
        </form>
        <div className=" flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">or</div>
        </div>
        <div className="grid md:gap-y-3 gap-y-10 mt-4">
          <ButtonLoginMethod
            onClick={onSelectFacebook}
            content={"Continue with Facebook"}
            icon={"/svg/facebook.svg"}
            style="bg-[#3E74FF] text-white"
          />
          <ButtonLoginMethod onClick={onSelectGoogle} content={"Continue with Gmail"} icon={"/svg/gmail.svg"} />
        </div>
        <p className="text-center mt-10 md:text-[14px] md:leading-[20px] md:mt-20 text-[#6C6684]">
          By continuing, you agree to SOFINs <span className="font-bold text-[#2B1C50]">Terms of Service</span> and acknowledge youve read
          our<span className="font-bold text-[#2B1C50]"> Privacy Policy.</span>
        </p>
        <div className=" flex w-1/2 items-center justify-center mx-auto mt-6 border border-t">
          <div className="absolute bg-white"></div>
        </div>
        <p className="mt-5 md:text-[16px] font-bold text-[#2B1C50]  text-center">
          Not on SOFIN yet?&nbsp;
          <a href="#" className="   hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </Modal>
  );
};
export interface IButtonLoginMethodProps {
  onClick: () => void;
  content: string;
  style?: string;
  icon: ReactNode;
}
function ButtonLoginMethod({ onClick, content, icon, style }: IButtonLoginMethodProps) {
  return (
    <Button onClick={onClick} type="text" className="bg-transparent hover:bg-transparent w-full h-auto p-0">
      <div className={`${style} flex md:px-5 px-2 w-full py-3 gap-5 items-center border-[1px] border-[#D8D4E8] rounded`}>
        <Image className="w-full" objectPosition="contain" objectFit="cover" alt="" src={`${icon}`} width={25} height={25} />
        <span className="text-base text-[14px] md:text-[16px] font-bold leading-6">{content}</span>
      </div>
    </Button>
  );
}

export default LoginModal;
