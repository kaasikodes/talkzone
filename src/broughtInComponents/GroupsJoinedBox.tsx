import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import List from "../components/List";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import { getGroupsJoinedFromServer } from "../utilities/groupsUtility";
import {
  updateFetchingGroupsJoinedStatus,
  fetchGroupsJoined,
} from "../reducers/groupsReducer";
import ActionItem from "../components/ActionItem";
import Avatar from "../components/Avatar";

interface IProps {
  userId: string;
  passableFunc: Function;
}

const GroupsJoinedBox: React.FC<IProps> = ({ userId, passableFunc }) => {
  const GroupCtx = useContext(GroupsContext);
  const state = GroupCtx?.state;
  const dispatch = GroupCtx?.dispatch;
  const groupsJoined = state?.groupsJoined;
  const fetchingGroupsJoinedStatus = state?.fetchingGroupsJoinedStatus;

  useEffect(() => {
    // set fetching status to true iniitially
    // then fetch data
    // if success then update fetching status to flse
    // if not succesful leave as true and catch the error and handle accly
    (dispatch as unknown as Function)({
      type: updateFetchingGroupsJoinedStatus,
      payload: { status: true },
    });
    getGroupsJoinedFromServer(userId)
      .then((data) => {
        (dispatch as unknown as Function)({
          type: fetchGroupsJoined,
          payload: { groupsJoined: data },
        });
        (dispatch as unknown as Function)({
          type: updateFetchingGroupsJoinedStatus,
          payload: { status: false },
        });
      })
      .catch((err) => {});
  }, [userId, dispatch]);
  return (
    <motion.div
      className="w-full"
      initial={{ x: "-200" }}
      animate={{ x: 0 }}
      transition={{ type: "tween", ease: "easeOut" }}
    >
      {!fetchingGroupsJoinedStatus ? (
        <List>
          {groupsJoined?.length !== 0 &&
            groupsJoined?.map(({ name, id, photo_url }) => (
              <div className={`mb-1`} key={id}>
                <ActionItem
                  text={name}
                  handleClick={() => passableFunc({ id, name, img: photo_url })}
                >
                  <Avatar
                    name={name}
                    image={photo_url?.length === 0 ? null : photo_url}
                  />
                </ActionItem>
              </div>
            ))}
        </List>
      ) : (
        "...loading"
      )}
    </motion.div>
  );
};

export default GroupsJoinedBox;
