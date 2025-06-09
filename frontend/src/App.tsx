import { useState } from "react";
import reactLogo from "./assets/react.svg";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import InputForm from "./components/InputForm";
import Navbar from "./components/Navbar";
import SignUp from "./components/AuthForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import Profile from "./components/Profile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      {/* <Route path="/preferences" element={<MealForm />} /> */}
      <Route path="/sign-in" element={<SignUp />} />
      <Route path="/update" element={<InputForm />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );

  //   const router = createBrowserRouter(
  //   createRoutesFromElements(
  //   <Route path='/' element={<HomePage/>}>
  //   <Route path='/signup' element= {<SignUp/>}/>
  //   <Route path='/update' element= {<InputForm/>}/>
  //   </Route>

  //   )
  // );
  // return <RouterProvider router={router} />;
}

export default App;
