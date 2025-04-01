import { Injectable } from "@nestjs/common";
import { exec } from 'child_process';

@Injectable()
export class CurlProviderService {
  constructor() { }

  async get(url: string) {
    const curlCommand = `curl --location '${url}' \
      --header 'Accept: */*' \
      --header 'Connection: keep-alive' \
      --header 'User-Agent: : Guilgb ebea34f4ec16' \
      `;
    try {
      const response = await this.executeCurlCommand(curlCommand);
      const data = JSON.parse(response);
      return data;
    } catch (error) {
      throw new Error(`Failed to get: ${error.message}`);
    }
  }

  private async executeCurlCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${stderr}`);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}   