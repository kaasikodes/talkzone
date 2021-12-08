import { createContext, useReducer } from "react";

import groupsReducer from "../reducers/groupsReducer";
import { IGroupsState } from "../reducers/groupsReducer";

interface IGroupsCtx {
  state: IGroupsState;
  dispatch: Function;
}

export const GroupsContext = createContext<IGroupsCtx | null>(null);

// The DB structure of a group
// name
// id
// members []
// no_of_members
// creator

const initialState: IGroupsState = {
  groupsCreated: [],
  groupsNotJoined: [],
  groupsJoined: [],
  groupToManageId: "",
  groupView: false,
  fetchingGroupsCreatedStatus: true,
  fetchingGroupsJoinedStatus: true,
  fetchingGroupsNotJoinedStatus: true,
  currentGroupInfo: { name: "", id: "", description: "", creatorId: "" },
  groupLeftId: "",
};

const GroupsContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(groupsReducer, initialState);

  return (
    <GroupsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GroupsContext.Provider>
  );
};

export default GroupsContextProvider;
