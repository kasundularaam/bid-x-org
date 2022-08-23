import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import { AuthSharedLayout, NoAuthSharedLayout } from "./pages/SharedLayout";
import { AuthRoute, NoAuthRoute } from "./pages/ProtectedRoute";
import Stocks from "./pages/Stocks";
import Stock from "./pages/Stock";
import ReadNews from "./pages/ReadNews";
import News from "./pages/News";
import NewNews from "./pages/NewNews";
function App() {
  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user"))
  );
  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <NoAuthRoute user={user}>
              <NoAuthSharedLayout />
            </NoAuthRoute>
          }
        >
          <Route path="login" element={<Login setUser={setUser} />} />
        </Route>

        <Route
          path="/"
          element={
            <AuthRoute user={user}>
              <AuthSharedLayout setUser={setUser} />
            </AuthRoute>
          }
        >
          <Route index element={<Home user={user} />} />
          <Route path="newNews" element={<NewNews />} />
          <Route path="stocks">
            <Route index element={<Stocks />} />
            <Route path=":stockId" element={<Stock />} />
          </Route>
          <Route path="news">
            <Route index element={<News />} />
            <Route path=":newsId" element={<ReadNews />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
