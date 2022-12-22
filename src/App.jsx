import Logo from "./components/logo";
import { Auth, authenticateUser } from "./auth";
import Topbar from "./components/top-bar";
import Router from "./router";
/* import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; */
import { createContext, useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  const [activeUser, setActiveUser] = useState(null);

  /*   const firebaseConfig = {
    databaseURL: "https://frend-78533-default-rtdb.firebaseio.com/",
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const usersRef = ref(db, "users/");

  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    if (allUsers?.length === 0) setAllUsers(data);
  });

  useEffect(() => {
    if (!activeUser) setActiveUser(authenticateUser(allUsers));
  }, [allUsers]);
 */
  return (
    <QueryClientProvider client={queryClient}>
      <Topbar>
        <Logo />
      </Topbar>

      {!Boolean(activeUser) ? <Auth /> : <Router />}
    </QueryClientProvider>
  );
}

export default App;
