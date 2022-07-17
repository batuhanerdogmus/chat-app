import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import Chat from "./Chat";
import styles from "./profiles.module.css";

export default function Profiles() {
  const [currentConv, setCurrentConv] = useState("1");
  const { profiles, setProfiles } = useContext(AppContext);

  const handleConv = (e) => {
    setCurrentConv(e.currentTarget.id);
  };

  useEffect(() => {
    const selectedProfile = profiles.find(
      (f) => f.userId.toString() === currentConv
    );
    setProfiles(
      [...profiles],
      selectedProfile.messages.map((m) => (m.isReaded = true))
    );
  }, [currentConv]);

  return (
    <div className={`d-flex ${styles.container}`}>
      <div className={`col-3 ${styles.profile_container}`}>
        {profiles.map((profile) => (
          <div key={profile.userId}>
            <div
              id={profile.userId}
              onClick={(e) => handleConv(e)}
              className={styles.profile}
            >
              <div className="d-flex justify-content-between">
                {profile.user}
                {profile.messages.filter((f) => f.isReaded === false).length >
                  0 &&
                  currentConv !== profile.userId.toString() && (
                    <span
                      style={{
                        backgroundColor: "#58bf56",
                        minWidth: "24px",
                        textAlign: "center",
                        borderRadius: "50%",
                      }}
                    >
                      {
                        profile.messages.filter((f) => f.isReaded === false)
                          .length
                      }
                    </span>
                  )}
              </div>

              <p> {profile.messages[profile.messages.length - 1]?.content} </p>
            </div>
          </div>
        ))}
      </div>
      <Chat currentConv={currentConv} />
    </div>
  );
}
