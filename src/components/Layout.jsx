import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import BottomNavbar from "./BottomNavbar";

export default function Layout({ children }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-orange-50">
            {isMobile ? <BottomNavbar /> : <Sidebar />}
            <main className="flex-1 p-8 bg-main w-2/3">{children}</main>
        </div>
    );
}
