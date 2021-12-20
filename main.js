const puppeteer = require('puppeteer');  //import puppeteer

const loginLink = 'https:/www.hackerrank.com/auth/login';
const codesObj = require('./codes');

//open chromimum browser
let browserOpen = puppeteer.launch({        //initialize puppeteer
    headless:false,                        //browser visible
    args:['-start-maximized'],             //chrome browser open full screen
    defaultViewport:null
})

//tab of web browser

let page;
browserOpen.then(function(borwserObj){
   let  BrowserOpenPromise = borwserObj.newPage();
   return BrowserOpenPromise;
}).then(function(newTab){
   
    page = newTab;
    //visit hackerrank login page
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function(){

    let emailEntered = page.type("input[id='input-1']","baljeet32verma@gmail.com",{delay:50});
    return emailEntered;

}).then(function(){

    let passEntered = page.type("input[type='password']","32@Sharda",{delay:50});
    return passEntered;

}).then(function(){
   let loginButtonClick = page.click("button[data-analytics='LoginPassword']",{delay:20});
    return loginButtonClick;
}).then(function(){
    let clickOnALgo = waitAndClick(".topic-card a[data-attr1='algorithms']",page);
    return clickOnALgo;

}).then(function(){
    let gotoWramUp = waitAndClick("input[value='warmup']",page);
    return gotoWramUp;

}).then(function(){
    
    let waitfor5sec = page.waitFor(5000);
    return waitfor5sec;

}).then(function(){

    let allChallangePromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:30})
    return allChallangePromise;
}).then(function(quesArray){
    console.log(quesArray.length);
    let quesWillBeSolvePromise = quesSolver(page, quesArray[0], codesObj.ans[0]);
    return quesWillBeSolvePromise;
     
})
.catch(function(err){
    console.log(err);
});



function waitAndClick(selector,currpage)
{
    return new Promise (function(resolve,reject){
        let waitForModelPromise =currpage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModal =currpage.click(selector);
            return clickModal;
        }).then(function(){
            resolve(); 
        }).catch(function(err){
            reject();
        })
    })
}

function quesSolver(page,ques,ans)
{
    return new Promise(function(resolve, reject){
        let quesClikced = ques.click();

        quesClikced.then(function(){
            let textEditorinFocus = waitAndClick(".monaco-editor.no-user-select.vs",page);
            return textEditorinFocus;
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page);
        }).then(function(){
            return page.type('textarea.custominput',ans,{delay:10})
        }).then(function(){
            let ctrlIspressed = page.keyboard.down('Control');
            return ctrlIspressed;
        }).then(function(){
            let Apressed = page.keyboard.press('A',{delay:100});
            return Apressed;
        }).then(function(){
            let Xpress = page.keyboard.press('X',{delay:100});
            return Xpress;
        }).then(function(){
            let ctrlIsUnpress = page.keyboard.up("Control");
            return ctrlIsUnpress;
        }).then(function(){
            let mainEditorFocus = waitAndClick('.monaco-editor.no-user-select.vs',page);
            return mainEditorFocus;
        }).then(function(){
            let ctrlIspressed = page.keyboard.down('Control');
            return ctrlIspressed;
        }).then(function(){
            let Apressed = page.keyboard.press('A',{delay:100});
            return Apressed;
        }).then(function(){
            let Vpressed = page.keyboard.press('V',{delay:100});
            return Vpressed;
        }).then(function(){
            let ctrlIsUnpress = page.keyboard.up("Control");
            return ctrlIsUnpress;
        }).then(function(){
            console.log("submit");
            return page.click('.hr-monaco-submit',{delay:100});
        }).then(function(){

            resolve();
        }).catch(function(){
            reject();
        });
        

    });
}