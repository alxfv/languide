const STORAGE_KEY = 'languide.settings';
const DISABLED_ELEMENT_OPACITY = '0.1';

var svg = document.getElementById('svg');

var activeIds = [];

var hoverTitle = document.getElementsByClassName('hover_title')[0];
var pageHeader = 'default';
var settings = {};

if (typeof hoverTitle !== 'undefined') {
  pageHeader = hoverTitle.text.trim();

  var item = localStorage.getItem(STORAGE_KEY);
  if (item !== null) {
    try {
      json = JSON.parse(item);
      settings = json;

      if (typeof json[pageHeader] !== 'undefined') {
        activeIds = json[pageHeader];
      }
    } catch (e) {
    }
  }
}

//var items = document.getElementById('svg').contentDocument.querySelectorAll('path, ellipse, rect');
//Array.from(items).forEach((item) => {
//  var fill = item.style['fill'];
//  if (typeof fill !== 'undefined' && fill === 'rgb(0, 0, 0)') {
//    item.remove();
//  }
//});

svg.addEventListener('load', () => {
  var doc = svg.contentDocument;
  var paths = doc.querySelectorAll('path, ellipse, rect, polygon');

  Array.from(paths).forEach((item) => {
    var fill = item.style['fill'];
    if (typeof fill !== 'undefined' && fill === 'rgb(0, 0, 0)') {
      //item.style['filter'] = '';
    }

    var opacity = item.style['opacity'];
    if (typeof opacity !== 'undefined' && opacity == '0.5') {
      item.style['opacity'] = DISABLED_ELEMENT_OPACITY;
    }
  });

  function setOpacity(path, disable) {
    let id = path.id.match(/[0-9]+/)[0];
    let ids = [id, id + 'a', id + 'c', id + 'd', id + 'e'];

    ids.forEach((id) => {
      var item = doc.getElementById(id);
      if (item !== null) {

        item.style.opacity = disable ? DISABLED_ELEMENT_OPACITY : '';
      }
    });
  }

  var pathHandler = (path) => {
    path.addEventListener('contextmenu', function (event) {
      event.preventDefault();

      let id = path.id;
      let disable = true;
      if (activeIds.includes(id) === true) {
        disable = false;
        activeIds.splice(activeIds.indexOf(id), 1);
      } else {
        activeIds.push(id);
      }

      setOpacity(path, disable);

      settings[pageHeader] = activeIds;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

      return false;
    }, false);

  };
  Array.from(paths).forEach(pathHandler);

  //document.getElementById('svg').contentDocument.getElementById('29').addEventListener('mouseover', (e) => {
  //  e.stopImmediatePropagation();
  //});

  Array.from(paths).forEach((path) => {
    let id = path.id;

    if (id !== '' && activeIds.includes(id)) {
      setOpacity(path, true);
    }
  });
});