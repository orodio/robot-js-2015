const MIN_X = MIN_Y = 0
const MAX_X = MAX_Y = 4
const NORTH = "NORTH"
const EAST  = "EAST"
const SOUTH = "SOUTH"
const WEST  = "WEST"

function xIsValid(x: number): boolean {
  return x >= MIN_X
      && x <= MAX_X
}

function yIsValid(y: number): boolean {
  return y >= MIN_Y
      && y <= MAX_Y
}

function headingIsValid(h: string): boolean {
  let valids = [NORTH,WEST,EAST,SOUTH];
  _loop: while (true) {
    if (!valids.length)     return false;
    if (h === valids.pop()) return true;
    continue _loop;
  }
}

function isValidPlacement(x: number, y: number,h: string): boolean {
  return xIsValid(x)
      && yIsValid(y)
      && headingIsValid(h)
}

export default class Robot {
  place(x: number, y: number, h: string): Robot {
    if(!isValidPlacement(x,y,h)) return this;
    this._x = x;
    this._y = y;
    this._h = h;
    return this;
  }

  move(): Robot {
    let {_x: x, _y: y, _h: h} = this;
    switch (h) {
      case NORTH: return this.place(x, ++y, h);
      case SOUTH: return this.place(x, --y, h);
      case EAST:  return this.place(++x, y, h);
      case WEST:  return this.place(--x, y, h);
      default:    return this;
    }
  }

  left(): Robot {
    let {_x: x, _y: y, _h: h} = this;
    switch (h) {
      case NORTH: return this.place(x,y,WEST);
      case WEST:  return this.place(x,y,SOUTH);
      case SOUTH: return this.place(x,y,EAST);
      case EAST:  return this.place(x,y,NORTH);
      default:    return this;
    }
  }

  right(): Robot {
    let {_x: x, _y: y, _h: h} = this;
    switch (h) {
      case NORTH: return this.place(x,y,EAST);
      case WEST:  return this.place(x,y,NORTH);
      case SOUTH: return this.place(x,y,WEST);
      case EAST:  return this.place(x,y,SOUTH);
      default:    return this;
    }
  }

  report(): string {
    let {_x: x, _y: y, _h: h} = this;

    if(notPlaced(x,y,h)) return "Robot is not placed";

    return `${x},${y},${h}`;
  }
}

function notPlaced(x: number, y: number, h: string): boolean {
  return undefined === x
      || undefined === y
      || undefined === h
}
