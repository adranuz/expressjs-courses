import { Request, Response } from "express";
import { envs } from '../../config/envs';
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export class AwsController {
	constructor() {}
	webhookHandler = async (req: Request, res: Response) => {
		const awsSecret = req.headers["x-secret"] ?? "unknown";
    console.log(awsSecret)
		if (typeof awsSecret === "string") {
			const client = new SecretsManagerClient({
        region: envs.AWS_DEFAULT_REGION,
        credentials: {
          accessKeyId: envs.AWS_ACCESS_KEY_ID ?? "",
          secretAccessKey: envs.AWS_SECRET_ACCESS_KEY ?? "",
        }
      });
      const command = new GetSecretValueCommand({ SecretId: awsSecret });

      try {
        const data = await client.send(command);
			  res.status(202).json(data);

        // const secretString = data.SecretString; // Aquí está tu token
      } catch (error) {
        console.error(error);
        if (!res.headersSent) {
          res.status(500).json({ message: "Error retrieving secret" });
        }
        return;
      }

      // if (!client) {
      //   res.status(400).json({ message: "No client" });
      // }
			// const response = await client.send(
			// 	new GetSecretValueCommand({
      //     SecretId: awsSecret,
			// 	})
			// );
			// console.log(response);
      // if (response.SecretString) {
      //   return response.SecretString;
      // }
    
      // if (response.SecretBinary) {
      //   return response.SecretBinary;
      // }
		}
		res.status(400).json({ message: "No secret provided" });
	};
}