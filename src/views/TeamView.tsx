import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export const TeamView = () => {
    const { teamId } = useParams<{ teamId: string }>();
    return (
        <>
            <Helmet>
                <title>{teamId}</title>
            </Helmet>
            <div>
                <h1>{teamId}</h1>
            </div>
        </>
    );
};
