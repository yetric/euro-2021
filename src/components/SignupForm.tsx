import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoadingButton } from "components/LoadingButton";
import { EMAIL_PATTERN } from "utils/validation-patterns";
import { useDispatch, useSelector } from "react-redux";
import { authStateSelector, createUserAccount } from "store/slices/authSlice";

export interface SignupFormFields {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignupForm = (): JSX.Element => {
    const dispatch = useDispatch();
    const authState = useSelector(authStateSelector);
    const {
        register,
        formState: { errors },
        getValues,
        handleSubmit
    } = useForm<SignupFormFields>();

    const onSubmit = (values: SignupFormFields) => {
        dispatch(createUserAccount(values.displayName, values.email, values.password));
    };

    const serverError = (error: string | undefined) => {
        return (
            <Alert key={"failed-register"} variant={"danger"}>
                {error ? error : "Unknown error"}
            </Alert>
        );
    };

    if (authState.register.isRegistered)
        return (
            <Alert key={"success-register"} variant={"success"}>
                Signup success!
            </Alert>
        );

    return (
        <>
            {authState.register.hasError && serverError(authState.register.error)}
            <Form onSubmit={handleSubmit(onSubmit)} noValidate role="form" className="w-100">
                <fieldset disabled={authState.register.isRegistering} className="w-100">
                    <Form.Group className={"mb-3"} controlId="displayName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter display name"
                            {...register("displayName", {
                                required: true,
                                pattern: /^[A-Za-z0-9]+$/i,
                                minLength: 6,
                                maxLength: 12
                            })}
                        />
                        <Form.Text className="text-muted">
                            The display name that will be associated with your account bla bla.
                            Enter a name 6-12 chars long.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: true,
                                pattern: EMAIL_PATTERN
                            })}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-3"} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 12
                            })}
                        />
                        {errors.password && <p>Enter a valid password</p>}
                    </Form.Group>
                    <Form.Group className={"mb-3"} controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password again"
                            {...register("confirmPassword", {
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues();
                                        return password === value || "Passwords should match";
                                    }
                                }
                            })}
                        />
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </Form.Group>
                    <Form.Group className={"mb-3"} controlId="terms">
                        <Form.Check type="checkbox" label="Accept terms & conditions" />
                        <Form.Text className="text-muted">
                            For information on how Fotbollsfeber.se uses your personal data...
                        </Form.Text>
                    </Form.Group>
                    <LoadingButton loadingCondition={authState.register.isRegistering}>
                        Create account
                    </LoadingButton>
                </fieldset>
            </Form>
        </>
    );
};
