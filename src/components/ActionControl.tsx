import { Armchair, Frame } from "lucide-react";
import { ModalManagerState } from "../store";

type ActionControlProps = Partial<
  Pick<ModalManagerState, "setType" | "onOpen">
>;

export default function ActionControl({ setType, onOpen }: ActionControlProps) {
  return (
    <div className="absolute z-10 top-32 m-[15px] border-btn-control rounded overflow-hidden">
      <button
        onClick={() => {
          setType?.("stage");
          onOpen?.();
        }}
        className="react-flow__controls-button"
      >
        <Frame />
      </button>
      <button
        onClick={() => {
          setType?.("seat");
          onOpen?.();
        }}
        className="react-flow__controls-button"
      >
        <Armchair />
      </button>
    </div>
  );
}
