//TODO:
//Join class based on google classroom link

//Get attributes from a selector:
//const attr = await page.$eval('SELECTOR', el => el.getAttribute('ATTRIBUTE'))
//console.log(attr)

//Modules for automation
const classRoutine = require("./classes.js");
const fs = require("fs");
const { launch, getStream } = require("puppeteer-stream");

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

//Discord modules
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_PRESENCES",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
  ],
});

//Constants
const TOKEN = "";
const DUMP_CHANNEL = "877211120673390602";

//Oooops
function getBDTime() {
  return new Date();
}

//Promise based sleep
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getClass(routine) {
  //Check and return class, if any
  let options = {
    weekday: "long",
  };
  let day = new Intl.DateTimeFormat("en-US", options).format(getBDTime());

  let classDay = routine.classRoutine.find((days) => days.name === day);

  if (classDay !== undefined) {
    let ongoingClass = classDay.classes.find(
      (subject) =>
        getBDTime() - new Date(subject.startTime) < 2520000 &&
        getBDTime() - new Date(subject.startTime) > 0
    );

    return ongoingClass;
  }
}

//Function to join the class and record
async function joinAndRecord(currentClass) {
  return new Promise(async (resolve, reject) => {
    //Initialise puppeteer browser
    const browser = await launch({
      headless: false,
      args: ["--start-maximized"],
      ignoreDefaultArgs: ["--mute-audio"],
    });

    //Login to account
    const loginPage = await browser.newPage();
    await loginPage.setViewport({
      width: 0,
      height: 0,
    });
    await loginPage.goto("https://accounts.google.com/");
    await sleep(1000);

    await loginPage.waitForSelector('input[type = "email"]');
    await loginPage.type('input[type = "email"]', "mail");

    await Promise.all([
      loginPage.waitForNavigation(),
      await loginPage.keyboard.press("Enter"),
    ]);
    await sleep(1000);

    await loginPage.waitForSelector('input[type="password"]', {
      visible: true,
    });
    await loginPage.type('input[type="password"]', "pass");

    await Promise.all([
      loginPage.waitForNavigation(),
      await loginPage.keyboard.press("Enter"),
    ]);
    await sleep(1000);

    await loginPage.close();

    //GOTO google classroom
    //GET HREF ATTRIBUTE FROM THE JOIN BUTTON

    //Setting up permissions
    const context = browser.defaultBrowserContext();
    await context.clearPermissionOverrides();

    //Allowing camera and microphone
    context.overridePermissions(currentClass.links, ["camera"]);
    context.overridePermissions(currentClass.links, ["microphone"]);

    //Initialise new page to join the class
    const page = await context.newPage();
    await page.setViewport({
      width: 0,
      height: 0,
    });
    await page.goto(currentClass.links);
    await sleep(1000);

    //Turn off the camera
    await page.waitForSelector(
      "#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.B2Jb7d.Up8vH.hFEqNb.J9Nfi.iWO5td > div.R6Lfte.es33Kc.TNczib.X1clqd > div.bZWIgd > div",
      {
        visible: true,
      }
    );
    await sleep(1000);
    await page.click(
      "#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.B2Jb7d.Up8vH.hFEqNb.J9Nfi.iWO5td > div.R6Lfte.es33Kc.TNczib.X1clqd > div.bZWIgd > div"
    );

    //Turn off the microphone
    await page.waitForSelector(
      "#yDmH0d > c-wiz > div > div > div:nth-child(9) > div.crqnQb > div > div > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div",
      {
        visible: true,
      }
    );
    await sleep(1000);
    await page.click(
      "#yDmH0d > c-wiz > div > div > div:nth-child(9) > div.crqnQb > div > div > div.vgJExf > div > div > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div"
    );

    //Join the class
    await page.waitForSelector(
      "#yDmH0d > c-wiz > div > div > div:nth-child(9) > div.crqnQb > div > div > div.vgJExf > div > div > div.d7iDfe.NONs6c > div > div.Sla0Yd > div > div.XCoPyb > div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt",
      {
        visible: true,
      }
    );
    await sleep(1000);
    await page.click(
      "#yDmH0d > c-wiz > div > div > div:nth-child(9) > div.crqnQb > div > div > div.vgJExf > div > div > div.d7iDfe.NONs6c > div > div.Sla0Yd > div > div.XCoPyb > div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt"
    );

    //Sleep for some time
    await sleep(5000);

    //Determine for how much milliseconds the recording should take place
    let classTimeRemaining =
      new Date(currentClass.startTime).valueOf() + 2520000 - Date.now();

    //Create recording file
    let random = Buffer.from(Math.random().toString())
      .toString("base64")
      .substr(10, 5);
    let classTime = new Date(currentClass.startTime)
      .toISOString()
      .slice(0, 10)
      .toString();
    const file = fs.createWriteStream(
      `${classTime}-${random}-${currentClass.name}.webm`
    );

    //Start record
    const stream = await getStream(page, {
      audio: true,
      video: true,
      audioBitsPerSecond: 128000,
    });
    console.log("Recording");

    //Dump recorded content
    stream.pipe(file);

    setTimeout(async () => {
      //Stop record
      await stream.destroy();
      file.close();

      console.log("Finished");

      let returnData = {
        status: "SUCCESS",
        file: file,
      };

      await page.close();
      resolve(returnData);
    }, classTimeRemaining);
  });
}

