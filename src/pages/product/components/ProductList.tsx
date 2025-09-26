import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const Th = styled.th`
  text-align: left;
  border-bottom: 2px solid #ddd;
  padding: 8px;
`;

const Td = styled.td`
  border-bottom: 1px solid #eee;
  padding: 8px;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
`;

type Props = {
  products: { name: string; skuCount: number }[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const ProductList: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <Th>{t("name")}</Th>
          <Th>{t("skuCount")}</Th>
          <Th>{t("actions")}</Th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, i) => (
          <tr key={i}>
            <Td>{p.name}</Td>
            <Td>{p.skuCount}</Td>
            <Td>
              <IconBtn
                onClick={() => onEdit(i)}
                aria-label={t("edit")}
                title={t("edit")}
              >
                ✏️
              </IconBtn>
              <IconBtn
                onClick={() => onDelete(i)}
                aria-label={t("delete")}
                title={t("delete")}
              >
                🗑
              </IconBtn>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
