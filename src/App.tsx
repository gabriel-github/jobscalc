import { AddJob } from "./pages/AddJob";
import { EditJob } from "./pages/EditJob";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<EditJob />} />
            <Route path="/add" element={<AddJob />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
