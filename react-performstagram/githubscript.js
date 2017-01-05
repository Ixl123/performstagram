var GitHubApi = require('github');
var webPageTest = require('webpagetest')

const wpt = new webPageTest('www.webpagetest.org', process.env.WEBPAGETEST_API_KEY)
var dataAsMarkdown = '';
wpt.runTest('https://performstagram-ec72e.firebaseapp.com/', {
    video: true,
    pollResults: 5,
    timeout: 60
}, function (err, result) {
    console.log(result.data.median.firstView.videoFrames);
    convertToMarkdown(result);
})

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

    console.log('FIRSTVIEW Waterfall view:', result.data.runs[1].firstView.images.waterfall)

    dataAsMarkdown = `
# VisualMetrics

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
        .runs[1]
        .firstView
        .images
        .waterfall})

## repeatView
![alt text](${result
        .data
        .runs[1]
        .repeatView
        .images
        .waterfall})

# FilmStrip 
${result
        .data
        .median
        .firstView
        .videoFrames
        .map(item => `
| ${item.time} milliseconds|
|--------------|
| ![alt text](${item.image})|
| ${item.VisuallyComplete}|
    `)
        .join('')}
    `
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
    github.authenticate({type: 'oauth', token: process.env.GIT_TOKEN});
    github
        .repos
        .createCommitComment({
            owner: 'ixl123',
            repo: 'performstagram',
            sha: '43b9f83fd54c303f3acd88566c2c1ecc095c5c8c',
            body: dataAsMarkdown
        }, function (err, res) {
            // console.log(JSON.stringify(res));
        });
}
