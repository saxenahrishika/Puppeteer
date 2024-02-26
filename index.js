const puppeteer = require('puppeteer');

async function run(){
    const browser = await puppeteer.launch({
        headless : false
    });
    const page = await browser.newPage();

    await page.goto('https://www.vesselfinder.com/vessels?type=403');
    // await page.screenshot({path : 'example.png', fullPage: true});

    const obj = await page.evaluate(() => Array.from(document.getElementsByClassName('pagination top bfix') ,
        (e) =>({
            total : e.querySelector('span').innerText,
        }))
    );    
    // console.log(obj);

    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('table td a'));
        return anchors.map(anchor => anchor.href);
    });

    for (const link of links) {
        const newPage = await browser.newPage();
    
        await newPage.goto(link);
        const sections =  await page.evaluate(() => {
            const sections_data = Array.from(document.getElementsByClassName('ship-section'));
            return sections_data.map(data => data)
        })
        // const data = await page.evaluate(() => Array.from(document.querySelectorAll('table'),
        // (e) => ({
        //     td : e.querySelector('td').innerText
        // }))
        // );
        // console.log(data);
    
        await newPage.close();  
    }

    await browser.close();
}

run();


    // const obj = await page.evaluate(() => document.body.innerText);