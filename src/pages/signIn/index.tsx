import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/rootStore";
import SignInView from "./components/SignIn";

type Form = { userName: string; password: string };

const SignInContainer = () => {
  const { register, handleSubmit } = useForm<Form>();
  const login = useStore((s) => s.login);
  const loading = useStore((s) => s.loading);
  const error = useStore((s) => s.error);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await login(data);
    const token = useStore.getState().token;
    if (token) navigate("/");
  });

  return (
    <SignInView
      register={register}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default SignInContainer;
