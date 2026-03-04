import { useEffect } from "react";
import { Outlet } from "react-router";
import UserSideBar from "../components/UserSideBar";
import ProductSideBar from "../components/ProductSideBar";

const BoardLayout = () => {
    
    useEffect(() => {
        async function conferirUsuario() {

        }
        conferirUsuario()
    }, [])
    return (
        <div className="min-h-screen bg-[var(--bg)] text-white">

            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
                <Outlet />
            </div>
            <ProductSideBar />
            <UserSideBar />

        </div>
    );
}

export default BoardLayout;
