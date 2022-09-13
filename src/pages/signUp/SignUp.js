import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import google from "~/assets/image/google.svg";
import { Field } from "~/components/field";
import { Input } from "~/components/input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Button from "~/components/button";
import InputPasswordToggle from "~/components/input/InputPasswordToggle";
import logoMp3 from "~/assets/image/logomp3.svg";
const StyledSignUp = styled.div`
  height: 100vh;
  position: relative;
  & .sign-up-container {
    background-color: #fff;
    & .sign-up-title {
      color: ${(props) => props.theme.purplePrimary};
    }
  }
  .submit-btn {
    padding: 10px 50px;
    font-size: 20px;
    width: 100%;
  }
  & .sign-in-link {
    color: ${(props) => props.theme.purplePrimary};
  }
  & .sign-in-google {
    border: 1px solid #ddd;
  }
`;

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
  };
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <StyledSignUp>
      <div className="flex items-center w-full px-5 py-3">
        <div className="relative w-20 h-20 cursor-pointer ">
          <img className="object-cover w-full" src={logoMp3} alt="" />
        </div>
      </div>

      <div className="px-10 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 gap-y-5 sign-up-container py-10  rounded-lg w-[40vw]  max-w-[900px]">
        <div className="flex flex-col sign-up">
          <h3 className="text-2xl font-medium whitespace-nowrap sign-up-title">
            Đăng Kí
          </h3>
          <form
            className="form"
            onSubmit={handleSubmit(handleSignUp)}
            autoComplete="off"
          >
            <Field>
              <Input
                type="text"
                name="fullname"
                placeholder="Họ tên"
                control={control}
              />
            </Field>
            <Field>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                control={control}
              />
            </Field>
            <Field>
              <InputPasswordToggle control={control}></InputPasswordToggle>
            </Field>
            <div className="flex items-center">
              <Button type="submit w-full" className="submit-btn">
                Đăng kí
              </Button>
            </div>
          </form>
          <button className="flex justify-center bg-white sign-in-google my-4  items-center  text-black p-3 gap-3 rounded-full cursor-pointer   disabled:!cursor-default transition duration-300 w-full">
            <img className="w-6 h-6" src={google} alt="" />
            <span className="text-lg text-black">
              Đăng kí với tài khoản google
            </span>
          </button>

          <span className="flex items-center mt-4 text-sm font-normal whitespace-nowrap gap-x-1">
            Nếu bạn đã có tài khoản vui lòng đăng nhập
            <p className="underline cursor-pointer sign-in-link">tại đây</p>
          </span>
        </div>
      </div>
    </StyledSignUp>
  );
};

export default SignUp;
