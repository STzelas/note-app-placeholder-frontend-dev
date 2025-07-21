import {BrowserRouter, Route, Routes} from "react-router";
import Noterr from "@/components/Noterr.tsx";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import NotesPage from "./pages/NotesPage";
import TodoPage from "@/pages/TodoPage.tsx";
import { AuthProvider } from "@/context/AuthProvider.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Noterr/>}>
              <Route index element={<HomePage/>} />

              <Route path="login" element={<LoginPage/>}/>
              <Route path="register" element={<RegisterPage/>}/>

              <Route path="apps" element={<ProtectedRoute/>}>
                <Route path="note-app" element={<NotesPage/>}/>
                <Route path="todo-app" element={<TodoPage/>}/>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
