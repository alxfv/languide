var svg = document.getElementById('svg');

var item = localStorage.getItem('languide.activeIds');
var activeIds = [];
if (item === null) {
  item = '';
} else {
  activeIds = item.split(',')
}
console.log(activeIds);

svg.addEventListener('load', () => {
  var doc = svg.contentDocument;
  var paths = doc.querySelectorAll('path');
  var ellipses = doc.querySelectorAll('ellipse');

  function setOpacity(path, disable) {
    let id = path.id.match(/[0-9]+/)[0];
    let opacity = '0.1';
    let ids = [id, id + 'a', id + 'c', id + 'd', id + 'e'];

    ids.forEach((id) => {
      var item = doc.getElementById(id);
      if (item !== null) {

        if (id.substr(-1) === 'e' && disable === false) {
          item.style.opacity = '0.5';
        } else if (id.substr(-1) === 'e' && disable === true) {
          item.style.opacity = '0.05';
        } else {
          item.style.opacity = disable ? opacity : '';
        }

        if (disable === true) {
          item.style.top = '700px';
        } else {
          item.style.top = '';
        }

        console.log(item.id);
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

      localStorage.setItem('languide.activeIds', activeIds.join(','));

      return false;
    }, false);

  };
  Array.from(paths).forEach(pathHandler);
  Array.from(ellipses).forEach(pathHandler);

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

  Array.from(ellipses).forEach((path) => {
    let id = path.id;
    console.log(id, activeIds.includes(id));
    if (id !== '' && activeIds.includes(id)) {
      setOpacity(path, true);
    }
  });
});