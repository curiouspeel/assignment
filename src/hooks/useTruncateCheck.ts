import { useRef, useState, useEffect } from "react";

type TruncationType = "single-line" | "multi-line";

const useTruncateCheck = (type: TruncationType) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const truncation: Record<TruncationType, boolean> = {
      "single-line": ref.current.scrollWidth > ref.current.offsetWidth,
      "multi-line": ref.current.scrollHeight > ref.current.clientHeight,
    };
    setTruncated(truncation[type]);
  }, [type]);

  return {
    ref,
    truncated,
  };
};

export { useTruncateCheck };
