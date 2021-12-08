import React, { createContext, useReducer } from "react";
import { IAction, IConversation, IUser, conversationID } from "../interfaces";
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
      console.log("DATA WAS Supp");
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
      };
    case removeUser:
      return {
        name: "erdvvvvv",
        id: "1",
        conversations: [],
        groups_admin_of: [],
        groups_part_of: [],
        photo_url: "",
        status: false,
        email: "",
      };

    default:
      return state;
  }
};

const initialState: IUser = {
  // pls correct by state render in components n avoid this
  name: "erdvvvvv",
  id: "1",
  conversations: [],
  groups_admin_of: [],
  groups_part_of: [],
  photo_url: "",
  status: false,
  email: "",
};

const UserContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
