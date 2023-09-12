import styles from "@/styles/pages/Home.module.scss";
import { useState } from "react";
import { CampaignCard } from "@/src/components/CampaignCard";
import { useCampaignsData } from "@/src/hooks/useCampaignsData";
import { Button, Form } from "react-bootstrap";
import { Status } from "@/src/components/Status";
import { Field, Formik } from "formik";

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>();
  const { campaignData, isLoading, isError } = useCampaignsData(page, search);

  const { total = 0, limit = 4, campaigns } = campaignData ?? {};
  const pages = [...Array(Math.ceil(total / limit)).keys()];

  return (
    <div className={`px-sm-3 py-5 mx-auto ${styles.container}`}>
      <div className="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center align-items-end gap-sm-0 gap-4 px-sm-5 px-3">
        {/* Search */}
        <Formik<{ searchQuery: string }>
          initialValues={{
            searchQuery: "",
          }}
          onSubmit={({ searchQuery }) => {
            setSearch(() => searchQuery);
            setPage(1);
          }}
        >
          {(formikProps) => (
            <Form
              className="d-flex gap-3 align-items-start"
              onSubmit={formikProps.handleSubmit}
            >
              <Form.Group controlId="searchQuery">
                <Field
                  name="searchQuery"
                  type="text"
                  as={Form.Control}
                  className="border-dark"
                />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          )}
        </Formik>

        {/* Pagination */}
        <div className="d-flex gap-2">
          {pages.map((pg) => (
            <Button
              variant="secondary"
              className={`rounded-circle ${styles.pageButton}`}
              onClick={() => setPage(pg + 1)}
              disabled={pg === page - 1}
              key={pg}
            >
              {pg + 1}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Status status={isLoading} />
      ) : isError ? (
        <Status status={isError} />
      ) : !campaigns || campaigns.length < 1 ? (
        <Status />
      ) : (
        <div
          className={`py-5 px-sm-3 d-grid gap-4 justify-content-center ${styles.cardContainer}`}
        >
          {campaigns.map((campaign) => (
            <CampaignCard {...campaign} key={campaign.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
