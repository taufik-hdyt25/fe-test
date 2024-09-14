import { ReactNode } from "react";
import { Header, SideBar } from "../Moleculs";
import Footer from "../Moleculs/Footer";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="grid grid-cols-[320px_1fr] h-screen">
      <aside className="bg-white border-r-2 overflow-y-auto">
        <SideBar />
      </aside>
      <main className="bg-white">
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
