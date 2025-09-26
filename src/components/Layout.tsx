import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/rootStore";
import { NetworkBanner } from "./NetworkBanner";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { useTranslation } from "react-i18next";

const Shell = styled.div`
  display: flex;
  height: 100vh;
  background: #f7f7f7;
`;
const Sidebar = styled.aside`
  width: 220px;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%);
  border-right: 1px solid #eee;
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: none;
`;
const Content = styled.main`
  flex: 1;
  padding: 28px;
  overflow: auto;
`;
const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #111;
  text-decoration: none;
  &:hover {
    background: #f0f0f0;
  }
`;

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const logout = useStore((s) => s.logout);
  const user = useStore((s) => s.user);
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();

  const onLogout = useCallback(() => {
    logout();
    try {
      localStorage.removeItem("root-storage");
    } catch (e) {}
    navigate("/signin");
  }, [logout, navigate]);

  return (
    <Shell>
      <Sidebar>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "#eee",
            }}
            aria-hidden
          />
          <div>
            <div style={{ fontWeight: 700 }}>{user?.userName ?? "User"}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{t("admin")}</div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>

          <MenuItem to="/">{t("dashboard")}</MenuItem>

          <MenuItem to="/attribute">{t("attributes")}</MenuItem>

          <MenuItem to="/product">{t("products")}</MenuItem>

        </div>

        <div style={{ flex: 1 }} />

        <button
          onClick={onLogout}
          style={{
            border: 0,
            background: "transparent",
            cursor: "pointer",
            color: "#333",
            padding: 8,
          }}
          aria-label="Logout"
        >
          {t("logout")}
        </button>
      </Sidebar>

      <NetworkBanner online={isOnline} />
      <Content>{children}</Content>
    </Shell>
  );
};

export default Layout;
