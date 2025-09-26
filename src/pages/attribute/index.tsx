import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AttributeView from "./components/Attribute";
import { useStore } from "../../store/rootStore";
import { useTranslation } from "react-i18next";

const AttributeContainer = () => {
  const {
    attributes,
    attributeLoading,
    attributeError,
    fetchAttributes,
    createAttribute,
  } = useStore((s) => ({
    attributes: s.attributes,
    attributeLoading: s.attributeLoading,
    attributeError: s.attributeError,
    fetchAttributes: s.fetchAttributes,
    createAttribute: s.createAttribute,
  }));

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [values, setValues] = useState([""]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAttributes();
  }, [fetchAttributes]);

  const handleAddValue = () => {
    setValues([...values, ""]);
  };

  const handleChangeValue = (index: number, newValue: string) => {
    const updated = [...values];
    updated[index] = newValue;
    setValues(updated);
  };

  const handleSave = async () => {
    await createAttribute({ name, values });
    setIsAdding(false);
    setName("");
    setValues([""]);
  };

  return (
    <Layout>
      {attributeLoading && <p>{t("loading")}</p>}
      {attributeError && <p style={{ color: "red" }}>{attributeError}</p>}

      <AttributeView
        attributes={attributes}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        name={name}
        setName={setName}
        values={values}
        handleChangeValue={handleChangeValue}
        handleAddValue={handleAddValue}
        handleSave={handleSave}
      />
    </Layout>
  );
};

export default AttributeContainer;
