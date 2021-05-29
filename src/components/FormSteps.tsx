import styles from "./styles/FormSteps.module.css";
import clsx from "clsx";

interface FormStep {
    label: string;
    active?: boolean;
}

interface FormStepsProps {
    steps: FormStep[]
}

export const FormSteps = ({steps}: FormStepsProps) => {
    return <ul className={styles.wrap}>{steps.map((step: FormStep) => {
        let cls = clsx({
            [styles.active]: step.active
        })
        return <li className={cls}><span>{step.label}</span></li>
    })}</ul>
}