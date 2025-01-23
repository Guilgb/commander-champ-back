import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  async getMoxfieldDecklist(url: string): Promise<any> {
    console.log(`Fetching URL: ${url}`);
    const response = await this.httpService.get(url);
    const data = await this.getSreper(url);
    return data;
  }

  private async getSreper(url: string) {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-features=BlockInsecurePrivateNetworkRequests',
      ]
    });

    const page = await browser.newPage();
    
    await page.setExtraHTTPHeaders({
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'User-Agent': 'PostmanRuntime/7.43.0',
      'Content-Type': 'application/json;charset=utf-8',
    });

    console.log(`Navigating to URL: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
    } catch (error) {
      console.error(`Failed to navigate to URL: ${url}`, error);
      await browser.close();
      throw error;
    }

    page.on('console', (msg) => console.log("PAGE LOG:", msg.text()));

    await page.evaluate(async () => {
      const acceptButton = document.querySelector('.cookie-accept-button');
      if (acceptButton) {
        (acceptButton as HTMLElement).click();
      }
      
      await new Promise<void>((resolve) => {
        const distance = 100;
        let scrolledAmount = 0;
  
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          scrolledAmount += distance;
  
          if (scrolledAmount >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    const data = await page.evaluate(() => {
      const divContent = Array.from(document.querySelectorAll('.XIi4jFys2lGhYwseGpBo.no-outline.cursor-grab'));
      return divContent.map((content) => ({
        type: content.querySelector('.underline').textContent,
      }));
    });
    
    await browser.close();
    return data.filter((content) => content.type === 'Commander');
  }
}