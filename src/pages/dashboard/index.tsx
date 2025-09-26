import React from "react";
import { Layout } from "../../components/Layout";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/rootStore";

const Panel = styled.div`
  background: #fff;
  padding: 18px;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
`;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const user = useStore((s) => s.user);

  return (
    <Layout>
      <Panel>
        <h2 style={{ margin: 0 }}>
          {t("hello", { name: user?.userName ?? "Parnia" })}
        </h2>
        <p style={{ marginTop: 8, color: "#666" }}>
          {t("dashboard_welcome") ??
            t('welcomeMessage')}
        </p>
      </Panel>
    </Layout>
  );
};

export default Dashboard;
