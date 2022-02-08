import React, {createContext, ReactNode, useContext, useMemo, useState} from "react";
import {Container} from "@mui/material";

interface IJokeData {
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean,
    religious: boolean,
    political: boolean,
    racist: boolean,
    sexist: boolean,
    explicit: boolean
  },
  id: number,
  safe: boolean,
  lang: string
}

interface IResponseData {
  error: boolean;
  amount: number;
  jokes: IJokeData[]
}

interface IContext {
  data: IResponseData | undefined;
  setData: React.Dispatch<React.SetStateAction<IResponseData | undefined>>;
}

const JokeContext = createContext<IContext | undefined>(undefined);
JokeContext.displayName = "JokeContext"

const JokeProvider = ({children}: { children: ReactNode }) => {
  const [data, setData] = useState<IResponseData | undefined>(undefined);

  const value = useMemo(() => ({data, setData}), [data])
  return (
    <JokeContext.Provider value={value}>
      <Container sx={{mt: 2}}>
        {children}
      </Container>
    </JokeContext.Provider>
  );
}

const useJokeData = () => {
  const context = useContext(JokeContext);
  if (!context) {
    throw new Error("useJokeData must be render inside JokeProvider");
  }
  return context;
}

export {useJokeData, JokeProvider};
export type { IJokeData };
