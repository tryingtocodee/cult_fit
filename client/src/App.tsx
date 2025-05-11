import {Routes , Route} from "react-router-dom"
import { Signup } from "./pages/signupPage"
import { Login } from "./pages/loginPage"
import { CreateGym } from "./pages/createGymPage"

function App() {
return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin/create-gym" element={<CreateGym/>} />
      </Routes>
    </div>
  )
}

export default App
