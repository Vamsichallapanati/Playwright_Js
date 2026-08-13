const {test,expect} = require("@playwright/test");
// uploading single file
test('upload_files',async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.click('#file-upload');
    await page.locator('#file-upload').setInputFiles("C:/Users/Vamsikrishna/Documents/New Text Document.txt");
    await page.waitForTimeout(3000);
})

// multiple file uploading
test.only('multi_file_upload',async ({page})=>{
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.click("#filesToUpload");
    await page.locator('#filesToUpload').setInputFiles(['C:\\Users\\Vamsikrishna\\Documents\\New Text Document (2).txt',
        "C:\\Users\\Vamsikrishna\\Documents\\New Text Document.txt"]);
        await page.waitForTimeout(3000);
        await expect(page.locator("#fileList li:nth-child(1)")).toHaveText("New Text Document (2).txt");
        await expect(page.locator("#fileList li:nth-child(2)")).toHaveText("New Text Document.txt");
        // removing files
        await page.locator("#filesToUpload").setInputFiles([]);
        await expect(page.locator("#fileList li")).toHaveText("No Files Selected");
        await page.waitForTimeout(3000);
})