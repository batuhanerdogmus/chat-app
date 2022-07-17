import React, { useEffect } from "react";
import { useState } from "react";
import config from "./config/config.json";

const defaultValue = {
  profiles: config.Data.map((profile) => ({
    user: profile.user,
    userId: profile.Id,
    messages: [],
  })),
};

const AppContext = React.createContext(defaultValue);

export const AppProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(defaultValue.profiles);

  return (
    <AppContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
