import { SignupForm } from "components/SignupForm";

export const SignupView = (): JSX.Element => {
    return (
        <div>
            <h2>Signup</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et felis sodales,
                bibendum sapien ac, facilisis purus. Nunc iaculis nisi ac lorem convallis accumsan.
                Cras dictum, nisl in vestibulum suscipit, enim sapien vulputate augue
            </p>
            <SignupForm />
        </div>
    );
};
