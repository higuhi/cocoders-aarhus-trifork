import { MyStack } from "./MyStack";
import { App } from "@serverless-stack/resources";

export const index = (app: App): void => {
    app.setDefaultFunctionProps({
        runtime: "nodejs16.x",
        srcPath: "services",
        bundle: {
            format: "esm"
        }
    });
    app.stack(MyStack);
};
