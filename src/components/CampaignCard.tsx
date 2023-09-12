import { Button, Card, Image, ProgressBar } from "react-bootstrap";
import { ICampaign } from "../types";
import styles from "@/styles/components/CampaignCard.module.scss";
import { useTruncateCheck } from "../hooks/useTruncateCheck";
import WithConditionalToolTip from "./WithConditionalTooltip";

export const CampaignCard = ({ ...campaign }: ICampaign) => {
  const { ref: nameRef, truncated: nameTruncated } =
    useTruncateCheck("single-line");
  const { ref: descRef, truncated: descTruncated } =
    useTruncateCheck("multi-line");

  const progress =
    (parseInt(campaign.raised) / parseInt(campaign.target)) * 100;
  const currency = Intl.NumberFormat("en-HK");
  const raised = currency.format(parseInt(campaign.raised));
  const target = currency.format(parseInt(campaign.target));
  const stats = { Raised: raised, Target: target };

  return (
    <Card className={styles.cardContainer}>
      <Card.Img
        variant="top"
        src={campaign.banner}
        className={styles.cardBanner}
        alt={`${campaign.name} - campaign banner`}
      />
      <Card.Body className="flex-7 d-flex flex-column justify-content-between">
        <div className="mb-3">
          {/* Logo & Name */}
          <div className="d-flex align-items-center gap-2 mb-1">
            <Image
              src={campaign.logo}
              thumbnail
              className={styles.logo}
              alt={`${campaign.name} - campaign logo`}
            />
            <WithConditionalToolTip
              withTooltip={nameTruncated}
              text={campaign.name}
            >
              <Card.Title className="fs-5 text-truncate" ref={nameRef}>
                {campaign.name}
              </Card.Title>
            </WithConditionalToolTip>
          </div>

          {/* Description */}
          <WithConditionalToolTip
            text={campaign.description}
            withTooltip={descTruncated}
          >
            <div className={`overflow-hidden ${styles.description}`}>
              <Card.Text
                className={styles.truncate}
                ref={descRef}
                key={campaign.name}
              >
                {campaign.description}
              </Card.Text>
            </div>
          </WithConditionalToolTip>

          <ProgressBar
            now={progress}
            label={`${progress}%`}
            visuallyHidden
            className="mb-1 mt-3"
          />

          {/* Raised, Target */}
          <div className="d-flex justify-content-between">
            {Object.entries(stats).map(([label, value], idx) => {
              const style = idx < 1 ? "primary" : "end";
              return (
                <div key={label}>
                  <p
                    className={`m-0 fs-6 fw-bold text-${style}`}
                  >{`${campaign.currency} ${value} `}</p>
                  <p className={`m-0 text-${style}`}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-100 d-flex flex-column justify-content-between">
          {/* Tags */}
          <div className="d-flex flex-wrap mb-2">
            {campaign.tags.map((tag) => (
              <p
                className={`m-0 mx-1 fw-bold text-primary ${styles.tag}`}
                key={tag}
              >
                {`#${tag} `}
              </p>
            ))}
          </div>
          <Button variant="primary" className={styles.cardButton}>
            Invest Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
