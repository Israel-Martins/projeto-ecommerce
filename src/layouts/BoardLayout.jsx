import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import UserSideBar from "../components/UserSideBar";
import ProductSideBar from "../components/ProductSideBar";
import { useUser } from "../contexts/UsuarioProvider";
import ProductPutBar from "../components/ProductPutBar";
import CategoriesBar from "../components/CategoriesBar";
import CategoriesEditBar from "../components/CategoriesEditBar";
import CouponsBar from "../components/CuponsBar";

const BoardLayout = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        else if(user.nivel === 'admin') {
            return
        }
        else {
            navigate('/')
        }
    }, [user, navigate]);

    if (!user) return null; // evita renderizar enquanto redireciona
    return (
        <div className="min-h-screen bg-[var(--bg)] text-white">

            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
                <Outlet />
            </div>
            <ProductSideBar />
            <ProductPutBar  />
            <UserSideBar />
            <CategoriesBar />
            <CategoriesEditBar />
            <CouponsBar />
            
        </div>
    );
}

export default BoardLayout;
