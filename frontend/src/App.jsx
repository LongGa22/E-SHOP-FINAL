import {Outlet} from 'react-router-dom'
import  Navigation  from './pages/Auth/Navigation'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home from './pages/Home'



function App() {
  return (
    <>
    <ToastContainer />
    <Navigation/>
    <main className='py-3'>
      <Outlet/>
    </main>
    </>
  )
}

export default App
