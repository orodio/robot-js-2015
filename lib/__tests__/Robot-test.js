jest.dontMock("../Robot");

describe("Robot", function() {
  var robot, Robot;

  beforeEach(function() {
    Robot = require("../Robot")
    robot = new Robot()
  });

  it("can be placed: 0,0,NORTH", function() {
    robot.place(0,0,"NORTH")

    expect(robot.report()).toBe("0,0,NORTH")
  });

  it("can be placed: 1,1,NORTH", function() {
    robot.place(1,1,"NORTH")

    expect(robot.report()).toBe("1,1,NORTH")
  });

  it("can be placed: 2,2,SOUTH", function() {
    robot.place(2,2,"SOUTH")

    expect(robot.report()).toBe("2,2,SOUTH")
  });

  it("can be placed multiple times, last time is the correct placement", function() {
    robot.place(0,0,"NORTH").place(1,1,"EAST").place(2,2,"SOUTH")

    expect(robot.report()).toBe("2,2,SOUTH")
  });

  it("lets you know if it isnt placed", function() {
    expect(robot.report()).toBe("Robot is not placed")
  });

  it("is bound to a 5 by 5 table", function() {
    robot.place(-1,0,"NORTH")
    expect(robot.report()).toBe("Robot is not placed")

    robot.place(0,-1,"NORTH")
    expect(robot.report()).toBe("Robot is not placed")

    robot.place(5,0,"NORTH")
    expect(robot.report()).toBe("Robot is not placed")

    robot.place(0,5,"NORTH")
    expect(robot.report()).toBe("Robot is not placed")
  });

  it("can only face NORTH,EAST,SOUTH,WEST", function() {
    [ "north", "n", 
      "east",  "e", 
      "south", "s",
      "west",  "w",
      "dog", "cat", "boop", 4, 5
    ].forEach(function(h) {
      robot.place(0,0,h)
      expect(robot.report()).toBe("Robot is not placed")
    });
  });

  it("can move NORTH", function() {
    robot.place(2,2,"NORTH").move();

    expect(robot.report()).toBe("2,3,NORTH")
  });

  it("can move SOUTH", function() {
    robot.place(2,2,"SOUTH").move()

    expect(robot.report()).toBe("2,1,SOUTH")
  });

  it("can move EAST", function() {
    robot.place(2,2,"EAST").move()

    expect(robot.report()).toBe("3,2,EAST")
  });

  it("can move WEST", function() {
    robot.place(2,2,"WEST").move()

    expect(robot.report()).toBe("1,2,WEST")
  });

  it("can turn left", function() {
    [ ["NORTH", "WEST"]
    , ["WEST",  "SOUTH"]
    , ["SOUTH", "EAST"]
    , ["EAST",  "NORTH"]
    ].forEach(function(h) {
      robot.place(0,0,h[0]).left();
      expect(robot.report()).toBe("0,0,"+h[1]);
    });
  });

  it("can turn left", function() {
    [ ["NORTH", "EAST"]
    , ["WEST",  "NORTH"]
    , ["SOUTH", "WEST"]
    , ["EAST",  "SOUTH"]
    ].forEach(function(h) {
      robot.place(0,0,h[0]).right();
      expect(robot.report()).toBe("0,0,"+h[1]);
    });
  });

  it("can NOT move out of bounds", function() {
    robot.place(0,0,"SOUTH").move();
    expect(robot.report()).toBe("0,0,SOUTH");

    robot.place(0,0,"WEST").move();
    expect(robot.report()).toBe("0,0,WEST");

    robot.place(4,4,"NORTH").move();
    expect(robot.report()).toBe("4,4,NORTH");

    robot.place(4,4,"EAST").move();
    expect(robot.report()).toBe("4,4,EAST");
  });
});
