var GitHubApi = require('github');
var webPageTest = require('webpagetest')
const wpt = new webPageTest('www.webpagetest.org', process.env.WEBPAGETEST_API_KEY)
var myRepo = 'performstagram'
var myOwner = 'ixl123'
var dataAsMarkdown = '';
var github = new GitHubApi({
    debug: true,
    protocol: 'https',
    host: 'api.github.com',
    headers: {
        'user-agent': 'My-Cool-GitHub-App'
    },
    Promise: require('bluebird'),
    followRedirects: false,
    timeout: 5000
});
github.authenticate({type: 'oauth', token: process.env.GIT_TOKEN})

var script = wpt.scriptToString([
    {
        navigate: 'https://performstagram-ec72e.firebaseapp.com/sign-in'
    }, {
        execAndWait: `document.querySelector('button[data-reactid=".0.1.0.3"]').click()`
    },
    'waitForComplete'
])

wpt.runTest(script, {
    video: true,
    pollResults: 5,
    timeout: 600
}, function (err, result) {
    console.log(err || result);
    if (result) {
        convertToMarkdown(result);
    }

})
const humanFileSize = (size) => {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

const convertToMarkdown = (result) => {
    console.log('FIRSTVIEW Load time:', result.data.average.firstView.loadTime)
    console.log('FIRSTVIEW First byte:', result.data.average.firstView.TTFB)
    console.log('FIRSTVIEW Start render:', result.data.average.firstView.render)
    console.log('FIRSTVIEW Speed Index:', result.data.average.firstView.SpeedIndex)
    console.log('FIRSTVIEW DOM elements:', result.data.average.firstView.domElements)
    console.log('FIRSTVIEW VisualComplete:', result.data.average.firstView.visualComplete)

    console.log('(FIRSTVIEW Doc complete) Requests:', result.data.average.firstView.requestsDoc)
    console.log('(FIRSTVIEW Doc complete) Bytes in:', result.data.average.firstView.bytesInDoc)

    console.log('(FIRSTVIEW Fully loaded) Time:', result.data.average.firstView.fullyLoaded)
    console.log('(FIRSTVIEW Fully loaded) Requests:', result.data.average.firstView.requestsFull)
    console.log('(FIRSTVIEW Fully loaded) Bytes in:', result.data.average.firstView.bytesIn)

    console.log('FIRSTVIEW Waterfall view:', result.data.runs['1'].firstView.steps[1].images.waterfall)

    dataAsMarkdown = `

# Asset Sizes
## firstView sign in
| File | FileSize | 
|----------|----------|
 ${result
        .data
        .runs['1']
        .firstView
        .steps[0]
        .requests
        .map(request => `${request.url}|${humanFileSize(request.bytesIn)} \r\n`)
        .join('')}
## firstView grid
| File | FileSize | 
|----------|----------|
 ${result
        .data
        .runs['1']
        .firstView
        .steps[1]
        .requests
        .map(request => `${request.url}|${humanFileSize(request.bytesIn)} \r\n`)
        .join('')}
# VisualMetrics
## Metrics Average
| View | Time to First Byte |  Render Started  |  Visualy Completed | SpeedIndex | Load Time |
|----------|----------|:-------------:|------:| ------:|------:|
FirstView  | ${result
        .data
        .average
        .firstView
        .TTFB} | ${result
        .data
        .average
        .firstView
        .render} | ${result
        .data
        .average
        .firstView
        .visualComplete} | ${result
        .data
        .average
        .firstView
        .SpeedIndex} | ${result
        .data
        .average
        .firstView
        .loadTime} |  
RepeatView | ${result
        .data
        .average
        .repeatView
        .TTFB} | ${result
        .data
        .average
        .repeatView
        .render} | ${result
        .data
        .average
        .repeatView
        .visualComplete} | ${result
        .data
        .average
        .repeatView
        .SpeedIndex} | ${result
        .data
        .average
        .repeatView
        .loadTime} |  
# Waterfall

## firstView
![alt text](${result
        .data
        .runs['1']
        .firstView
        .steps[0]
        .images
        .waterfall})

## repeatView
![alt text](${result
        .data
        .runs['1']
        .firstView
        .steps[1]
        .images
        .waterfall})

# FilmStrip
## SignIn First View
${result
        .data
        .runs[1]
        .firstView
        .steps[0]
        .videoFrames
        .map(item => `
| ${item.time} milliseconds|
|--------------|
| ![alt text](${item.image})|
| ${item.VisuallyComplete}|
    `)
        .join('')}
        

## Grid FirstView 
${result
        .data
        .runs['1']
        .firstView
        .steps[1]
        .videoFrames
        .map(item => `
| ${item.time} milliseconds|
|--------------|
| ![alt text](${item.image})|
| ${item.VisuallyComplete}|
    `)
        .join('')}
    `
    /**
     * first get all commits
     * then get latest
     * and push webpagetest results as comment to latest commit
     */

    github
        .repos
        .getCommits({owner: myOwner, repo: myRepo})
        .then((allCommits) => {
            return github
                .repos
                .createCommitComment({owner: myOwner, repo: myRepo, sha: allCommits[0].sha, body: dataAsMarkdown});
        })
        .catch((error) => {
            console.log(`ERROR could either not get commits of the repo ${myRepo} of the owner ${myOwner}
            or could not sent the commit to the repositorie ERRORMSG: ${error}
            `);
        });

}