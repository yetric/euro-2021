import { ReactNode } from "react";
import { Button, ButtonProps } from "react-bootstrap";

interface LoadingButtonProps extends ButtonProps {
    loadingCondition: boolean;
    loadingText?: string;
    children?: ReactNode;
}

export const LoadingButton = ({
    loadingCondition,
    loadingText,
    children,
    ...props
}: LoadingButtonProps): JSX.Element => {
    return (
        <Button type={props.type ? props.type : "submit"} {...props} disabled={loadingCondition}>
            {loadingCondition ? (
                <>
                    <span className="spinner-border spinner-border-sm mr-1" />{" "}
                    {loadingText ? loadingText : "Loading..."}
                </>
            ) : (
                children
            )}
        </Button>
    );
};
