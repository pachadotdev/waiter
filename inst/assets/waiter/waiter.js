function get_offset(element) {
  var elementPosition = {};

  //set width
  elementPosition.width = element.offsetWidth;
  //set height
  elementPosition.height = element.offsetHeight;

  //calculate element top and left
  var _x = element.offsetLeft;
  var _y = element.offsetTop;
  if(isNaN(_x))
    _x = 0;
  if(isNaN(_y))
    _y = 0;
  //set top
  elementPosition.top = _y;
  //set left
  elementPosition.left = _x;

  return elementPosition;
}

function show_waiter(id, html, color){
  // declare
  var dom,
      width,
      height,
      exists = false;
  
  // get parent
  dom = document.getElementById(id);
  if(dom == undefined){
    console.log("Cannot find", id);
    return ;
  }

  el = get_offset(dom); // get dimensions

  // check if overlay exists
  dom.childNodes.forEach(function(el){
    if(el.className === 'waiter-overlay')
      exists = true;
  });

  if(exists === true){
    console.log("waiter on", id, "already exists");
    return;
  }
  hide_recalculate(id);

  // create overlay
  var overlay = document.createElement("DIV");
  // create overlay content
  var overlay_content = document.createElement("DIV");
  // insert html
  overlay_content.innerHTML = html;
  overlay_content.classList.add("waiter-overlay-content");

  // add styles
  overlay.style.height = el.height + 'px';
  overlay.style.width = el.width + 'px';
  overlay.style.top = el.top + 'px';
  overlay.style.left = el.left + 'px';
  overlay.style.backgroundColor = color;
  overlay.style.position = "absolute";
  overlay.style.zIndex = 999;
  overlay.classList.add("waiter-overlay");

  // append overlay content in overlay
  overlay.appendChild(overlay_content);

  // append overlay to dom
  dom.appendChild(overlay);
  
}

function hide_waiter(id){

  var dom = document.getElementById(id);

  var overlay = dom.getElementsByClassName("waiter-overlay");

  if(overlay.length > 0)
    dom.removeChild(overlay[0]);
  else
    console.log("no waiter on", id);

}

function update_waiter(id, html){

  var dom = document.getElementById(id);

  var overlay = dom.getElementsByClassName("waiter-overlay-content");

  if(overlay.length > 0)
    overlay[0].innerHTML = html;
  else
    console.log("no waiter on", id);
  
}

function hide_recalculate(id){
  var css = '#' + id + '.recalculating {opacity: 1.0 !important; }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}