import { FC } from "react";
import { Select, Space, ConfigProvider } from "antd";
import { DollarTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { selectAssetWrapperStyle, selectAssetLineStyle } from "./styles";
import { selectLastQuotes } from "@/redux/quotesSlice";
import { IQuote } from "@/interfaces";

interface SelectCoinProps {
  selectRef?: React.RefObject<any> | undefined;
  isOpen?: boolean;
  onSelect: (value: string) => void;
  onClick?: () => void;
  placeholder?: string;
}

export const SelectAsset: FC<SelectCoinProps> = ({
  selectRef,
  isOpen,
  onSelect,
  onClick,
  placeholder,
}) => {
  const lastQuotes = useSelector(selectLastQuotes);

  return (
    <ConfigProvider theme={{ token: selectAssetWrapperStyle }}>
      <Select
        ref={selectRef}
        style={{ minWidth: 250, maxWidth: 400 }}
        open={isOpen}
        onSelect={onSelect}
        onClick={onClick}
        placeholder={placeholder}
        optionLabelProp="label"
        options={lastQuotes.map((quote: IQuote) => ({
          label: quote.ticker,
          value: quote.ticker,
        }))}
        optionRender={(lastQuotes) => (
          <Space style={selectAssetLineStyle}>
            <DollarTwoTone />
            {lastQuotes.data.label}
          </Space>
        )}
      />
    </ConfigProvider>
  );
};
