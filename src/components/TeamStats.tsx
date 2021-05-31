import { Player } from "../store/models";
import _ from "lodash";
import { Bar } from "react-chartjs-2";
import styles from "./styles/TeamStats.module.css";
import {
    dateToAge,
    groupAge,
    groupLength,
    groupWeight,
    median,
    sortObjectByKeyName
} from "../utils/core";
import { Card } from "react-bootstrap";

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
                backgroundColor: "rgb(45,182,201)"
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
        <div className={styles.wrap}>
            <Card className={"mb-3"}>
                <Card.Header>Genomsnitt</Card.Header>
                <table className={"table " + styles.table}>
                    <thead>
                        <tr>
                            <th>Värde</th>
                            <th>Genomsnitt</th>
                            <th>Median</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Ålder</th>
                            <td>{Math.round(avgAge)} år</td>
                            <td>{median(ages)} år</td>
                        </tr>
                        <tr>
                            <th>Vikt</th>
                            <td>{Math.round(avgWeight)} kg</td>
                            <td>{median(weights)} kg</td>
                        </tr>
                        <tr>
                            <th>Längd</th>
                            <td>{Math.round(avgHeight)} cm</td>
                            <td>{median(heights)} cm</td>
                        </tr>
                    </tbody>
                </table>
            </Card>

            <h5>Distribution</h5>

            <Card className={"mb-3"}>
                <Card.Body>
                    <Bar
                        type={"bar"}
                        data={createChartStruct(lengthDistribution, "Längd (cm)")}
                        options={options}
                    />
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Bar
                        type={"bar"}
                        data={createChartStruct(ageDistribution, "Ålder (år)")}
                        options={options}
                    />
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Bar
                        type={"bar"}
                        data={createChartStruct(weightDistribution, "Vikt (kg)")}
                        options={options}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};
