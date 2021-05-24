import { Button, Card, Col, Row } from "react-bootstrap";
import styles from "./styles/LandingPage.module.css";
import { IoCheckmarkSharp, IoFootball } from "react-icons/all";

export const LandingPage = () => {
    return (
        <div className={styles.wrap}>
            <Row>
                <Col md={7}>
                    <h1>Tävla mot dina vänner</h1>
                    <p className={"lead"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dicta
                        dolorem esse fuga fugiat harum illo ipsa ipsam iure minus pariatur rem, sint
                        tempora veniam voluptas. Consequatur facere nemo similique.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis
                        deserunt dolorum eligendi fuga impedit ipsa ipsam iste labore minus
                        molestias odio quisquam quos rerum sapiente, soluta tempora tenetur velit?
                    </p>
                </Col>
                <Col md={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Skapa konto</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum
                                ducimus magnam odio sint sit temporibus. A doloribus exercitationem
                                fuga
                            </Card.Text>
                            <ul className={styles.features}>
                                <li>
                                    <IoCheckmarkSharp /> Wow it is A
                                </li>
                                <li>
                                    <IoCheckmarkSharp /> Wow it is B
                                </li>
                                <li>
                                    <IoCheckmarkSharp /> ...why not this C feature
                                </li>
                                <li>
                                    <IoCheckmarkSharp /> Win the stuff
                                </li>
                            </ul>
                            <Button href={"/signup"} variant={"success"} block={true}>
                                <IoFootball /> Skapa konto
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
