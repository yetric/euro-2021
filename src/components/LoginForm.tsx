import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoadingButton } from "components/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { authStateSelector, loginAsync } from "store/slices/authSlice";

export interface LoginFormFields {
    email: string;
    password: string;
}

export const LoginForm = (): JSX.Element => {
    const dispatch = useDispatch();
    const authState = useSelector(authStateSelector);
    const { register, handleSubmit } = useForm<LoginFormFields>();

    const onSubmit = (values: LoginFormFields) => {
        dispatch(loginAsync(values.email, values.password));
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate role="form" className="w-100">
                <fieldset disabled={authState.login.isLoggingIn} className="w-100">
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    <Form.Group className={"mb-3"} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    <LoadingButton loadingCondition={authState.login.isLoggingIn}>Login</LoadingButton>
                </fieldset>
            </Form>
        </>
    );
};
