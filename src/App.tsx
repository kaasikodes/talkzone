import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./fbconfig";
import { onAuthStateChanged } from "@firebase/auth";

import Dashboard from "./pages/Dashboard";

import "./App.css";
import Authentication from "./pages/Authentication";
import OverlayContextProvider from "./contexts/OverlayContextProvider";

import PersonsContextProvider from "./contexts/PersonsContextProvider";
import MessagesContextProvider from "./contexts/MessagesContextProvider";
import GroupsContextProvider from "./contexts/GroupsContextProvider";

import { doc, getDoc } from "firebase/firestore";
import { db } from "./fbconfig";
import { UserContext, initUser } from "./contexts/UserContextProvider";
import NotificationsContextProvider from "./contexts/NotificationsContextProvider";
import ConversationsContextProvider from "./contexts/ConversationsContextProvider";

function App() {
  const UserCtx = useContext(UserContext);
  const dispatch = UserCtx?.dispatch;
  const navigate = useNavigate();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        let data = {};
        const docRef = doc(db, "users", user.uid);
        const docSnap = getDoc(docRef);
        docSnap
          .then((doc) => {
            if (doc.exists()) {
              const fetchedData = doc.data();
              data = {
                id: user.uid,

                conversations: fetchedData.conversations,
                "groups admin of": fetchedData.groups_admin_of,
                "groups part of": fetchedData.groups_part_of,
                name: fetchedData.displayName,
                "photo url": fetchedData.photo_url,
              };
              console.log("DATA", data);
              (dispatch as unknown as Function)({
                type: initUser,
                payload: data,
              });
            }
          })
          .catch((err) => console.log("E B Y", err.message));
        navigate("/");
      } else {
        console.log("user prolm not signed in");
        navigate("/auth");
      }

      return () => {
        unSubscribe();
      };
    });
  }, [navigate, dispatch]);
  return (
    <div>
      <OverlayContextProvider>
        <NotificationsContextProvider>
          <PersonsContextProvider>
            <GroupsContextProvider>
              <ConversationsContextProvider>
                <MessagesContextProvider>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="auth" element={<Authentication />} />
                  </Routes>
                </MessagesContextProvider>
              </ConversationsContextProvider>
            </GroupsContextProvider>
          </PersonsContextProvider>
        </NotificationsContextProvider>
      </OverlayContextProvider>

      {/* Create read later code */}
      {/* App Main Interface - set up tailwind, typescript  DONE*/}
      {/* App Dry Components with dummy data */}
      {/* Add app functionality with fb */}
      {/* Add test cases */}
      {/* Clean up every */}
      {/* Add Load page */}
      {/* Add neccessary branding */}
      {/* Add to portfolio n describe accordingly in sept comp  .... 4 l8r*/}
      {/* Deploy site */}
      {/* Next e commerce using Next Js n typescript n pref material ui */}
    </div>
  );
}

export default App;
