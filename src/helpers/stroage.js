import { Storage } from "aws-amplify";

export async function uploadFile(name, file, progressCallback) {
  try {
    const data = await Storage.put(name, file, {
      progressCallback: progressCallback,
    });
    return data;
  } catch (err) {
    console.log({ err });
    throw err;
  }
}

export async function getFile(key) {
  try {
    const data = await Storage.get(key);
    console.log(`data`, data);
    return data;
  } catch (err) {
    console.log({ err });
    throw err;
  }
}
