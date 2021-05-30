import { API } from "aws-amplify";

export async function execGQL(query, variables) {
  try {
    const data = await API.graphql({ query, variables });
    return data;
  } catch (err) {
    console.log({ err });
    throw err;
  }
}
