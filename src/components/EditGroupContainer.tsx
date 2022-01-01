import React, { useEffect, useState } from "react";
import EditGroupDetails from "./EditGroupDetails";
import { useParams } from "react-router-dom";
import { IGroup } from "../interfaces";
import { getGroupFromServer } from "../utilities/groupsUtility";

const EditGroupContainer = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<IGroup | null>(null);

  useEffect(() => {
    id && getGroupFromServer(id).then((data) => data && setGroup(data));
  }, [id]);
  return <div>{group && <EditGroupDetails group={group} />}</div>;
};

export default EditGroupContainer;
