import { FC, Fragment } from "react";
import { Button, Divider, Drawer, Flex, Typography } from "antd";

interface DeletedAssetsModal {
  deletedQuotes: string[];
  handleRestore: (ticker: string) => void;
  selectedTrash: boolean;
  onClose: () => void;
}

export const DeletedAssetsModal: FC<DeletedAssetsModal> = ({
  deletedQuotes,
  handleRestore,
  selectedTrash,
  onClose,
}) => {
  return (
    <Drawer
      title="Deleted quotes"
      open={selectedTrash}
      onClose={() => onClose()}
      destroyOnClose
      style={{ flexDirection: "column", gap: "16px" }}
      styles={{
        wrapper: {
          width: 480,
        },
      }}
    >
      <Flex style={{ flexDirection: "column", gap: "16px" }}>
        {deletedQuotes.map((ticker: string) => {
          return (
            <Fragment key={ticker}>
              <Flex
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {ticker}
                </Typography.Title>
                <Button type="primary" onClick={() => handleRestore(ticker)}>
                  Restore
                </Button>
              </Flex>
              <Divider style={{ margin: 0 }} />
            </Fragment>
          );
        })}
      </Flex>
    </Drawer>
  );
};
