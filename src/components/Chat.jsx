import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../AppContext";
import config from "../config/config.json";
import styles from "./chat.module.css";

export default function Chat({ currentConv }) {
  const [textData, setTextData] = useState();
  const { profiles, setProfiles } = useContext(AppContext);
  const screenRef = useRef();

  useEffect(() => {
    setTextData(profiles.find((f) => f.userId.toString() === currentConv));
  }, [currentConv]);

  useEffect(() => {
    screenRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [profiles]);

  const botsReplay = () => {
    const selectedProfile = profiles.find(
      (f) => f.userId.toString() === currentConv
    );
    const randomNumber = Math.floor(Math.random() * 2);
    setTimeout(() => {
      setProfiles(
        [...profiles],
        selectedProfile.messages.push({
          isReaded: false,
          content: config.Data.find((f) => f.Id === selectedProfile.userId)
            .context[Math.floor(Math.random() * 10)],
        })
      );
    }, Math.random() * 3000);

    randomNumber === 0 &&
      setTimeout(() => {
        setProfiles(
          [...profiles],
          selectedProfile.messages.push({
            isReaded: false,
            content: config.Data.find((f) => f.Id === selectedProfile.userId)
              .context[Math.floor(Math.random() * 10)],
          })
        );
      }, Math.random() * 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProfile = profiles.find(
      (f) => f.userId.toString() === currentConv
    );
    setProfiles(
      [...profiles],
      selectedProfile.messages.push({
        isReaded: true,
        textedBy: "MyUser",
        content: e.target[0]?.value,
      }),
      selectedProfile.messages.map((m) => (m.isReaded = true))
    );
    e.target[0].value = "";
    botsReplay();
  };

  const handleFocus = () => {
    const selectedProfile = profiles.find(
      (f) => f.userId.toString() === currentConv
    );
    setProfiles(
      [...profiles],
      selectedProfile.messages.map((m) => (m.isReaded = true))
    );
  };

  return (
    <div className={`${styles.chat_container} col-9`}>
      {textData && (
        <div>
          {textData.messages.map((text) => (
            <div
              style={{
                display: "flex",
                justifyContent: text.textedBy === "MyUser" ? "end" : "start",
              }}
            >
              <p
                ref={screenRef}
                style={{
                  backgroundColor:
                    text.textedBy === "MyUser" ? "#58bf56" : "#e5e6ea",
                  color: text.textedBy === "MyUser" ? "white" : "black",
                  padding: "1em",
                  borderRadius: "1em",
                  maxWidth: "60%",
                  overflowWrap: "break-word",
                  boxShadow: !text.isReaded && "1px 1px 1px",
                }}
              >
                {text.content}
              </p>
            </div>
          ))}
        </div>
      )}
      <form
        action="submit"
        onSubmit={(e) =>
          e.target[0].value ? handleSubmit(e) : e.preventDefault()
        }
      >
        <input type="text" onFocus={(e) => handleFocus(e)} />
        <button type="submit">Sent</button>
      </form>
    </div>
  );
}
