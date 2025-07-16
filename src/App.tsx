import {BrowserRouter, Route, Routes} from "react-router";
import Noterr from "@/components/Noterr.tsx";
import HomePage from "@/pages/HomePage.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Noterr/>}>
            <Route index element={<HomePage/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
