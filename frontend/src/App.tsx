import { Route, Routes } from "react-router-dom";
import "./App.css";
import InputForm from "./components/InputForm";
import SignUp from "./components/AuthForm";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import Profile from "./components/Profile";
import MealForm from "./components/MealForm";
import Suggestions from "./components/Suggestions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/preferences" element={<MealForm />} /> */}
      <Route path="/sign-in" element={<SignUp />} />
      <Route path="/update" element={<InputForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/preferences" element={<MealForm />} />
      <Route path="/suggestions" element={<Suggestions />} />
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
