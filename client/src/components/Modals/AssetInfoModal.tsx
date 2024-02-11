import { FC } from "react";
import { Modal, Typography } from "antd";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

import { selectQuotesByTicker } from "@/redux/quotesSlice";
import { IQuote } from "@/interfaces";

const { Title } = Typography;

interface AssetInfoModalProps {
  asset: IQuote;
  isModalOpen: boolean;
  onCancel: () => void;
}

export const AssetInfoModal: FC<AssetInfoModalProps> = ({
  asset,
  isModalOpen,
  onCancel,
}) => {
  const historyQuotesByTicker = useSelector(selectQuotesByTicker(asset.ticker));

  const formattedData = historyQuotesByTicker.map((item) => ({
    ...item,
    last_trade_time: new Date(item.last_trade_time).toLocaleString(),
  }));

  return (
    <Modal open={isModalOpen} footer={null} onCancel={onCancel} width={900}>
      <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
        Dynamics of {asset.ticker} asset indicators
      </Title>
      <LineChart width={800} height={400} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="last_trade_time" type="category" />
        <YAxis yAxisId="left">
          <Label value="Price" offset={0} position="left" angle={-90} />
        </YAxis>
        <YAxis yAxisId="right" orientation="right">
          <Label value="Yield" offset={0} position="right" angle={-90} />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" margin={{ bottom: 20 }} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="red"
          yAxisId="left"
          name="Price"
        />
        <Line
          type="monotone"
          dataKey="yield"
          stroke="green"
          yAxisId="right"
          name="Yield"
        />
      </LineChart>
    </Modal>
  );
};
