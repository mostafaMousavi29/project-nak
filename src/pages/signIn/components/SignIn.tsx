import React from "react";
import styled from "@emotion/styled";
import { UseFormRegister, FieldValues } from "react-hook-form";
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

type Form = { userName: string; password: string };

type Props = {
  register: UseFormRegister<Form>;
  onSubmit: () => void;
  loading?: boolean;
  error?: string | null;
};

const SignInView: React.FC<Props> = ({
  register,
  onSubmit,
  loading,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <h2>{t("sign_in")}</h2>
      <form onSubmit={onSubmit}>
        <Input
          placeholder={t("username") || "Username"}
          {...register("userName", { required: true })}
        />
        <Input
          placeholder={t("password") || "Password"}
          type="password"
          {...register("password", { required: true })}
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
          <Link to="/signup">{t("sign_up")}</Link>
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

export default SignInView;
