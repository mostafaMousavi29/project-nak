import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/rootStore";
import SignUpView from "./components/SignUp";
import { useTranslation } from "react-i18next";

type Form = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

const SignUpContainer: React.FC = () => {
  const { register, handleSubmit } = useForm<Form>();
  const signup = useStore((s) => s.signup);
  const loading = useStore((s) => s.loading);
  const error = useStore((s) => s.error);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      alert(t("passwordsDoNotMatch"));
      return;
    }

    await signup({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
    });

    const token = useStore.getState().token;
    if (token) navigate("/");
  });

  return (
    <SignUpView
      register={register}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default SignUpContainer;