//Function to upload the video
async function upload(videoFile) {
  return new Promise(async (resolve, reject) => {
    //Initialise puppeteer browser
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
      ignoreDefaultArgs: ["--mute-audio"],
    });

    //Login to account
    const loginPage = await browser.newPage();
    await loginPage.setViewport({
      width: 0,
      height: 0,
    });
    await loginPage.goto("https://accounts.google.com/");
    await sleep(1000);

    await loginPage.waitForSelector('input[type = "email"]');
    await loginPage.type('input[type = "email"]', "mail");

    await Promise.all([
      loginPage.waitForNavigation(),
      await loginPage.keyboard.press("Enter"),
    ]);
    await sleep(1000);

    await loginPage.waitForSelector('input[type="password"]', {
      visible: true,
    });
    await loginPage.type('input[type="password"]', "pass");

    await Promise.all([
      loginPage.waitForNavigation(),
      await loginPage.keyboard.press("Enter"),
    ]);
    await sleep(1000);

    await loginPage.close();

    //Go to youtube
    const youtubePage = await browser.newPage();
    await youtubePage.setViewport({
      width: 0,
      height: 0,
    });
    await youtubePage.goto(
      "https://studio.youtube.com/channel/UCoon6FtfoQy2Gkgy7gzj1Xg/videos/upload"
    );
    await sleep(1000);

    //Upload the video
    await youtubePage.waitForSelector("#create-icon", {
      visible: true,
    });
    await sleep(1000);
    await youtubePage.click("#create-icon");

    await youtubePage.waitForSelector("#text-item-0 > ytcp-ve", {
      visible: true,
    });
    await sleep(1000);
    await youtubePage.click("#text-item-0 > ytcp-ve");

    await youtubePage.waitForSelector("#select-files-button");
    await sleep(1000);

    const [fileChooser] = await Promise.all([
      youtubePage.waitForFileChooser(),
      youtubePage.click("#select-files-button"),
    ]);
    await sleep(1000);

    await fileChooser.accept([videoFile]);

    //Grab the link
    await youtubePage.waitForSelector(
      "#details > ytcp-video-metadata-editor-sidepanel > ytcp-video-info > div > div.row.style-scope.ytcp-video-info > div.left.style-scope.ytcp-video-info > div.value.style-scope.ytcp-video-info > span > a",
      {
        visible: true,
      }
    );
    await sleep(1000);
    let element = await youtubePage.$(
      "#details > ytcp-video-metadata-editor-sidepanel > ytcp-video-info > div > div.row.style-scope.ytcp-video-info > div.left.style-scope.ytcp-video-info > div.value.style-scope.ytcp-video-info > span > a"
    );
    let videoLink = (
      await youtubePage.evaluate((el) => el.textContent, element)
    )
      .toString()
      .trim();

    //Turn off made for kids
    await youtubePage.waitForSelector(
      "#audience > ytkc-made-for-kids-select > div.made-for-kids-rating-container.style-scope.ytkc-made-for-kids-select > tp-yt-paper-radio-group > tp-yt-paper-radio-button:nth-child(2)",
      {
        visible: true,
      }
    );
    await sleep(1000);
    await youtubePage.click(
      "#audience > ytkc-made-for-kids-select > div.made-for-kids-rating-container.style-scope.ytkc-made-for-kids-select > tp-yt-paper-radio-group > tp-yt-paper-radio-button:nth-child(2)"
    );

    //Proceed
    await youtubePage.waitForSelector('ytcp-button[id="next-button"]');
    await sleep(1000);
    await youtubePage.click('ytcp-button[id="next-button"]');

    //And repeat two times
    await youtubePage.waitForSelector('ytcp-button[id="next-button"]');
    await sleep(1000);
    await youtubePage.click('ytcp-button[id="next-button"]');

    await youtubePage.waitForSelector('ytcp-button[id="next-button"]');
    await sleep(1000);
    await youtubePage.click('ytcp-button[id="next-button"]');

    //Unlist the video
    await youtubePage.focus(
      "#privacy-radios > tp-yt-paper-radio-button:nth-child(12)"
    );
    await sleep(1000);
    await youtubePage.click(
      "#privacy-radios > tp-yt-paper-radio-button:nth-child(12)"
    );

    //And upload it
    await youtubePage.waitForSelector(
      'ytcp-button[id="done-button"]:not([disabled])'
    );
    await sleep(1000);
    await youtubePage.click('ytcp-button[id="done-button"]:not([disabled])');

    //Get upload information
    await youtubePage.waitForSelector(
      "#dialog > div.content.style-scope.ytcp-dialog > div > ytcp-video-upload-progress",
      {
        visible: true,
      }
    );
    await sleep(1000);
    let statusElement = await youtubePage.$(
      "#dialog > div.content.style-scope.ytcp-dialog > div > ytcp-video-upload-progress"
    );
    let status = (
      await youtubePage.evaluate((el) => el.textContent, statusElement)
    )
      .toString()
      .trim();

    //Wait until video has been uploaded
    while (status.includes("Uploading") === true) {
      statusElement = await youtubePage.$(
        "#dialog > div.content.style-scope.ytcp-dialog > div > ytcp-video-upload-progress"
      );
      status = (
        await youtubePage.evaluate((el) => el.textContent, statusElement)
      )
        .toString()
        .trim();
    }

    //Send the upload data
    let returnData = {
      status: "SUCCESS",
      link: videoLink,
    };

    resolve(returnData);
  });
}

