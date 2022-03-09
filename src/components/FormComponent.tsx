import { useState } from "react";

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
      console.log("hi");
    }
  };

  return (
    <>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      />
      <button onClick={() => submit()}>送信！</button>
    </>
  );
};
