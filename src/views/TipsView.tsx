import { useSelector } from "react-redux";
import { getAllMatches, getUserBets } from "../store/slices/matchesSlice";
import { BetOnGame } from "../components/BetOnGame";
import { useEffect, useState } from "react";
import { Match } from "../store/models";
import { ProgressBar } from "react-bootstrap";

interface BettingProps {
    home: number;
    away: number;
    gameId: string;
}

export const TipsView = () => {
    const games = useSelector(getAllMatches());
    const bets = useSelector(getUserBets());
    const [betting, setBetting] = useState({});

    const onBetting = ({ home, away, gameId }: BettingProps) => {
        setBetting({ ...betting, ...{ [gameId]: [home, away] } });
    };

    useEffect(() => {
        console.log(betting);
    }, [betting]);

    const percentageDone = (Object.entries(betting).length / games.length) * 100;
    const percentageDoneRounded = Math.round(percentageDone * 10) / 10;

    return (
        <div>
            <h1 className={"h3"}>Bet on Results in Euro 2020</h1>

            <p><ProgressBar now={percentageDone} label={`${percentageDoneRounded}%  `} /></p>

            {games.map((game: Match, index: number) => {
                return (
                    <BetOnGame
                        key={`bet-match-${index}`}
                        betAway={bets[game.id][0] ?? 0}
                        betHome={bets[game.id][1] ?? 0}
                        onChange={onBetting}
                        game={game}
                    />
                );
            })}
        </div>
    );
};
