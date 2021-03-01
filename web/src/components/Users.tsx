import { List, Avatar, Button, Skeleton } from "antd";

// const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const UsersList = (props: { users: Array<any> }) => {
  return (
    <List
      //   className="demo-loadmore-list"
      itemLayout="horizontal"
      //   loadMore={props.users}/
      dataSource={props.users}
      renderItem={(item: any) => {
        return (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            {/* <Skeleton avatar title={false} active> */}
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
            {/* </Skeleton> */}
          </List.Item>
        );
      }}
    />
  );
};

export default UsersList;
