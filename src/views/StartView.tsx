import * as React from "react";
import { GroupList } from "components/GroupList";
import { Helmet } from "react-helmet";

export const StartView = (): JSX.Element => {
    return (
        <div>
            <Helmet>
                <title>Euro 2020 (2021) - Fotbollsfeber.se</title>
            </Helmet>

            <h2>Euro 2020 - Alla grupper</h2>
            <p className="lead">
                Euro 2020 spelas 2021 då det blev inställt pga coronapandemin 2020. Mästerskapaet
                spelas mellan 11 juni och 11 juli 2021 på 12 olika platser. 24 nationer uppdelade i
                6 grupper slåss om att vinna mästerskapet.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias aliquam, excepturi
                fugit ipsum libero mollitia nisi quae repellat veniam! Consectetur dignissimos in
                tempore. Dolore illum impedit ipsam nisi saepe.
            </p>
            <GroupList />
        </div>
    );
};
