import { Button } from "react-bootstrap";
import { logoutAsync } from "store/slices/authSlice";
import { useDispatch } from "react-redux";

export const LogoutButton = (): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <Button
            onClick={() => {
                dispatch(logoutAsync());
            }}>
            Logout
        </Button>
    );
};
