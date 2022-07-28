import React, {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  FC,
} from "react";
import Home from "../component/Home";

export interface IHomeContext {
  component?: JSX.Element;
  setComponent?: Dispatch<SetStateAction<JSX.Element>>;
}

interface IComponent {
  children?: ReactNode;
}

const HomeContext = createContext<IHomeContext>({});

export const HomeProvider: FC<IComponent> = ({ children }: IComponent) => {
  const [component, setComponent] = useState(<Home />);

  return (
    <HomeContext.Provider value={{ component, setComponent }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
