import { Container } from "react-bootstrap";
import { Header } from "components/Layout/Header";

interface LayoutProps {
    children: JSX.Element[] | JSX.Element;
}

const Layout = (props: LayoutProps): JSX.Element => {
    return (
        <>
            <Header />
            <main className="mt-3">
                <Container className="mb-3">{props.children}</Container>
            </main>
        </>
    );
};

export { Layout };
