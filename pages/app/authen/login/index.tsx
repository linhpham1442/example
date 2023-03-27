import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useAuth } from "@/common/hooks/useAuth";
import { useRouter } from "next/router";

interface IForm {
  email: string;
  password: string;
}

export interface ILoginProps {}

const Login = ({}: ILoginProps) => {
  const [form] = Form.useForm<IForm>();
  const { loginWithFacebook, loginWithGoogle, loginLocal } = useAuth();
  const router = useRouter();

  const onLogin = async (values: IForm) => {
    try {
      await loginLocal(values.email, values.password);
      message.success("Login successfully!");
      router.push("/app");
    } catch (error) {
      message.error("Login failed, email or password is incorrect!");
    }
  };

  return (
    <div className="w-full grid h-full mx-auto">
      <div className="md:w-2/3 sm:self-center lg:w-1/3 bg-white px-20 py-6 mx-auto">
        <div className="flex mx-auto justify-center">
          <Image src="/svg/logo.svg" alt="" width={100} height={100} />
        </div>
        <h1 className="text-3xl md:mt-3 font-semibold text-center text-[#2B1C50] uppercase">Welcome to SOFIN</h1>
        <Form
          className="mt-8"
          initialValues={{
            email: "",
            password: "",
          }}
          form={form}
          layout="vertical"
          onFinish={onLogin}
          requiredMark={false}
        >
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          {/* <a href="#" className="text-[#2B1C50] font-bold md:text-[16px]  hover:underline">
            Forgot your password?
          </a> */}
          <Form.Item className="mt-6">
            <div className="my-3">
              <Button type="primary" size="large" block htmlType="submit">
                Log In
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className=" flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">or</div>
        </div>
        <div className="grid md:gap-y-3 gap-y-10 mt-4">
          <ButtonLoginMethod
            onClick={loginWithFacebook}
            content={"Continue with Facebook"}
            icon={"/svg/facebook.svg"}
            style="bg-[#3E74FF] text-white"
          />
          <ButtonLoginMethod onClick={loginWithGoogle} content={"Continue with Gmail"} icon={"/svg/gmail.svg"} />
        </div>
        <p className="text-center mt-6 md:text-[14px] md:leading-[20px] md:mt-14 text-[#6C6684]">
          By continuing, you agree to SOFINs <span className="font-bold text-[#2B1C50]">Terms of Service</span> and acknowledge youve read
          our<span className="font-bold text-[#2B1C50]"> Privacy Policy.</span>
        </p>
        <div className=" flex w-1/2 items-center justify-center mx-auto mt-6 border border-t">
          <div className="absolute bg-white"></div>
        </div>
        <p className="mt-5 md:text-[16px] font-bold text-[#2B1C50]  text-center">
          Not on SOFIN yet?&nbsp;
          <Link href="/app/authen/register" className="hover:underline">
            <a>Sign up</a>
          </Link>
        </p>
      </div>
    </div>
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

export default Login;
