import AppFooter from "../Footer";
import AppHeader from "../Header";
import { useAuth } from "@/common/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, isInitial, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitial && !isAuthenticated) {
      router.push("/app/authen/login");
    }
    if (isInitial && isAuthenticated && router.pathname.includes("/admin") && profile.userRole !== "admin") {
      router.push("/app");
    }
  }, [router, isInitial, isAuthenticated, profile.userRole]);

  return (
    <div className="app-layout bg-[#F7F7FC] h-full">
      <AppHeader />
      <div className="app-container">{children}</div>
    </div>
  );
};

export default AppLayout;
