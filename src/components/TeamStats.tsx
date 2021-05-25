import { Player } from "../store/models";
import _ from "lodash";
import { Bar } from "react-chartjs-2";
import {
    dateToAge,
    groupAge,
    groupLength,
    groupWeight,
    median,
    sortObjectByKeyName
} from "../utils/core";
import { Col, Row } from "react-bootstrap";

interface TeamStatsProps {
    team: Player[];
}

const createChartStruct = (distribution: any, label: string) => {
    let labels = Object.keys(distribution);
    let data = Object.keys(distribution).map((key: string) => {
        return distribution[key].length;
    });
    return {
        labels,
        datasets: [
            {
                label,
                data,
                backgroundColor: "#009688"
            }
        ]
    };
};

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

    const lengthDistribution = sortObjectByKeyName(_.groupBy(heights, groupLength));
    const ageDistribution = sortObjectByKeyName(_.groupBy(ages, groupAge));
    const weightDistribution = sortObjectByKeyName(_.groupBy(weights, groupWeight));

    const options = {
        scales: {
            y: {
                display: false,
                ticks: {
                    beginAtZero: true
                },
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: "Poppins",
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: "Poppins",
                        size: 14,
                        weight: 300
                    }
                }
            }
        }
    };

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
                <Col>
                    <h5>Distributions</h5>
                    <p>
                        <Bar
                            type={"bar"}
                            data={createChartStruct(lengthDistribution, "Längd (cm)")}
                            options={options}
                        />
                    </p>
                    <p>
                        <Bar
                            type={"bar"}
                            data={createChartStruct(ageDistribution, "Ålder (år)")}
                            options={options}
                        />
                    </p>
                    <p>
                        <Bar
                            type={"bar"}
                            data={createChartStruct(weightDistribution, "Vikt (kg)")}
                            options={options}
                        />
                    </p>
                </Col>
            </Row>
        </div>
    );
};
