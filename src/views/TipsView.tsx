import { useDispatch, useSelector } from "react-redux";
import { BetOnGame } from "components/BetOnGame";
import { BetGame, getLeagueGameBets } from "store/selectors";
import { betsStateSelector, updateBetMatch } from "store/slices/betsSlice";
import { matchStateSelector } from "store/slices/matchesSlice";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { FormSteps } from "components/FormSteps";

export interface BettingProps {
    home: number;
    away: number;
    gameId: string;
}

export const TipsView = () => {
    const dispatch = useDispatch();
    const betGames = useSelector(getLeagueGameBets());
    const betState = useSelector(betsStateSelector);
    const matchesState = useSelector(matchStateSelector);

    if (matchesState.isLoading || betState.isLoading) return <>Loading</>;

    const onBettingChange = (param: BettingProps) => {
        dispatch(updateBetMatch(param));
    };

    return (
        <div>
            <FormSteps
                steps={[
                    {
                        label: "Group Games",
                        active: true
                    },
                    {
                        label: "Top Scorers"
                    },
                    {
                        label: "Champions"
                    }
                ]}
            />

            <ProgressBar
                style={{
                    height: "32px"
                }}
                now={0}
                label={`0%`}
            />

            <Row className={"mt-3 mb-3"}>
                <Col md={4}>
                    <p>FILTERS: SORT BY DATE - SORT BY GROUP</p>
                    {betGames.map((betGame: BetGame, index: number) => {
                        return (
                            <BetOnGame
                                key={`bet-match-${index}`}
                                betAway={betGame.away}
                                betHome={betGame.home}
                                onChange={(props) => onBettingChange(props)}
                                game={betGame.game}
                            />
                        );
                    })}
                </Col>
                <Col md={8}>
                    SHOW STANDINGS BASED ON USER BETS
                </Col>
            </Row>
        </div>
    );
};
