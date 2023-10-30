import puppeteer from 'puppeteer-core';

async function downloadImages(searchQuery, maxImages) {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${searchQuery}&tbm=isch`);
    await page.setViewport({ width: 1200, height: 800 });

    const image_src = await page.evaluate((maxImages) => {
        const elements = document.querySelectorAll('.rg_i');
        const imageSources = [];
        console.log(typeof elements)
        for (const element of elements) {
            const imageUrl = element.getAttribute('src');
            if (imageUrl && imageSources.length < maxImages) {
                imageSources.push(imageUrl);
            }
        }
        return imageSources;
    }, maxImages);
    return image_src
    page.close()
}

(async () => {
    const x = await downloadImages('cats', 10);
    console.log(x);
})();