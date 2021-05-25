import { Player } from "../store/models";
import _ from "lodash";
import { calculateBmi, dateToAge, groupAge, groupLength, groupWeight, median } from "../utils/core";
import { Col, Row } from "react-bootstrap";

interface TeamStatsProps {
    team: Player[];
}

export const TeamStats = ({ team }: TeamStatsProps): JSX.Element => {
    const weights = team
        .map((player: Player) => {
            return parseInt(player.additionalInfo.weight);
        })
        .filter((weight: any) => {
            return !isNaN(weight);
        });

    const heights = team
        .map((player: Player) => {
            return parseInt(player.additionalInfo.height);
        })
        .filter((height: any) => {
            return !isNaN(height);
        });

    const ages = team
        .map((player: Player) => {
            return dateToAge(player.additionalInfo.birthdate);
        })
        .filter((age: any) => {
            return !isNaN(age);
        });

    const avgWeight = _.meanBy(weights);
    const avgHeight = _.meanBy(heights);
    const avgAge = _.meanBy(ages);

    const lengthDistribution = _.groupBy(heights, groupLength);
    const ageDistribution = _.groupBy(ages, groupAge);
    const weightDistribution = _.groupBy(weights, groupWeight);

    return (
        <div>
            <Row>
                <Col>
                    <h5>Average</h5>
                    <dl>
                        <dt>Ålder</dt>
                        <dd>{Math.round(avgAge)} år</dd>

                        <dt>Vikt</dt>
                        <dd>{Math.round(avgWeight)} kg</dd>

                        <dt>Längd</dt>
                        <dd>{Math.round(avgHeight)} cm</dd>
                    </dl>
                </Col>
                <Col>
                    <h5>Median</h5>
                    <dl>
                        <dt>Ålder</dt>
                        <dd>{median(ages)} år</dd>

                        <dt>Vikt</dt>
                        <dd>{median(weights)} kg</dd>

                        <dt>Längd</dt>
                        <dd>{median(heights)} cm</dd>
                    </dl>
                </Col>
            </Row>

            <h5>Distributions</h5>
            <p>{JSON.stringify(lengthDistribution)}</p>
            <p>{JSON.stringify(ageDistribution)}</p>
            <p>{JSON.stringify(weightDistribution)}</p>
        </div>
    );
};
