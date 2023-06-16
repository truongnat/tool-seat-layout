import { SVG } from "@svgdotjs/svg.js";
import { useEffect, useMemo, useRef } from "react";

export default function useSvgPreview() {
  const SVGWrapperRefElement = useRef<any>(null);
  const SVGContainer = useMemo(() => SVG().size(300, 300), []);

  useEffect(() => {
    if (
      SVGWrapperRefElement &&
      SVGWrapperRefElement.current &&
      SVGWrapperRefElement.current.children.length < 1
    ) {
      SVGContainer.addTo(SVGWrapperRefElement.current);
    }

    return () => {
      SVGContainer.remove();
    };
  }, [SVGWrapperRefElement, SVGContainer]);

  return [SVGWrapperRefElement, SVGContainer];
}
