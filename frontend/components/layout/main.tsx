import Header from "../header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MainLayoutProps {
    children: React.ReactNode,
}

export default function MainLayout({children}: MainLayoutProps) {
    return (
        <div className="bg-white h-screen">
            <ToastContainer/>
            {children}
        </div>
    )
}