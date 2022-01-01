import React, { createContext, useReducer, useContext } from "react";
import { IAction, IUser, conversationID } from "../interfaces";
export const initUser = "INITIALIZE USER";
export const removeUser = "UNINITIALIZE USER";
export const UserContext = createContext<UserContextInterface | null>(null);

interface UserContextInterface {
  state: IUser;
  dispatch: Function;
}

const userReducer = (state: IUser, action: IAction): IUser => {
  switch (action.type) {
    case initUser:
      return {
        ...state,
        groups_admin_of: action.payload?.groups_admin_of as unknown as string[],
        groups_part_of: action.payload?.groups_part_of as unknown as string[],
        photo_url: action.payload?.photo_url as unknown as string,
        status: action.payload?.status as unknown as boolean,
        id: action.payload?.id as unknown as string,
        name: action.payload?.name as unknown as string,
        conversations: action.payload
          ?.conversations as unknown as conversationID[],
        bio: action.payload?.bio as unknown as string,
      };
    case removeUser:
      return {
        name: "",
        id: "",
        conversations: [],
        groups_admin_of: [],
        groups_part_of: [],
        photo_url: "",
        status: false,
        email: "",
        bio: "",
      };

    default:
      return state;
  }
};

const initialState: IUser = {
  // pls correct by state render in components n avoid this
  name: "Kent Dauda",
  id: "1",
  conversations: ["1", "2", "3"],
  groups_admin_of: ["1", "2", "3"],
  groups_part_of: ["1", "2", "3"],
  photo_url: "",
  status: false,
  email: "",
  bio: "",
};

const UserContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const dispatch = UserCtx?.dispatch;

  return {
    user,
    dispatch,
  };
};

export default UserContextProvider;
