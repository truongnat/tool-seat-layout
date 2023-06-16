import { SVG, Svg } from "@svgdotjs/svg.js";
import { SanboxPreview } from "../../store";

export const createSvg = () => SVG().size(300, 300);

export const createSquare = (svg: Svg) =>
  svg.add(SVG().rect(250, 250).move(50, 50).stroke("black").fill("none"));

export const createCircle = (svg: Svg) =>
  svg.add(SVG().circle(250, 250).radius(100).stroke("black").fill("none"));

export const createTriangle = (svg: Svg) =>
  svg.add(
    SVG().polygon([150, 50, 250, 250, 50, 250]).stroke("black").fill("none")
  );

export const createTrapezoid = (svg: Svg) =>
  svg.add(
    SVG()
      .polygon([100, 50, 200, 50, 250, 200, 50, 200])
      .stroke("black")
      .fill("none")
  );

export const createSemicircle = (svg: Svg) => {
  svg.add(
    SVG()
      .path("M0 150 A150 150 0 0 1 300 150 H0 Z")
      .stroke("black")
      .fill("none")
  );

  svg.add(SVG().line("0 150 300 150").stroke("black").fill("none"));
};

export const createSanboxPreview = (svg: Svg) => (type: SanboxPreview) => {
  svg.clear();
  if (type === "square") {
    createSquare(svg);
  }

  if (type === "circle") {
    createCircle(svg);
  }

  if (type === "triangle") {
    createTriangle(svg);
  }

  if (type === "trapezoid") {
    createTrapezoid(svg);
  }

  if (type === "semicircle") {
    createSemicircle(svg);
  }
};
