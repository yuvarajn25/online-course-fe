import Auth from "@aws-amplify/auth";

const awsExports = {
  Auth: {
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_CLIENT_POOL_ID,
    mandatorySignIn: true,
  },
  aws_appsync_graphqlEndpoint: import.meta.env.VITE_APPSYNC_URL,
  aws_appsync_region: import.meta.env.VITE_REGION,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  API: {
    graphql_headers: async () => ({
      Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
    }),
  },
  Storage: {
    AWSS3: {
      bucket: import.meta.env.VITE_S3_BUCKET,
      region: import.meta.env.VITE_REGION,
    },
  },
};

export default awsExports;
