//chrome.browserAction.onClicked.addListener(function(tab) {
//  chrome.tabs.executeScript({
//    code: 'document.body.style.margin="20px"'
//  });
//});
//
//document.addEventListener('DOMContentLoaded', function() {
//  var checkPageButton = document.getElementById('checkPage');
//  checkPageButton.addEventListener('click', function() {
//    chrome.tabs.executeScript(null, {file: "myscripts.js"});
//    chrome.tabs.getSelected(null, function(tab) {
//
//    });
//    // chrome.tabs.getSelected(null, function(tab) {
//    //   d = document;
//
//    //   var f = d.createElement('form');
//    //   f.action = 'http://gtmetrix.com/analyze.html?bm';
//    //   f.method = 'post';
//    //   var i = d.createElement('input');
//    //   i.type = 'hidden';
//    //   i.name = 'url';
//    //   i.value = tab.url;
//    //   f.appendChild(i);
//    //   d.body.appendChild(f);
//    //   f.submit();
//    // });
//  }, false);
//}, false);
//
 document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {


    chrome.tabs.getSelected(null, function(tab) {

      console.log(tab);

       //var f = d.createElement('form');
       //f.action = 'http://gtmetrix.com/analyze.html?bm';
       //f.method = 'post';
       //var i = d.createElement('input');
       //i.type = 'hidden';
       //i.name = 'url';
       //i.value = tab.url;
       //f.appendChild(i);
       //d.body.appendChild(f);
       //f.submit();
     });
  }, false);
}, false);