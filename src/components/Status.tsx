import { Button, Container, Spinner } from "react-bootstrap";
import styles from "@/styles/components/Status.module.scss";

export const Status = ({ status }: { status?: boolean | Error }) => {
  const loading = typeof status === "boolean";
  return (
    <Container
      className={`d-flex flex-column justify-content-center align-items-center py-5 px-3 ${styles.container}`}
    >
      {!status ? (
        <p>No Campaigns Found.</p>
      ) : loading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <p>Something went wrong.</p>
      )}

      {!loading && (
        <Button variant="outline-secondary" href="/">
          Return
        </Button>
      )}
    </Container>
  );
};
