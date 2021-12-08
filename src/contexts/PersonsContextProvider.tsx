import { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fbconfig";
import { IPerson } from "../interfaces";

interface PersonsContextInterface {
  persons: IPerson[];
}

export const PersonsContext = createContext<PersonsContextInterface | null>(
  null
);

const PersonsContextProvider: React.FC = (props) => {
  const UserCtx = useContext(UserContext);
  const currentUser = UserCtx?.state;
  const [persons, setPersons] = useState<IPerson[] | []>([]);
  useEffect(() => {
    // fetch Persons showing ordering Persons by the no of messages unread by user in each conv0
    // this will prob have to be a snap shot, or periodic call
    const run = async () => {
      if (currentUser?.id) {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          setPersons((data) => [
            ...data,
            {
              id: doc.id,
              name: doc.data().displayName,
              photo_url: doc.data().photo_url,
            },
          ]);
        });
      }
    };
    run();
  }, []);
  return (
    <PersonsContext.Provider value={{ persons }}>
      {props.children}
    </PersonsContext.Provider>
  );
};

export default PersonsContextProvider;
