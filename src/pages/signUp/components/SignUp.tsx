import React from "react";
import styled from "@emotion/styled";
import { UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Card = styled.div`
  width: 540px;
  margin: 80px auto;
  padding: 28px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  border: 2px solid #e6f0ff;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 22px;
  border: none;
  background: #f3f3f3;
  margin-top: 12px;
`;

type Form = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  register: UseFormRegister<Form>;
  onSubmit: () => void;
  loading?: boolean;
  error?: string | null;
};

const SignUpView: React.FC<Props> = ({
  register,
  onSubmit,
  loading,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <h2>{t("sign_up")}</h2>
      <form onSubmit={onSubmit}>
        <Input
          placeholder={t("firstName") || "First Name"}
          {...register("firstName", { required: true })}
        />
        <Input
          placeholder={t("lastName") || "Last Name"}
          {...register("lastName", { required: true })}
        />
        <Input
          placeholder={t("userName") || "Username"}
          {...register("userName", { required: true })}
        />
        <Input
          placeholder={t("password") || "Password"}
          type="password"
          {...register("password", { required: true })}
        />
        <Input
          placeholder={t("confirmPassword") || "Confirm Password"}
          type="password"
          {...register("confirmPassword", { required: true })}
        />
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Link to="/signin">{t("have_account") || "Have an account?"}</Link>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#000",
              color: "#fff",
              borderRadius: 20,
              padding: "8px 16px",
              border: 0,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "..." : "→"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default SignUpView;
