import { Cross, Dot, Minus } from "lucide-react";
import { Background, BackgroundVariant, Panel } from "reactflow";
import { RFState } from "../store";

type OptionPanelProps = Pick<RFState, "setVariant" | "variant">;

export default function OptionPanel({ setVariant, variant }: OptionPanelProps) {
  return (
    <>
      <Background color="#ccc" variant={variant} />
      <Panel
        position={"top-left"}
        className="border-btn-control rounded overflow-hidden"
      >
        <button
          className="react-flow__controls-button"
          onClick={() => setVariant(BackgroundVariant.Dots)}
        >
          <Dot strokeWidth={10} />
        </button>
        <button
          className="react-flow__controls-button"
          onClick={() => setVariant(BackgroundVariant.Lines)}
        >
          <Minus />
        </button>
        <button
          className="react-flow__controls-button"
          onClick={() => setVariant(BackgroundVariant.Cross)}
        >
          <Cross />
        </button>
      </Panel>
    </>
  );
}
