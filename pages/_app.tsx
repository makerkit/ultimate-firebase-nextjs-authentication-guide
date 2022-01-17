import "../styles/globals.css";

import { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from "firebase/auth";

import { FirebaseAppProvider, AuthProvider } from "reactfire";

import configuration from "../configuration";
import { isBrowser } from "../lib/generic/isBrowser";

function App(props: AppProps) {
  const { Component, pageProps } = props;

  // we initialize the firebase app
  // using the configuration that we defined above
  const app = initializeApp(configuration.firebase);

  // make sure we're not using IndexedDB when SSR
  // as it is only supported on browser environments
  const persistence = isBrowser()
    ? indexedDBLocalPersistence
    : inMemoryPersistence;

  const auth = initializeAuth(app, { persistence });

  if (configuration.emulator && !("emulator" in auth.config)) {
    // we can get the host by
    // combining the local emulator host with the Auth port
    const host = getAuthEmulatorHost();
    connectAuthEmulator(auth, host);
  }

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <Component {...pageProps} />
      </AuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;

function getAuthEmulatorHost() {
  const host = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
  const port = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT;

  return ["http://", host, ":", port].join("");
}
