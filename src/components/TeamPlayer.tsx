import { Player } from "../store/models";
import { Col, Row } from "react-bootstrap";
import styles from "./styles/TeamPlayer.module.css";
import { Link } from "react-router-dom";
import { TeamIcon } from "./TeamIcon";

interface TeamPlayerProps {
    player: Player;
    teamCode: string | null;
}

const Position: any = {
    1: "Målvakt",
    2: "Back",
    3: "Mittfältare",
    4: "Anfallare"
};

function getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const TeamPlayer = ({ player, teamCode }: TeamPlayerProps) => {
    let { height, weight } = player.additionalInfo;
    let heightCm = parseInt(height);
    const bmi =
        !isNaN(parseInt(weight)) && !isNaN(heightCm)
            ? Math.round(parseInt(weight) / (((heightCm / 100) * heightCm) / 100))
            : null;

    return (
        <Row className={styles.row}>
            <Col xs={4} className={styles.img}>
                <img alt={""} className={"img-fluid"} src={player.photo} loading={"lazy"} />
                <span>{player.playerNumber + " " + player.lastName}</span>
                {teamCode && <TeamIcon size={"medium"} team={teamCode} />}
            </Col>
            <Col xs={8}>
                <dl className={styles.stats}>
                    <dt>Namn</dt>
                    <dd>
                        <Link to={"/player/" + player.playerID}>{player.fullName}</Link>
                    </dd>

                    <dt>Nummer</dt>
                    <dd>{player.playerNumber.length > 0 ? player.playerNumber : "-"}</dd>

                    <dt>Position</dt>
                    <dd>{Position[player.additionalInfo.position]}</dd>

                    <dt>Ålder</dt>
                    <dd>{getAge(player.additionalInfo.birthdate)} år</dd>

                    <dt>Vikt</dt>
                    <dd>{player.additionalInfo.weight || "-"}</dd>

                    <dt>Längd</dt>
                    <dd>{player.additionalInfo.height}</dd>

                    <dt>BMI</dt>
                    <dd>{bmi || "-"}</dd>
                </dl>
            </Col>
        </Row>
    );
};
