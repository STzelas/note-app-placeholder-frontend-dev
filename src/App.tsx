import {BrowserRouter, Route, Routes} from "react-router";
import Noterr from "@/components/Noterr.tsx";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import NotesPage from "./pages/NotesPage";
import TodoPage from "@/pages/TodoPage.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Noterr/>}>
            <Route index element={<HomePage/>} />

            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/note-app" element={<NotesPage/>}/>
            <Route path="/todo-app" element={<TodoPage/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
