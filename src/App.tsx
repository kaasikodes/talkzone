import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./broughtInComponents/SignUp";
import LogIn from "./broughtInComponents/LogIn";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import ConversationStarter from "./components/ConversationStarter";
import CreateGroupForm from "./components/CreateGroupForm";
import EditUserDetails from "./components/EditUserDetails";
import JoinGroupForm from "./components/JoinGroupForm";
import LeaveGroupForm from "./components/LeaveGroupForm";
import ManageGroupForm from "./components/ManageGroupForm";
import Notifications from "./components/Notifications";

import { doc, getDoc } from "firebase/firestore";
import { db } from "./fbconfig";
import { auth } from "./fbconfig";
import { onAuthStateChanged } from "@firebase/auth";
import { useUser, removeUser, initUser } from "./contexts/UserContextProvider";

import MessageComposer from "./components/MessageComposer";
import ViewProfile from "./components/ViewProfile";
import EditGroupContainer from "./components/EditGroupContainer";
import ViewGroupContainer from "./components/ViewGroupContainer";

const App = () => {
  const navigate = useNavigate();
  const { dispatch } = useUser();
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
                photo_url: fetchedData.photo_url,
                bio: fetchedData.bio,
              };
              // put user context in globally available space
              (dispatch as unknown as Function)({
                type: initUser,
                payload: { ...data },
              });

              navigate("dashboard");
            }
          })
          .catch((err) => {
            console.log("E B Y", err.message);
            navigate("/"); //temporary
          });
      } else {
        (dispatch as unknown as Function)({
          type: removeUser,
        });

        navigate("/"); // temporary
      }

      return () => {
        unSubscribe();
      };
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Welcome />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="edit/user" element={<EditUserDetails />} />
          <Route path="edit/group/:id" element={<EditGroupContainer />} />
          <Route path="view/group/:id" element={<ViewGroupContainer />} />
          <Route path="view/user" element={<ViewProfile />} />
          <Route path="start_conversation" element={<ConversationStarter />} />
          <Route path="create_group" element={<CreateGroupForm />} />
          <Route path="leave_group" element={<LeaveGroupForm />} />
          <Route path="join_group" element={<JoinGroupForm />} />
          <Route path="manage_group" element={<ManageGroupForm />} />
          <Route path="notifications" element={<Notifications />} />

          {/* deeper within */}
          <Route path="conversations/:slug" element={<MessageComposer />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
