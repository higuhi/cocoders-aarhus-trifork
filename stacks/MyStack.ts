import { Api, ReactStaticSite, StackContext, Table } from "@serverless-stack/resources";

export const MyStack = ({ stack }: StackContext): void => {
    // Create the table
    const table = new Table(stack, "Counter", {
        fields: {
            counter: "string"
        },
        primaryIndex: { partitionKey: "counter" }
    });

    // Create the HTTP API
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                // Allow the API to access the table
                permissions: [table],
                // Pass in the table name to our API
                environment: {
                    tableName: table.tableName
                }
            }
        },
        routes: {
            "GET /{isoCode}": "functions/covid.handler"
        }
    });

    // Deploy our React app
    const site = new ReactStaticSite(stack, "ReactSite", {
        path: "frontend",
        environment: {
            REACT_APP_API_URL: api.url
        }
    });

    // Show the URLs in the output
    stack.addOutputs({
        SiteUrl: site.url,
        ApiEndpoint: api.url
    });
};
