import { TeamIcon } from "./TeamIcon";
import { Match } from "../store/models";
import styles from "./styles/BetOnGame.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface CallbackProps {
    home: number;
    away: number;
    gameId: string;
}

interface BetOnGameProps {
    game: Match;
    onChange: (props: CallbackProps) => void;
    betHome?: number;
    betAway?: number;
}
export const BetOnGame = ({
    game,
    onChange,
    betAway = 0,
    betHome = 0
}: BetOnGameProps): JSX.Element => {
    const [home, setHome] = useState<number>(betHome);
    const [away, setAway] = useState<number>(betAway);
    const [dirty, setDirty] = useState<boolean[]>([false, false]);

    useEffect(() => {
        if (dirty.every((item) => item)) {
            onChange({
                gameId: game.id,
                away,
                home
            });
        }
    }, [dirty]);

    const bettingCls = clsx(styles.bet, {
        [styles.done]: dirty.every((item) => item)
    });
    return (
        <div className={styles.wrap}>
            <div className={styles.game}>
                <span className={styles.team}>
                    <TeamIcon team={game.homeTeam.code} />
                    {game.homeTeam.code}
                </span>{" "}
                -{" "}
                <span className={styles.team} title={game.awayTeam.name}>
                    <TeamIcon team={game.awayTeam.code} />
                    {game.awayTeam.code}
                </span>
                <p className={styles.meta}>
                    {game.id} {game.venue.name}
                </p>
            </div>
            <div className={bettingCls}>
                <input
                    className={styles.input}
                    inputMode="numeric"
                    type={"number"}
                    pattern="[0-9]*"
                    value={home ?? ""}
                    onFocus={() => {
                        setDirty([false, dirty[1]]);
                    }}
                    onChange={(event) => {
                        setHome(parseInt(event.target.value));
                    }}
                    onBlur={(event) => {
                        setDirty([true, dirty[1]]);
                    }}
                />{" "}
                -{" "}
                <input
                    className={styles.input}
                    inputMode="numeric"
                    type={"number"}
                    pattern="[0-9]*"
                    value={away ?? ""}
                    onChange={(event) => {
                        setAway(parseInt(event.target.value));
                    }}
                    onBlur={(event) => {
                        setDirty([dirty[0], true]);
                    }}
                    onFocus={(event) => {
                        setDirty([dirty[0], false]);
                    }}
                />
            </div>
        </div>
    );
};
