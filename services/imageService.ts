export const getProfileImage = (file: any) => {
  if (file && file == "string") return file;
  if (file && file == "object") return file.uri;

  return require("../assets/images/defaultAvatar.png");
};
