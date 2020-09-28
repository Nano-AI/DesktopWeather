const puppeteer = require('puppeteer');
    puppeteer
        .launch()
        .then(browser => (_browser = browser))
        .then(browser => (_page = browser.newPage()))
        .then(page => page.goto('https://www.google.com/search?q=what+is+the+weather'))
        .then(() => _page)
        .then(page => {
            var output = page.evaluate(() => {
                var elements = {};
                var elm_ids = ["wob_loc", "wob_tci", "wob_tm", "wob_dc"];
                for (var i = 0; i < elm_ids.length; i++) {
                    switch (elm_ids[i]) {
                        case "wob_tci":
                            elements[elm_ids[i]] = document.getElementById(elm_ids[i]).src;
                            break;
                        default:
                            elements[elm_ids[i]] = document.getElementById(elm_ids[i]).innerHTML;
                            break;
                    }
                }
                return elements;
            });
            return output;
        })
        .then((output) => {
            _browser.close();
            console.log(output)
        });