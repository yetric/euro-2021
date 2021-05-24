import { CountryLookup } from "../utils/CountryLookup";
import styles from "./styles/TeamIcon.module.css";

interface TeamIconProps {
    team: string;
}
export const TeamIcon = ({team}: TeamIconProps) => {
    return <span className={styles.wrap}>
        <img className={styles.flag} src={CountryLookup.getFlag(team)} />
    </span>;
}