//Function to send the video link
async function sendLink(link) {
  return new Promise(async (resolve, reject) => {
    client.login(TOKEN);

    client.on("error", (error) => {
      console.log("An error occured.");
    });

    client.on("ready", async () => {
      console.log(`I am online as ${client.user.tag}.`);
      await client.channels.cache.get(DUMP_CHANNEL).send(link);
      client.destroy();

      console.log("Sent the link");

      //Send the upload data
      let returnData = {
        status: "SUCCESS",
      };

      resolve(returnData);
    });
  });
}

(async () => {
  while (true) {
    await sleep(1000);

    let ongoingClass = getClass(classRoutine);

    if (typeof ongoingClass === typeof undefined) {
      console.log("No classes are ongoing right now");
    } else {
      console.log(`${ongoingClass.name} is ongoing right now`);
      let data = await joinAndRecord(ongoingClass);

      //Upload the file
      if (data.status.toString() === "SUCCESS") {
        let videoData = await upload(data.file.path);
        if (videoData.status.toString() === "SUCCESS") {
          //Share the link
          let sendStatus = await sendLink(videoData.link.toString());

          if (sendStatus.status === "SUCCESS") {
            //Delete the file
            try {
              fs.unlinkSync(data.file.path);
            } catch (err) {
              console.log(err);
            }

            //Sleep for a minute to keep CPU load to a minimum
            console.log("Sleeping for a minute");
            await sleep(60000);
          }
        }
      }
    }
  }
})();
