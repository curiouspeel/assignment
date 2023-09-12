import { ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const WithConditionalToolTip = ({
  text,
  withTooltip,
  children,
}: {
  text: string;
  withTooltip: boolean;
  children: ReactNode;
}) => {
  return withTooltip ? (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip className="tooltip">{text}</Tooltip>}
    >
      <div className="cursor-pointer overflow-hidden">{children}</div>
    </OverlayTrigger>
  ) : (
    <>{children}</>
  );
};

export default WithConditionalToolTip;
