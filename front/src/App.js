import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AnnouncePage from "./pages/AnnouncePage/AnnouncePage";
import FooterComponent from "./components/Footer/Footer";
import CreateAnnouncePage from "./pages/CreateAnnoucePage/CreateAnnouncePage";
import ProtectedRoute from "./ProtectedRoute";
import DetailAnnoncePage from "./pages/DetailAnnoncePage/DetailAnnoncePage";

function App() {
  return (
    <div className="">
      <header className="fixed top-0 w-full z-10">
        <Navbar />
      </header>

      {/* Content routes */}
      <div className="mx-auto pt-16 bg-gray-700 min-h-screen w-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>}/>

          <Route path="/" element={<AnnouncePage />} />
          <Route path='/announce/detail' element={<DetailAnnoncePage />} />

          <Route path="/createAnnonce" element={<ProtectedRoute> <CreateAnnouncePage /> </ProtectedRoute>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
