import { Navigate} from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

function ProtectedRoutes({children}: Props) {
    const token = localStorage.getItem("token");

    if(!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoutes;