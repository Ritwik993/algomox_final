import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Main application file
import "./index.css"; // Stylesheet
import { Provider } from "react-redux"; // Redux provider
import { PersistGate } from "redux-persist/integration/react"; // PersistGate to delay rendering
import { store, persistor } from "./app/store.js"; // Store and persistor

// Rendering the React app with Redux and Persist integration
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* PersistGate ensures state is rehydrated before rendering the app */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
