import { Player } from "../store/models";
import { Col, Row } from "react-bootstrap";
import styles from "./styles/TeamPlayer.module.css";

interface TeamPlayerProps {
    player: Player;
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

export const TeamPlayer = ({ player }: TeamPlayerProps) => {
    let { height, weight } = player.additionalInfo;
    let heightCm = parseInt(height);
    const bmi =
        !isNaN(parseInt(weight)) && !isNaN(heightCm)
            ? Math.round(parseInt(weight) / (((heightCm / 100) * heightCm) / 100))
            : null;

    return (
        <Row className={styles.row}>
            <Col xs={4}>
                <img alt="" className={"img-fluid"} src={player.photo} loading={"lazy"} />
            </Col>
            <Col xs={8}>
                <h5>{player.fullName}</h5>

                <dl className={styles.stats}>
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
