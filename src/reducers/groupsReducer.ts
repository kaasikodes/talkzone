import { IGroup, IAction } from "../interfaces";

// actions
export const createGroup = "CREATE GROUP";
export const joinGroup = "JOIN GROUP";
export const leaveGroup = "LEAVE GROUP";
export const deleteGroup = "DELETE GROUP";
export const fetchGroupsJoined = "FETCH GROUPS JOINED";
export const fetchGroupsNotJoined = "FETCH GROUPS NOT JOINED";
export const fetchGroupsCreated = "FETCH GROUPS CREATED";
export const updateFetchingGroupsCreatedStatus =
  "UPDATE FETCHING GROUPS CREATED STATUS";
export const updateFetchingGroupsJoinedStatus =
  "UPDATE FETCHING GROUPS JOINED STATUS";
export const updateFetchingGroupsNotJoinedStatus =
  "UPDATE FETCHING GROUPS NOT JOINED STATUS";
export const setGroupToManageId =
  "SET ID OF GROUP THAT WAS CREATED THAT USER WISHES TO MANAGE";
export const setGroupView = "SET THE GROUP VIEW IN THE CHAT COMPOSER HEADING";
export const setCurrentGroupInfo =
  "SET THE INFO OF CURRENT GROUP FOR PUBLIC VIEW";
export const setGroupLeftId =
  "NOTIFY CURRENT CONVOS OF THE GROUP THE USER LEFT";

export interface IGroupsState {
  groupsCreated: IGroup[] | [];
  groupsNotJoined: IGroup[] | [];
  groupsJoined: IGroup[] | [];
  groupToManageId: string;
  groupView: boolean;
  fetchingGroupsCreatedStatus: boolean;
  fetchingGroupsJoinedStatus: boolean;
  fetchingGroupsNotJoinedStatus: boolean;
  currentGroupInfo: {
    name: string;
    id: string;
    description?: string;
    creatorId?: string;
  };
  groupLeftId: string;
}

const groupsReducer = (state: IGroupsState, action: IAction): IGroupsState => {
  switch (action.type) {
    case setGroupLeftId:
      return {
        ...state,
        groupLeftId: action.payload?.id as unknown as string,
      };
    case setCurrentGroupInfo:
      return {
        ...state,
        currentGroupInfo: action.payload?.info as unknown as {
          name: string;
          id: string;
        },
      };
    case setGroupView:
      return {
        ...state,
        groupView: action.payload?.status as unknown as boolean,
      };
    case setGroupToManageId:
      return {
        ...state,
        groupToManageId: action.payload?.id as unknown as string,
      };
    case updateFetchingGroupsCreatedStatus:
      // fetch data from DB -- groups , consider the cache sync for better performance

      // then update state

      return {
        ...state,
        fetchingGroupsCreatedStatus: action.payload
          ?.status as unknown as boolean,
      };
    case updateFetchingGroupsJoinedStatus:
      // fetch data from DB -- groups , consider the cache sync for better performance

      // then update state

      return {
        ...state,
        fetchingGroupsJoinedStatus: action.payload
          ?.status as unknown as boolean,
      };
    case updateFetchingGroupsNotJoinedStatus:
      // fetch data from DB -- groups , consider the cache sync for better performance

      // then update state

      return {
        ...state,
        fetchingGroupsNotJoinedStatus: action.payload
          ?.status as unknown as boolean,
      };
    case fetchGroupsJoined:
      // fetch data from DB -- groups , consider the cache sync for better performance

      // then update state

      return {
        ...state,
        groupsJoined: action.payload?.groupsJoined as unknown as IGroup[],
      };
    case fetchGroupsNotJoined:
      // fetch data from DB -- groups , consider the cache sync for better performance

      // then update state

      return {
        ...state,
        groupsNotJoined: action.payload?.groupsNotJoined as unknown as IGroup[],
      };
    case fetchGroupsCreated:
      // fetch data from DB -- groups , consider the cache sync for better performance

      // then update state

      return {
        ...state,
        groupsCreated: action.payload?.groupsCreated as unknown as IGroup[],
      };
    case createGroup:
      // add to DB -- groups , consider the cache sync for better performance

      // then update state

      return {
        ...state,
        groupsCreated: [
          ...state.groupsCreated,
          {
            id: action.payload?.id as unknown as string,
            name: action.payload?.name as unknown as string,
          },
        ],
      };

    case joinGroup:
      // update the members of the group in DB, consider the cache sync for better performance

      // then update state

      return {
        ...state,
        groupsJoined: [
          ...state.groupsJoined,
          {
            id: action.payload?.id as unknown as string,
            name: action.payload?.name as unknown as string,
          },
        ],
      };

    case deleteGroup:
      // delete group and all messages belonging to , if creator then(security rules) , then the conversation id will be the group
      // then update state

      return {
        ...state,
        groupsCreated: state.groupsCreated.filter(
          (group) => group.id !== action.payload?.groupId
        ),
      };

    case leaveGroup:
      // update the members of the group in DB, consider the cache sync for better performance
      // then update state

      return {
        ...state,
        groupsJoined: state.groupsJoined.filter(
          (group) => group.id !== action.payload?.groupId
        ),
      };

    default:
      return state;
  }
};

export default groupsReducer;
