const app = require('express')();
const http = require('http').createServer(app);
const parser = require('socket.io-json-parser');
const io = require('socket.io')(http, { parser });
const {loadFile} = require('./readfile');

let robot1Info = {
  charge: 100,
  id: 1,
  position: 0, // Start in kitchen
  currentOrder: undefined,
  timeElapsedAtCurrentPosition: 0
}
let robot2Info = {
  charge: 100,
  id: 2,
  position: 0, // Start in kitchen
  currentOrder: undefined,
  timeElapsedAtCurrentPosition: 0
}

let runTime = 0;
let graphicalMap = [];
let restaurantMap = [];
const originalOrderList = [];
let orderList = [];
let restaurantSpecs = {};

io.on('connection', socket => {
  socket.on('input-file', msg => {
    // TODO use msg to get the file from client
    const { metaInf, resMap, orderList, linkList } = loadFile('./Input1.txt');

    graphicalMap = resMap;
    restaurantMap = linkList;
    originalOrderList = orderList;
    orderList = orderList;
    restaurantSpecs = metaInf;

    setTimeout(1000, function () {
      runTime++;
      updateGraphAndSendToClient(socket, restaurantSpecs, restaurantMap, orderList);
    });

    updateGraphAndSendToClient(socket, restaurantSpecs, restaurantMap, orderList);
  });
  socket.on('restart', function () {

  });
  socket.on('disconnect', () => { });
});

http.listen(process.env.PORT || 4000, () => {
  console.log('listening on:', http.address());
});


const updateGraphAndSendToClient = (socket, restaurantSpecs, restaurantMap, orderList) => {
  restaurantMap = determineNewAccidentAbilities(restaurantMap);
  // forEach order we will 'pass' off an order to a robot.
  // When a robot recieves an order, From wherever it is (will start at kitchen everytime would be expected) map out its next step wherever that is. Iterate until robot reaches destination, once there, iterate back to kitchen.

  [robot1Info, robot2Info].forEach(robot => {

    if (robot.currentOrder == undefined) {
      const order = getNewOrder(orderList);
      robot.currentOrder = order;
    }
    const destPos = restaurantMap.filter(value => value.adjacentTables.includes(robot.currentOrder.position))[0];
    const nextRobotPos = determineNextPosition(robot, destPos, restaurantMap, restaurantSpecs);

    if (robot.timeElapsedAtCurrentPosition >= restaurantMap.filter((value) => value.id == robot.position)[0]) {
      robot.position = nextRobotPos;
    }

    graphicalMap.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (robot.position == [rowIndex, colIndex]) {
          col.robots.push(robot.id)
        }
        else {
          col.robots = [];
        }
      });
    });

    robot.timeElapsedAtCurrentPosition++;
  })
  socket.emit('graph', graphicalMap);
  socket.emit('test', "Hi Ross");
}

function getNewOrder(orderList) {
  let orderToReturn = [];
  let indexToRemove = -1;
  orderList.forEach((order, index) => {
    if (order[0] + order[2] > runTime) {
      orderToReturn = order;
      indexToRemove = index;
    }
  })

  orderList.splice(indexToRemove, 1);
  return orderToReturn;
}

function determineNewAccidentAbilities(restaurantMap) {
  // Go through restaurant map
  // for each accident node, if probability successful, set it to 'active' if no robots are in it.  
  return restaurantMap.map((value, id, arr) => {

    if (!value.accidentActive && value.accidentTime > 0 && Math.random() < 0.3) {
      newVal = {}
      newVal[netPassTime] = value.passTime + value.accidentTime;
      newVal[accidentActive] = true;
      newVal[accidentTimeAccrued] = 0;
      return newVal
    }
    else if (value.accidentActive) {
      // If the accident has been going on for long enough
      value.accidentTimeAccrued++;
      value.netPassTime = value.passTime + (value.accidentTime - value.accidentTimeAccrued);
      if (value.accidentTimeAccrued >= value.netPassTime) {
        value.accidentActive = false;
        value.netPassTime = value.passTime;
      }
    }
    return value
  });
}

function determineNextPosition(robot, destinationPosition, restaurantMap, restaurantSpecs) {
  const ourMap = Object.assign([], restaurantMap);
  const dist = {};
  const previous = {};
  restaurantMap = restaurantMap.map((value, index, array) => {
    dist[value.id] = (Infinity);
    previous[value.id] = (undefined);
  });

  dist[robot.robotPosition] = restaurantSpecs.passTime - robot.timeElapsedAtCurrentPosition;
  while (ourMap.length > 0) {
    const { minId, minIndex } = smallestNodeInGraph(ourMap, dist);
    ourMap.splice(minIndex, 1);

    neighboursOfNode(restaurantMap, minId)
      .forEach((idOfAdjacent) => {
        let alt = dist[minId] + distanceBetween(minId, idOfAdjacent, restaurantSpecs.passTime);
        if (alt < dist[idOfAdjacent]) {
          dist[idOfAdjacent] = alt;
          previous[idOfAdjacent] = minId;
        }
      });
  }

  // At this point, we should be able to take the previous array and determine the next position the robot should move by finding the id of previous[id] == robotPosition.
  let targetIndex = destinationPosition;
  while(previous[targetId] != robot.position)
  {
    targetId = previous[targetId];
  }

  return targetIndex;
}

function smallestNodeInGraph(map, dist) {
  let minDist = Infinity
  let minIndex = -1;
  let minId = -1

  map.forEach(({ id }, index) => {
    if (dist[id] < minDist) {
      minDist = dist[id];
      minIndex = index;
    }
  })
  return { minId, minIndex };
}

function neighboursOfNode(map, linkId) {
  map.forEach(function (value) {
    if (value.id == linkId) {
      return value.adjacentTables;
    }
  })
}

// { linkid: 0,
//   accidentTime: 0,
//   adjacentTables: [],
//   netPassTime: [],
//   accidentActive = true,
//   accidentTimeAccrued = 0,
//   adjacentLinks: [ 8, 1 ] }

function distanceBetween(idA, idB, restaurantMap, passTime) {

  return restaurantMap.forEach(({ id, netPassTime }) => {
    if (id == idB) {
      return netPassTime;
    }
  })
}