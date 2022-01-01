import { useEffect, useState } from "react";
import ViewGroupProfile from "./ViewGroupProfile";
import { useParams } from "react-router-dom";
import { IGroup } from "../interfaces";
import { getGroupFromServer } from "../utilities/groupsUtility";

const ViewGroupContainer = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<IGroup | null>(null);

  useEffect(() => {
    id && getGroupFromServer(id).then((data) => data && setGroup(data));
  }, [id]);

  return <div>{group && <ViewGroupProfile group={group} />}</div>;
};

export default ViewGroupContainer;
