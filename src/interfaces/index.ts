// NOTIFICATIONS
//
type TimeStamp = string | number;
// interface Person {
//   name: string;
//   img?: string;
// }

export interface IMessage {
  content: string;
  sent_on: TimeStamp;
  // Belongs to conversation but cos of subcollection there is no reference ID
  // use Momment to convert
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  senderImg?: string;
  receiverImg?: string;
  conversationId?: string;

  id: messageID;
  // As per in regard to the DB - so each message that is read can be kept track of, howver this is not needed by ui
  // The ui simply needs to only know wether that particular user has viewed it or not
  //  hence this should be calculated in the back end via cloud function
  // then a response of messages sent with each message containing seen or not seeen prop
  viewedBy?: userID[];
}
type ID = string;
type userID = ID;
type groupID = ID;
type messageID = ID;
export type conversationID = ID;
export interface IUser {
  id: userID;
  name: string;
  photo_url: string | null;
  email: string;
  groups_part_of?: groupID[];
  groups_admin_of?: groupID[];
  conversations: conversationID[];
  status: boolean;
}
export interface IGroup {
  id: groupID;
  photo_url?: string;
  name: string;
  no_of_members?: number;
  members?: string[];
  created_on?: string;
  conversationId?: conversationID;
  admins?: userID[];
  creatorId?: userID;
  description?: string;
}

export interface IConversation {
  id: conversationID;
  name?: string;
  // where the array of strings contains either a group Name 0r 2 values - participants in p-p convo
  // This is the name of either the group or either of the participant in a person -  to - person convo
}

export interface IPerson {
  id: string;
  name: string;
  photo_url?: string;
}

//  THE UI - REACT DATA SHOULD BE FORMATED AS NEEDED BY UI AND NOT REGARDING THE DB BACKEND

// Lazy approach  to solve action
export interface IDetails {
  name: string;
  id: string;
  photo_url?: string;
}

export interface IAction {
  type: string;
  payload?: {
    id?: string;
    info?: IGroup;
    status?: boolean;
    groupsCreated?: IGroup[];
    groupsNotJoined?: IGroup[];
    groupsJoined?: IGroup[];
    name?: string;
    groupId?: string;
    messages?: IMessage[];
    details?: IDetails;
    conversations?: [];
    photo_url?: "";
    groups_part_of?: groupID[];
    groups_admin_of?: groupID[];
  };
}

export interface INotification {
  content: string;
  id: string;
}
