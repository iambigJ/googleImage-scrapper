import puppeteer from 'puppeteer-core';
import Image from "./Database/image.entity";
import fs from 'fs'

export async function downloadImages(searchQuery: string, maxImages: number): Promise<string[]> {
    let browser
    let imageUrls: string[] = [];

    try {
        browser = await puppeteer.launch({
            headless: false,
            executablePath: '/usr/bin/chromium-browser'
        });

        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=${searchQuery}&tbm=isch`);
        await page.setViewport({ width: 1200, height: 800 });

        const imageSources = await page.evaluate((maxImages) => {
            const elements = document.querySelectorAll('.rg_i');
            const imageSources = [];
            for (const element of elements) {
                const imageUrl = element.getAttribute('src');
                if (imageUrl && imageSources.length < maxImages) {
                    imageSources.push(imageUrl);
                }
            }
            return imageSources;
        }, maxImages);

        imageUrls = imageSources;
    } catch (err) {
        console.error(`ERROR from scraping image: ${err}`);
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    return imageUrls;
}

// Example usage
