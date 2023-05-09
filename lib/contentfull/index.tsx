import axios from "axios";

const spaceId = process.env.SPACE_ID;
const accessToken = process.env.ACCESS_TOKEN;

export const getProducts = async () => {
  const res = await fetch(
    `http://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}`
  );
  const data = await res.json();
  console.log("loging data", data);
  return data.items;
  // const res = await axios.get(
  //   `http://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}`
  // );
  // const data = res.data;
  // console.log("loging data", data);
  // return data.items;
};
