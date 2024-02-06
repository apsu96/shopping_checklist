import { useState } from "react";
import store from "../store/Store";
import { observer } from "mobx-react-lite";
import { generateShareLink } from "../api";
import { Button, Text, TextButton } from "./UIKit.styled";
import { ItemsListContainer } from "./ItemsList";

const ShareChecklist = () => {
  const [link, setLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  async function generateLink() {
    // if (store.checklistId) {
    //   const data = await generateShareLink(store.checklistId);
    //   if (data && data.link) {
    //     setLink(window.location.href + data.link);
    //   }
    // }
  }

  function copyLink() {
    if (link) {
      navigator.clipboard.writeText(link).then(() => setIsCopied(true));
    }
  }

  return (
    <ItemsListContainer>
      <Button onClick={generateLink}>Share this checklist</Button>
      {link && (
        <div style={{ display: "flex", gap: "20px" }}>
          <Text>{link}</Text>
          <TextButton onClick={copyLink}>
            {isCopied ? "Copied" : "Copy"}
          </TextButton>
        </div>
      )}
    </ItemsListContainer>
  );
};

export default observer(ShareChecklist);
