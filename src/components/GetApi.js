
export const GetApi = (url, header) => {
  const data = fetch(url, header).then((res) => res.json());


  if (data.code == 200) {
    return data;
  }
  if (data.code != 200) {
    return data;
  }
};
