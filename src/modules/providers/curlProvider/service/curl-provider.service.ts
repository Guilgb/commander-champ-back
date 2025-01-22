import { Injectable } from "@nestjs/common";
import { exec } from 'child_process';

@Injectable()
export class CurlProviderService {
  constructor() { }

  async get(url: string) {
    const curlCommand = `curl --location '${url}' \
      --header 'Accept: */*' \
      --header 'Connection: keep-alive' \
      --header 'User-Agent: PostmanRuntime/7.43.0' \
      --header 'Host: api.moxfield.com' \
      --header 'Date: Wed, 22 Jan 2025 18:57:06 GMT' \
      --header 'Content-Type: application/json;charset=utf-8' \
      --header 'Transfer-Encoding: chunked' \
      --header 'Cache-Control: no-store' \
      --header 'Request-Context: appId=cid-v1:c8984016-78b2-499d-b263-0a8e085fe0a6' \
      --header 'CF-Cache-Status: BYPASS' \
      --header 'Vary: Accept-Encoding' \
      --header 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' \
      --header 'X-Content-Type-Options: nosniff' \
      --header 'X-Frame-Options: SAMEORIGIN' \
      --header 'X-XSS-Protection: 1; mode=block' \
      --header 'Server: cloudflare' \
      --header 'CF-RAY: 9061c48e8d77cb4d-GIG' \
      --header 'Content-Encoding: br' \
      --header 'access-control-allow-credentials: true' \
      --header 'access-control-allow-origin: https://moxfield.com' \
      --header 'access-control-expose-headers: ETag,X-Deck-Version,X-Public-Deck-ID,X-Deck-Has-Changed,x-moxfield-version' \
      --header 'cache-control: no-store' \
      --header 'cf-cache-status: BYPASS' \
      --header 'cf-ray: 9061bdd0ca0acab3-GIG' \
      --header 'content-encoding: br' \
      --header 'content-type: text/plain' \
      --header 'date: Wed, 22 Jan 2025 18:52:30 GMT' \
      --header 'request-context: appId=cid-v1:c8984016-78b2-499d-b263-0a8e085fe0a6' \
      --header 'server: cloudflare' \
      --header 'strict-transport-security: max-age=31536000; includeSubDomains; preload' \
      --header 'vary: Origin, Accept-Encoding' \
      --header 'x-content-type-options: nosniff' \
      --header 'x-frame-options: SAMEORIGIN' \
      --header 'x-xss-protection: 1; mode=block'`;
    try {
      const response = await this.executeCurlCommand(curlCommand);
      const data = JSON.parse(response);
      return data;
    } catch (error) {
      console.log(url)
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