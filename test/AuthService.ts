import { Amplify } from "aws-amplify";

import * as dotenv from "dotenv";
dotenv.config();

import { ResourcesConfig } from "@aws-amplify/core";

import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
} from "@aws-sdk/client-cognito-identity";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { getCurrentUser, signIn, type SignInInput } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

const awsRegion = "ap-south-1";

const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.USER_POOL_ID as string,
      userPoolClientId: process.env.USER_POOL_CLIENT_ID as string,
      identityPoolId: process.env.IDENTITY_POOL_ID as string,
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
    try {
      const jwtToken = user.getSignInUserSession()?.getIdToken().getJwtToken();
      const cognitoIdentityPool = `cognito-idp.ap-south-1:905104588898:identitypool/ap-south-1:d8a17d35-a42b-4615-8fbc-a9c0379a0238`;

      const cognitoIdentity = new CognitoIdentityClient({
        credentials: fromCognitoIdentityPool({
          identityPoolId: "ap-south-1:d8a17d35-a42b-4615-8fbc-a9c0379a0238",
          logins: {
            [cognitoIdentityPool]: jwtToken,
          },
        }),
      });

      const command = new GetCredentialsForIdentityCommand({
        IdentityId: "ap-south-1:d8a17d35-a42b-4615-8fbc-a9c0379a0238",
        Logins: {
          [cognitoIdentityPool]: jwtToken,
        },
      });
      const credentials = await cognitoIdentity.send(command);
      return credentials;
    } catch (error) {
      console.log(`❌❌❌: `, error);
    }
    return null;
  }
}
