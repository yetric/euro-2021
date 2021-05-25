import { CountryLookup } from "../utils/CountryLookup";
import styles from "./styles/TeamIcon.module.css";

type FlagSize = "small" | "medium" | "large";
interface TeamIconProps {
    team: string;
    size?: FlagSize;
}
export const TeamIcon = ({ team, size = "small" }: TeamIconProps) => {
    return (
        <span className={styles.wrap}>
            <img
                alt={team}
                className={styles.flag + " " + styles[size]}
                src={CountryLookup.getFlag(team)}
            />
        </span>
    );
};
