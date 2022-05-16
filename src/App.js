import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import "./App.scss";
import Header from "components/Header";
import NotFound from "components/NotFound";
import productApi from "api/productApi";
import Photo from "features/Photo";
import SignIn from "features/Auth/pages/SignIn";
import { getMe } from "app/userSlice";

// Lasy load - Code splitting
// const Photo = React.lazy(() => import("./features/Photo"));

// Configure Firebase
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  console.log("productList", productList);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await productApi.getAll(params);
        console.log("get all product response", response);
        setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list:", error);
      }
    };

    fetchProductList();
  }, []);

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs out, handle somthing here
          console.log("User is not logged in");
          return;
        }

        // Get me when signed in
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log("Logged in user:", currentUser);
        } catch (error) {
          console.log("Failed to login", error.message);
        }

        // console.log("Logged in user: ", user);
        // const { displayName, email, providerId, photoURL } = user;
        // localStorage.setItem(
        //   "firebaseui_rememberedAccounts",
        //   JSON.stringify([{ displayName, email, providerId, photoURL }])
        // );

        // const token = await user.getIdToken();
        // console.log("Logged in user token: ", token);
      });

    return () => unregisterAuthObserver();
  }, [dispatch]);

  return (
    <div className="photo-app">
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <BrowserRouter>
        <Header />

        <Switch>
          <Redirect exact from="/" to="/photos" />

          <Route path="/photos" component={Photo} />
          <Route path="/sign-in" component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      {/* </Suspense> */}
    </div>
  );
}

export default App;
