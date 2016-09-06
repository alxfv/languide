var svg = document.getElementById('svg');

var activeIds = [];

var hoverTitle = document.getElementsByClassName('hover_title')[0];
var pageHeader = 'default';
var settings = {};

if (typeof hoverTitle !== 'undefined') {
  pageHeader = hoverTitle.text.trim();

  var item = localStorage.getItem('languide.activeIds');
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
      item.style['opacity'] = '0.1';
    }
  });

  function setOpacity(path, disable) {
    let id = path.id.match(/[0-9]+/)[0];
    let opacity = '0.1';
    let ids = [id, id + 'a', id + 'c', id + 'd', id + 'e'];

    ids.forEach((id) => {
      var item = doc.getElementById(id);
      if (item !== null) {

        //if (id.substr(-1) === 'e' && disable === false) {
        //  item.style.opacity = '0.5';
        //} else if (id.substr(-1) === 'e' && disable === true) {
        //  item.style.opacity = '0.05';
        //} else {
          item.style.opacity = disable ? opacity : '';
        //}

        //if (disable === true) {
        //  item.style.top = '700px';
        //} else {
        //  item.style.top = '';
        //}
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
      localStorage.setItem('languide.activeIds', JSON.stringify(settings));

      return false;
    }, false);

  };
  Array.from(paths).forEach(pathHandler);

  //document.getElementById('svg').contentDocument.getElementById('29').addEventListener('mouseover', (e) => {
  //  e.stopImmediatePropagation();
  //  e.stopPropagation();
  //  console.log('sdf');
  //});

  Array.from(paths).forEach((path) => {
    let id = path.id;
    console.log(id, activeIds.includes(id));
    if (id !== '' && activeIds.includes(id)) {
      setOpacity(path, true);
    }
  });
});