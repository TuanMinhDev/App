export const Url = (path) => {
  const domain = "http://10.0.2.2:4000/api/";
  return domain + path;
};

class APIConfig {
  static LOGIN = "user/login";
  static CREATE_USER = "user/create";
  static GET_USER = "user/get";
}

export default APIConfig;
