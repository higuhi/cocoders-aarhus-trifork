import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { request, RequestOptions } from "https";
import { IncomingMessage } from "http";

const sendRequest = async (options: RequestOptions, payload: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const req = request(options, (res: IncomingMessage) => {
            let buffer = "";
            res.on("data", (chunk: string) => { buffer += chunk; });
            res.on("end", () => resolve(JSON.parse(buffer)));
        });
        req.on("error", (e: any) => reject(new Error(e.message)));
        req.write(JSON.stringify(payload));
        req.end();
    });
};

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const requestOptions: RequestOptions = {
        host: "covid-api.mmediagroup.fr",
        port: 443,
        path: "/v1/cases?country=France",
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    };

    const responseBody = await sendRequest(requestOptions, "");

    return {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };
};
