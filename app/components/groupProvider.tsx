import React, { createContext, useContext, useState, useEffect } from "react";
// import mockBackendData from "../mockdata/mockdata";

type GroupContextType = {
  groups: any[];
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  totalSaved: number;
  setTotalSaved: React.Dispatch<React.SetStateAction<number>>;
  loadGroups: () => Promise<void>;
};

const GroupContext = createContext<GroupContextType | null>(null);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState<any[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);

  const loadGroups = async () => {
    const data = await mockBackendData();
    setGroups(data?.groups);
    setTotalSaved(data.totalSaved);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <GroupContext.Provider
      value={{ groups, setGroups, totalSaved, setTotalSaved, loadGroups }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = (): GroupContextType => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
