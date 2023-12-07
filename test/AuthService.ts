import { Amplify } from "aws-amplify";
import * as dotenv from "dotenv";
dotenv.config();
import { ResourcesConfig } from "@aws-amplify/core";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { getCurrentUser, signIn, type SignInInput } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
const awsRegion = "ap-south-1";

const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.USER_POOL_ID as string,
      userPoolClientId: process.env.USER_POOL_CLIENT_ID as string,
    },
  },
};

Amplify.configure(config);

export class AuthService {
  public async login(userName: string, password: string) {
    const result = await signIn({
      username: userName,
      password: password,
    });
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString();
  }

  public async generateTemporaryCredentials(user: any) {
    const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/eu-west-1_azOXLiuLi`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: "eu-west-1:5b2b0567-17ce-4070-b540-3e4688c46f43",
        logins: {
          [cognitoIdentityPool]: jwtToken,
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
