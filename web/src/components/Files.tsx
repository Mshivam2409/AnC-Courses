import React from "react";
// import url from "utils/api";
import List from "antd/lib/list";
import {
  FilePdfOutlined,
  FileUnknownOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
// import { UserState } from "store";
import { useRecoilValue } from "recoil";

const Files = (props: { files: string[] }) => {
  // const [FileData,setFileData]
  const data: Array<{ fileId: string; name: string }> = props.files.map(
    (file) => {
      return JSON.parse(file);
    }
  );

  const getIcon = (mime: string) => {
    switch (mime) {
      case "pdf":
        return <FilePdfOutlined />;
      case "doc":
        return <FileWordOutlined />;
      case "zip":
        return <FileZipOutlined />;
      default:
        return <FileUnknownOutlined />;
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item: { fileId: string; name: string }) => (
        <List.Item>
          <List.Item.Meta
            avatar={getIcon(
              item.name.split(".")[item.name.split(".").length - 1]
            )}
            title={
              <a
                download
                href={`${"getFile"}/${item.fileId}?mimeType=${
                  item.name.split(".")[item.name.split(".").length - 1]
                }&token=`}
              >
                {item.name}
              </a>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default Files;
