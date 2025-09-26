import React, { useState } from "react";
import styled from "@emotion/styled";
import  ProductTable  from "./ProductTable";
import { useTranslation } from "react-i18next";

const Box = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
`;
const Input = styled.input`
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 4px;
`;
const Select = styled.select`
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 4px;
`;
const Button = styled.button`
  padding: 8px 16px;
  margin: 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: black;
  color: white;
`;

type Props = {
  onCancel: () => void;
  onSave: (data: any) => void;
  initial?: any;
};

 const ProductForm: React.FC<Props> = ({ onCancel, onSave, initial }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(initial?.name || "");
  const [attributes, setAttributes] = useState<any[]>(initial?.attributes || []);
  const [skuList, setSkuList] = useState<any[]>(initial?.skuList || []);

  const addAttribute = () => {
    setAttributes([...attributes, { name: "", values: [] }]);
  };

  const updateAttr = (i: number, field: string, value: any) => {
    const newAttrs = [...attributes];
    newAttrs[i][field] = value;
    setAttributes(newAttrs);
  };

  const addSku = () => {
    setSkuList([...skuList, { model: "", price: "", stock: "" }]);
  };

  const updateSku = (i: number, field: string, value: string) => {
    const newList = [...skuList];
    newList[i][field] = value;
    setSkuList(newList);
  };

  return (
    <Box>
      <h3>{initial ? t("editProduct") : t("createProduct")}</h3>
      <div>
        <label>{t("name")}: </label>
        <Input
          value={name}
          placeholder={t("enterAttributeName") ?? ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <h4>{t("attributes")}</h4>
      {attributes.map((attr, i) => (
        <div key={i}>
          <Select
            value={attr.name}
            onChange={(e) => updateAttr(i, "name", e.target.value)}
          >
            <option value="">{t("selectAttribute")}</option>
            <option value="Color">{t("color")}</option>
            <option value="Size">{t("size")}</option>
          </Select>
          <Input
            placeholder={t("commaSeparatedValues") ?? ""}
            value={attr.values.join(",")}
            onChange={(e) =>
              updateAttr(i, "values", e.target.value.split(","))
            }
          />
        </div>
      ))}
      <Button onClick={addAttribute}>{t("addAttribute")}</Button>

      <h4>{t("skuList")}</h4>
      <ProductTable
        skuList={skuList}
        onChange={updateSku}
        onDelete={(i) => {
          const newList = [...skuList];
          newList.splice(i, 1);
          setSkuList(newList);
        }}
      />
      <Button onClick={addSku}>{t("addSku")}</Button>

      <div>
        <Button onClick={() => onSave({ name, attributes, skuList })}>
          {initial ? t("update") : t("create")}
        </Button>
        <Button onClick={onCancel}>{t("cancel")}</Button>
      </div>
    </Box>
  );
};

export default ProductForm