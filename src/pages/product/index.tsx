import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import styled from "@emotion/styled";
import  ProductList  from "./components/ProductList";
import  ProductForm  from "./components/ProductForm";
import { ConfirmModal } from "./components/ConfirmModal";
import useStore from "../../store/rootStore";
import { useTranslation } from "react-i18next";

const Box = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;

const ProductContainer = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<{
    index: number;
    message: string;
  } | null>(null);

  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    productLoading,
    productError,
  } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSave = async (data: any) => {
    const payload = {
      name: data.name,
      attributes: data.attributes,
      skusIds: data.skuList.map((s: any) => s.id),
    };

    if (editingIndex !== null) {
      const product = products[editingIndex];
      if (!product.id) return;

      const updated = await updateProduct(product.id, payload);
      if (updated) {
        setMode("list");
        setEditingIndex(null);
      }
    } else {
      const created = await createProduct(payload);
      if (created) {
        setMode("list");
        setEditingIndex(null);
      }
    }
  };

  const handleDelete = (index: number) => {
    setConfirm({
      index,
      message: t("confirmDeleteProduct", { name: products[index].name }),
    });
  };

  const confirmDelete = async () => {
    if (confirm) {
      const product = products[confirm.index];
      if (!product.id) return;
      const success = await deleteProduct(product.id);
      if (success) setConfirm(null);
    }
  };

  return (
    <Layout>
      <h3>{t("products")}</h3>
      <Box>
        {productLoading && <p>{t("loading")}</p>}
        {productError && <p style={{ color: "red" }}>{productError}</p>}

        {mode === "list" && (
          <>
            <button onClick={() => setMode("form")}>
              {t("addProduct")}
            </button>
            <ProductList
              products={products.map((p) => ({
                name: p.name || t("noTitle"),
                skuCount: p.skusIds?.length || 0,
              }))}
              onEdit={(i) => {
                setEditingIndex(i);
                setMode("form");
              }}
              onDelete={handleDelete}
            />
          </>
        )}

        {mode === "form" && (
          <ProductForm
            initial={editingIndex !== null ? products[editingIndex] : null}
            onSave={handleSave}
            onCancel={() => {
              setMode("list");
              setEditingIndex(null);
            }}
          />
        )}
      </Box>

      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirmDelete}
          onCancel={() => setConfirm(null)}
        />
      )}
    </Layout>
  );
};

export default ProductContainer;
