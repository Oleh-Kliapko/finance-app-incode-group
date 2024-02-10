import { FC, useEffect, useState, useRef } from "react";
import { Flex, Layout, Typography, Input, ConfigProvider } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { headerStyle } from "./styles";
import { SelectAsset } from "@/components/Common";
import { AssetInfoModal } from "@/components/Modals";

import { selectLastQuotes } from "@/redux/quotesSlice";
import { IQuote } from "@/interfaces";
import { useGetInterval, useUpdateInterval } from "@/hooks";

const { Text } = Typography;

export const AppHeader: FC = () => {
  const [selected, setSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asset, setAsset] = useState<IQuote | undefined>(undefined);
  const [newInterval, setNewInterval] = useState<number>(0);
  const lastQuotes = useSelector(selectLastQuotes);
  const selectRef = useRef<any>(null);

  const interval = useGetInterval();

  useEffect(() => {
    if (selected && selectRef.current) {
      selectRef.current.focus();
    }
  }, [selected]);

  const handleSelect = (value: string) => {
    setIsModalOpen(true);
    const asset: IQuote | undefined = lastQuotes.find(
      (quote) => quote.ticker === value
    );
    setAsset(asset);
  };

  const handleUpdateInterval = async () => {
    const message = await useUpdateInterval(newInterval * 1000);
    console.log("🚀 ~ data:", message);
  };

  return (
    <Layout.Header style={headerStyle}>
      <SelectAsset
        selectRef={selectRef}
        isOpen={selected}
        onSelect={handleSelect}
        onClick={() => setSelected((prev) => !prev)}
        placeholder="select an asset to see the dynamics"
      />
      <Flex style={{ flexDirection: "column", width: "35%" }}>
        <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
          Indicators are updated every {interval / 1000} sec.
        </Text>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                paddingBlock: 5,
              },
            },
          }}
        >
          <Input.Search
            type="number"
            placeholder="set new interval in seconds ..."
            enterButton="Update"
            size="middle"
            prefix={<ClockCircleOutlined />}
            onChange={(evt) => setNewInterval(parseInt(evt.target.value, 10))}
            onSearch={handleUpdateInterval}
          />
        </ConfigProvider>
      </Flex>
      {asset && (
        <AssetInfoModal
          isModalOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          asset={asset}
        />
      )}
    </Layout.Header>
  );
};
