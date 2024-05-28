import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "./components/ui/toaster"
import Media from "./_root/pages/Media"
import Ranking from "./_root/pages/Ranking"
import CreateThread from "./_root/pages/CreateThread"
import QuizGame from "./_root/pages/QuizGame"
import MyQuizzes from "./_root/pages/MyQuizzes"
import Home from "./_root/pages/Home"


function App() {

  return (
    <main className="h-screen">

      <BrowserRouter>
        <Routes>
          {/*Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />}/>
            <Route path="/sign-up" element={<SignUpForm />}/>
          </Route>

          {/*Private Routes */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/media" element={<Media />}/>
            <Route path="/new-thread" element={<CreateThread />}/>
            <Route path="/ranking" element={<Ranking />}/>
            <Route path="/quizgame" element={<QuizGame />}/>
            <Route path="/my-quizzes" element={<MyQuizzes />}/>
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </main>
  )
}

export default App
