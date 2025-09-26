import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  border-bottom: 2px solid #ddd;
  padding: 8px;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
`;

const Button = styled.button`
    background: black;
    color: white;
    padding: 8px 16px;Ï
    margin: 10px 0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

const Input = styled.input`
  padding: 8px;
  margin: 5px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const AddValueBtn = styled.button`
  margin-left: 10px;
  padding: 6px 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: #eee;
  font-size: 18px;
`;

const AttributeView = ({
  attributes,
  isAdding,
  setIsAdding,
  name,
  setName,
  values,
  handleChangeValue,
  handleAddValue,
  handleSave,
}: any) => {
  const { t } = useTranslation();

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{t("attributes")}</h2>
        <Button onClick={() => setIsAdding(true)} style={{ height: "40px" }}>
          {t("addAttribute")}
        </Button>
      </div>

      {!isAdding ? (
        <>
          <Table>
            <thead>
              <tr>
                <Th> {t("name")}</Th>
                <Th>{t("values")}</Th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr: any, idx: any) => (
                <tr key={idx}>
                  <Td>{attr.name}</Td>
                  <Td>{attr.values.join(", ")}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <div>
            <label>
              {t("name")}:
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("enterAttributeName")}
              />
            </label>
          </div>
          {values.map((val: any, idx: any) => (
            <div key={idx}>
              <label>
                {t("value")}:
                <Input
                  value={val}
                  onChange={(e) => handleChangeValue(idx, e.target.value)}
                  placeholder={t("enterValue")}
                />
              </label>
              {idx === values.length - 1 && (
                <AddValueBtn onClick={handleAddValue}>+</AddValueBtn>
              )}
            </div>
          ))}
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setIsAdding(false)}>{t("cancel")}</Button>
        </>
      )}
    </Container>
  );
};

export default AttributeView;
