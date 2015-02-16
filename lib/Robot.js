function notPlaced(x,y,heading) {
  return undefined === x
      && undefined === y
      && undefined === heading
}

function xIsNotValid(x) {
  return 0 > x || x > 4
}

function yIsNotValid(y) {
  return 0 > y || y > 4
}

function headingIsNotValid(heading) {
  return !(/NORTH|WEST|EAST|SOUTH/).test(heading);
}

function notValidPlacement(x,y,heading) {
  return xIsNotValid(x)
      || yIsNotValid(y)
      || headingIsNotValid(heading)
}

export default class Robot {

  place(x,y,heading) {
    if(notValidPlacement(x,y,heading)) return;
    this._x       = x;
    this._y       = y;
    this._heading = heading;
    return this;
  }

  move() {
    let {_x: x, _y: y, _heading: h} = this;

    if(h === "NORTH") this.place(x, y + 1, h);
    if(h === "SOUTH") this.place(x, y - 1, h);
    if(h === "EAST")  this.place(x + 1, y, h);
    if(h === "WEST")  this.place(x - 1, y, h);

    return this;
  }

  left() {
    let {_x: x, _y: y, _heading: h} = this;
    switch (h) {
      case "NORTH": this.place(x,y,"WEST");  break;
      case "WEST":  this.place(x,y,"SOUTH"); break;
      case "SOUTH": this.place(x,y,"EAST");  break;
      case "EAST":  this.place(x,y,"NORTH"); break;
    }
  }

  right() {
    let {_x: x, _y: y, _heading: h} = this;
    switch (h) {
      // case "NORTH": this.place(x,y,"EAST");  break;
      case "WEST":  this.place(x,y,"NORTH"); break;
      case "SOUTH": this.place(x,y,"WEST");  break;
      case "EAST":  this.place(x,y,"SOUTH"); break;
    }
  }

  report() {
    let {_x: x, _y: y, _heading: h} = this;

    if(notPlaced(x,y,h)) return "Robot is not placed";

    return `${x},${y},${h}`;
  }
}
