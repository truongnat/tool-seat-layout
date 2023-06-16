import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useMemo, useRef } from "react";
import { createSanboxPreview, createSvg } from "../hooks/utils/svg";
import { SanboxPreview } from "../store";

export type SeatForm = {
  type: SanboxPreview;
  width: number;
  height: number;
  label: string;
  seatW: number;
  seatH: number;
  countInRow: number;
};

type SeatCreateModalProps = {
  isOpen: boolean;
  onOk?: (values: SeatForm) => void;
  onCancel?: () => void;
};

const { Text } = Typography;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initial = {
  type: "square",
  width: 300,
  height: 300,
  label: "Khán đài",
  seatW: 60,
  seatH: 60,
  countInRow: 5,
};

export default function SeatCreateModal({
  isOpen,
  onCancel,
  onOk,
}: SeatCreateModalProps) {
  const [form] = Form.useForm<SeatForm>();

  const preview = Form.useWatch([], form);

  const onFinish = (values: SeatForm) => {
    onOk?.(values);
  };

  const SVGWrapperRefElement = useRef<any>(null);
  const SVGContainer = useMemo(() => createSvg(), []);

  useEffect(() => {
    if (
      SVGWrapperRefElement &&
      SVGWrapperRefElement.current &&
      SVGWrapperRefElement.current.children.length < 1 &&
      isOpen
    ) {
      SVGContainer.addTo(SVGWrapperRefElement.current);
    }
    return () => {
      SVGContainer.remove();
    };
  }, [SVGWrapperRefElement, SVGContainer, isOpen]);

  useEffect(() => {
    createSanboxPreview(SVGContainer)(preview?.type);
  }, [SVGContainer, preview?.type]);

  return (
    <Modal
      title={"Khán đài"}
      open={isOpen}
      onOk={() => {
        form.submit();
        onCancel?.();
      }}
      onCancel={() => {
        form.resetFields();
        onCancel?.();
      }}
      width={"80%"}
    >
      <Row>
        <Col span={12}>
          <Text strong>Cấu hình Khán đài</Text>
          <Divider />
          <Form
            {...layout}
            form={form}
            name="seat-form"
            onFinish={onFinish}
            layout="vertical"
            className="mt-4"
            initialValues={initial}
          >
            <Form.Item
              name="label"
              label="Tên khán đài"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="width"
              label="Chiều dài"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="height"
              label="Chiều cao"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="type"
              label="Loại hình sân khấu"
              rules={[{ required: true }]}
            >
              <Select placeholder="Lựa chọn loại hình sân khấu" allowClear>
                <Option value="square">Hình Vuông</Option>
                <Option value="circle">Hình tròn</Option>
                <Option value="triangle">Hình tam giác</Option>
                <Option value="trapezoid">Hình thang</Option>
                <Option value="semicircle">Hình bán nguyệt</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="seatW"
              label="Chiều dài ghế"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="seatH"
              label="Chiều cao ghế"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="countInRow"
              label="Số ghế trên 1 hàng"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Text strong>Preview</Text>
          <Divider />
          <div ref={SVGWrapperRefElement} />
        </Col>
      </Row>
    </Modal>
  );
}
