import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Banner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: red;
  color: white;
  text-align: center;
  padding: 8px;
  font-weight: bold;
  z-index: 9999;
`;

type Props = {
  online: boolean;
};

export const NetworkBanner: React.FC<Props> = ({ online }) => {
    const {t}= useTranslation()

  if (online) return null; 
  return <Banner>{t('alertNetwork')}</Banner>;
};
