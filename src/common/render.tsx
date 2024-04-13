import { UserInformation } from "../config/redux/slide/user-slice";

export const isAdmin = (info: UserInformation): boolean => {
  return info.appRole.roleName === "ROLE_ADMIN";
};

export const isLogin = (info: UserInformation) => {
  return info.userName !== "";
};

export async function getByteArray(f: any) {
  let byteArray = await fileToByteArray(f);
  return byteArray;
}

function fileToByteArray(file: any) {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      let fileByteArray: any = [];
      reader.readAsArrayBuffer(file);
      reader.onloadend = (evt: any) => {
        if (evt.target.readyState == FileReader.DONE) {
          let arrayBuffer = evt.target.result;
          let array: any = new Uint8Array(arrayBuffer);
          for (const byte of array) {
            fileByteArray.push(byte);
          }
        }
        resolve(fileByteArray);
      };
    } catch (e) {
      reject(e);
    }
  });
}
