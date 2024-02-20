import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import UserRoute from './Routes/UserRoute'
import AdminRoute from './Routes/AdminRoute'
import './App.css'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>

<Router>
<ToastContainer/>
        <Routes>
          <Route path='/*' element={<UserRoute/>}/>
          <Route path='/admin/*' element={<AdminRoute/>}/>
        </Routes>
        </Router>

    </>
  )
}

export default App
