import { FC, useEffect, useState, useRef } from "react";

import { Flex, Layout, Typography, Input, ConfigProvider, Tooltip } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { headerStyle } from "./styles";
import { SelectAsset } from "@/components/Common";
import { AssetInfoModal, DeletedAssetsModal } from "@/components/Modals";

import {
  restoreQuote,
  selectDeleted,
  selectLastQuotes,
} from "@/redux/quotesSlice";
import { IQuote } from "@/interfaces";
import { getInterval, updateInterval } from "@/api";
import { TrashIcon } from "../Icons";

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const [selectedAsset, setSelectedAsset] = useState(false);
  const [selectedTrash, setSelectedTrash] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asset, setAsset] = useState<IQuote | undefined>(undefined);
  const [newInterval, setNewInterval] = useState<number>(0);
  const [currentInterval, setCurrentInterval] = useState<number>(0);
  const lastQuotes = useSelector(selectLastQuotes);
  const deletedQuotes = useSelector(selectDeleted);
  const selectRef = useRef<any>(null);

  useEffect(() => {
    const fetchInterval = async () => {
      const currentInterval = await getInterval();
      setCurrentInterval(currentInterval);
    };

    fetchInterval();
  }, []);

  useEffect(() => {
    if (selectedAsset && selectRef.current) {
      selectRef.current.focus();
    }
  }, [selectedAsset]);

  const handleSelect = (value: string) => {
    setIsModalOpen(true);
    const asset: IQuote | undefined = lastQuotes.find(
      (quote) => quote.ticker === value
    );
    setAsset(asset);
  };

  const handleUpdateInterval = async () => {
    if (newInterval < 1) {
      toast.error("New interval can not be less 1 second");
      setNewInterval(0);
      return;
    }
    const updatedIntervalData = await updateInterval(newInterval * 1000);
    setCurrentInterval(newInterval * 1000);
    setNewInterval(0);
    toast.success(updatedIntervalData.message);
  };

  const handleRestore = (ticker: string) => {
    dispatch(restoreQuote(ticker));
  };

  return (
    <Layout.Header style={headerStyle}>
      <SelectAsset
        selectRef={selectRef}
        isOpen={selectedAsset}
        onSelect={handleSelect}
        onClick={() => setSelectedAsset((prev) => !prev)}
        placeholder="select an asset to see the dynamics"
      />
      <Flex style={{ flexDirection: "column", width: "35%" }}>
        <Typography.Text style={{ fontSize: "16px", marginBottom: "10px" }}>
          Indicators are updated every {currentInterval / 1000} sec.
        </Typography.Text>
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
      {deletedQuotes.length > 0 && (
        <Tooltip title={`${deletedQuotes.length} asset(s) in the trash`}>
          <Flex className="trash" onClick={() => setSelectedTrash(true)}>
            <TrashIcon />
          </Flex>
        </Tooltip>
      )}
      {asset && (
        <AssetInfoModal
          isModalOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          asset={asset}
        />
      )}
      <DeletedAssetsModal
        selectedTrash={selectedTrash}
        onClose={() => setSelectedTrash(false)}
        deletedQuotes={deletedQuotes}
        handleRestore={handleRestore}
      />
    </Layout.Header>
  );
};
