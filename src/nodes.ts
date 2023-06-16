import { Node } from "reactflow";
import { createSeatGroup, createStage, generateSeat } from "./shared/tool";

export default [
  createStage({ id: "1" }),
  createSeatGroup({ id: "2" }),
  ...generateSeat({
    id: "2",
    h: 60,
    w: 60,
    parentW: 300,
    parentH: 600,
    each: 5,
  }),
  createSeatGroup({ id: "3", position: { x: -600, y: 0 } }),
  ...generateSeat({
    id: "3",
    h: 60,
    w: 60,
    parentW: 300,
    parentH: 600,
    each: 5,
  }),
  createSeatGroup({
    id: "4",
    position: { x: -100, y: 500 },
    style: {
      width: 600,
      height: 300,
    },
  }),
  ...generateSeat({
    id: "4",
    h: 60,
    w: 60,
    parentW: 600,
    parentH: 300,
    each: 10,
  }),
] as Node[];
