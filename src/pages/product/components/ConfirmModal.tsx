import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
`;

const Button = styled.button`
  margin: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &.yes {
    background: red;
    color: #fff;
  }
  &.no {
    background: #ddd;
  }
`;

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal: React.FC<Props> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Overlay>
      <Box>
        <p>{message}</p>
        <Button className="yes" onClick={onConfirm}>
          {t("yes")}
        </Button>
        <Button className="no" onClick={onCancel}>
          {t("no")}
        </Button>
      </Box>
    </Overlay>
  );
};
