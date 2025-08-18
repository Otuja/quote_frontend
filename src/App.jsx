import { Routes, Route } from "react-router-dom";
import SecondaryLayout from "./layouts/SecondaryLayout";
import "./index.css";
import HomePage from "./pages/HomePage";
import QuoteForm from "./pages/QuoteForm";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import OtpVerify from "./pages/OtpVerify.jsx";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPasswordVerify from "./pages/ResetPasswordVerify";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import ProfilePage from "./pages/ProfilePage.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        {/* route with layout  */}
        <Route element={<SecondaryLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<QuoteForm />} />
          <Route path="/update/:quoteId" element={<UpdatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Add more routes as needed */}
        </Route>

        {/* authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route
          path="/password-reset/request"
          element={<ResetPasswordRequest />}
        />
        <Route
          path="/password-reset/verify"
          element={<ResetPasswordVerify />}
        />
        <Route
          path="/password-reset/confirm"
          element={<ResetPasswordConfirm />}
        />
      </Routes>
    </>
  );
};

export default App;
