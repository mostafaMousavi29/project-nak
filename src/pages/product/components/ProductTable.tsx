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

const Input = styled.input`
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100px;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  font-size: 16px;
`;

type SKU = {
  model: string;
  price: string;
  stock: string;
};

type Props = {
  skuList: SKU[];
  onChange: (index: number, field: keyof SKU, value: string) => void;
  onDelete: (index: number) => void;
};

 const ProductTable: React.FC<Props> = ({ skuList, onChange, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <Th>{t("model")}</Th>
          <Th>{t("price")}</Th>
          <Th>{t("stock")}</Th>
          <Th>{t("actions")}</Th>
        </tr>
      </thead>
      <tbody>
        {skuList.map((sku, i) => (
          <tr key={i}>
            <Td>
              <Input
                value={sku.model}
                placeholder={t("model") ?? ""}
                onChange={(e) => onChange(i, "model", e.target.value)}
              />
            </Td>
            <Td>
              <Input
                value={sku.price}
                placeholder={t("price") ?? ""}
                onChange={(e) => onChange(i, "price", e.target.value)}
              />
            </Td>
            <Td>
              <Input
                value={sku.stock}
                placeholder={t("stock") ?? ""}
                onChange={(e) => onChange(i, "stock", e.target.value)}
              />
            </Td>
            <Td>
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

export default ProductTable