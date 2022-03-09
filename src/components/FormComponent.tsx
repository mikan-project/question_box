import { useState } from "react";
import styled from "styled-components"


const StyledSubmitButton = styled.button`
  background-color: #2fa4ff;
  box-shadow: none;
  border-radius: 4px;
  padding: 4px 12px;
  border: none;
  color: #fff;
  transition: background-color 0.2s ease-in-out;

  &:active {
    background-color: #0e185f;
  }
`

const StyledQuestionInput = styled.input`
  padding: 4px 12px;
  border: #ddd 2px solid;
  border-radius: 4px;
  margin-bottom: 12px;
`

export const FormComponent: React.FC = () => {
  const [val, setVal] = useState<string>("");
  // ボタン連打を避ける
  const [isFetching, setFetching] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const submit = async () => {
    setFetching(true);
    if (isFetching || !val) return;
    const res = await fetch(`${import.meta.env.VITE_DISCORD_WEBHOOK_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ content: val }),
    });
    setFetching(false);

    if (res.ok) {
      window.alert("質問を送信しました！");
      setVal("");
    }
  };

  return (
    <>
      <StyledQuestionInput
        id="question"
        value={val}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      />
      <StyledSubmitButton onClick={() => submit()}>送信！</StyledSubmitButton>
    </>
  );
};
