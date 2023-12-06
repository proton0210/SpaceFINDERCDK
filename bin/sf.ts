import { App } from "aws-cdk-lib";

import { DataStack } from "../src/infra/stacks/DataStack";
import { LambdaStack } from "../src/infra/stacks/LambdaStack";
import { ApiStack } from "../src/infra/stacks/ApiStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  spacesTable: dataStack.spacesTable,
});
new ApiStack(app, "ApiStack", {
  spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration,
});
