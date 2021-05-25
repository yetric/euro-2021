import { useParams } from "react-router-dom";

export const PlayerView = (): JSX.Element => {
    const { playerId } = useParams<{ playerId: string }>();
    return (
        <div>
            <h1>PlayerView {playerId}</h1>
        </div>
    );
};
