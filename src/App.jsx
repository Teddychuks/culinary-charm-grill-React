import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppLayout from "./components/AppLayout";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import ApiDocumentation from "./pages/ApiDocumentation";
import Settings from "./pages/Settings";
import SignIn from "./authentication/SignIn";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./pages/Cart";
import ProtectedRoutes from "./authentication/ProtectedRoutes";
import SignUp from "./authentication/SignUp";
import ForgotPassword from "./authentication/ForgotPassword";
import ResetPassword from "./authentication/ResetPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="menu" />} />
              <Route path="menu" element={<Menu />} />
              <Route path="orders" element={<Orders />} />
              <Route path="admin" element={<Admin />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="api_documentation" element={<ApiDocumentation />} />
              <Route path="settings" element={<Settings />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            <Route path="sign_in" element={<SignIn />} />
            <Route path="sign_up" element={<SignUp />} />
            <Route path="forgot_password" element={<ForgotPassword />} />
            <Route
              path="user/reset_password/:token"
              element={<ResetPassword />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#f0f0f0",
              color: "#333",
            },
          }}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;
