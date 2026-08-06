import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const Layout = ({
  children,
  transparentHeader = false,
}: {
  children: React.ReactNode;
  transparentHeader?: boolean;
}) => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    if (!transparentHeader) return;

    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [transparentHeader]);

  return (
    <div className="flex flex-col min-h-[100svh]">
      <Header transparent={transparentHeader && isAtTop} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
