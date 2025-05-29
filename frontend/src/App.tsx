import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './components/InputForm'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Chat from './components/Chat'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <SignUp />
    <ToastContainer/> */}
    {/* <Chat/> */}
    <InputForm />

    </>
  )
}

export default App
