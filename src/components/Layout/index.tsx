import { Container } from "react-bootstrap";
import { Header } from "components/Layout/Header";
import styles from "./styles/Layout.module.css";
import { LandingPage } from "../LandingPage";
import * as React from "react";

interface LayoutProps {
    children: JSX.Element[] | JSX.Element;
}

const Layout = (props: LayoutProps): JSX.Element => {
    return (
        <>
            <Header />
            <div className={styles.hero}>
                <Container>
                    <LandingPage />
                </Container>
            </div>
            <main className="mt-3">
                <Container className="mb-3">{props.children}</Container>
            </main>
        </>
    );
};

export { Layout };
