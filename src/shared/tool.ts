import { Node } from "reactflow";

export const generateSeat = ({
  id,
  h,
  w,
  parentW,
  each,
  parentH,
}: {
  id: string;
  h: number;
  w: number;
  parentW: number;
  parentH: number;
  each: number;
}) => {
  const output = [];
  const eachW = parentW / each;
  let _h = 0;

  while (_h < parentH) {
    for (let index = 0; index < each; index++) {
      output.push({
        id: `${id}-${index}.${_h}`,
        data: { label: `${id}${index}.${_h}` },
        position: { x: eachW * index, y: _h },
        className: "light",
        parentNode: id,
        extent: "parent",
        style: {
          width: w,
          height: h,
        },
        draggable: false,
      });
    }
    _h += h;
  }

  return output as Node[];
};

export const createStage = ({ id, position, style, ...rest }: Partial<Node>) =>
  ({
    id,
    data: { label: `Sân khấu ${id}` },
    position: position ?? { x: 0, y: 0 },
    className: "light",
    style: {
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 400,
      height: 400,
      ...style,
    },
    draggable: true,
    ...rest,
  } as Node);

export const createSeatGroup = ({
  id,
  position,
  style,
  ...rest
}: Partial<Node>) => ({
  id,
  data: { label: `Khán đài ${id}` },
  position: position ?? { x: 600, y: 0 },
  className: "light",
  style: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    width: 300,
    height: 600,
    ...style,
  },
  draggable: true,
  ...rest,
});
