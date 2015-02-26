const MIN_X = MIN_Y = 0
const MAX_X = MAX_Y = 4
const NORTH = "NORTH"
const EAST  = "EAST"
const SOUTH = "SOUTH"
const WEST  = "WEST"

const RULES = {
  NORTH: {x:  0, y:  1, left: WEST,  right: EAST},
  EAST:  {x:  1, y:  0, left: NORTH, right: SOUTH},
  SOUTH: {x:  0, y: -1, left: EAST,  right: WEST},
  WEST:  {x: -1, y:  0, left: SOUTH, right: NORTH}
}

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
    continue _loop
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
    this.x = x
    this.y = y
    this.h = h
    return this
  }

  move(): Robot {
    let {x, y, h} = this
    let rs        = RULES[h];
    return this.place(x + rs.x, y + rs.y, h);
  }

  left(): Robot {
    let {x, y, h} = this
    let rs        = RULES[h];
    return this.place(x, y, rs.left);
  }

  right(): Robot {
    let {x, y, h} = this
    let rs        = RULES[h];
    return this.place(x, y, rs.right);
  }

  report(): string {
    let {x, y, h} = this

    if(notPlaced(x,y,h)) return "Robot is not placed";

    return `${x},${y},${h}`
  }
}

function notPlaced(x: number, y: number, h: string): boolean {
  return undefined === x
      || undefined === y
      || undefined === h
}
