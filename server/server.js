const app = require('express')();
const http = require('http').createServer(app);
const parser = require('socket.io-json-parser');
const io = require('socket.io')(http, { parser });

let robot1Info = {
  charge: 100,
  position: 'K', // Start in kitchen
  currentOrder: undefined,
  timeElapsedAtCurrentPosition: 0
}
let robot2Info = {
  charge: 100,
  position: 'K', // Start in kitchen
  currentOrder: undefined,
  timeElapsedAtCurrentPosition: 0
}

let runTime = 0;


io.on('connection', socket =>
{
  socket.on('request', msg =>
  {
    const response = msg.toUpperCase();
    socket.emit('response', response);
  });
  socket.on('disconnect', () => { });
});

http.listen(process.env.PORT || 4000, () =>
{
  console.log('listening on:', http.address());
});


function updateGraphAndSendToClient(socket, restaurantSpecs, restaurantMap, orderList)
{
  // forEach order we will 'pass' off an order to a robot.
  // When a robot recieves an order, From wherever it is (will start at kitchen everytime would be expected) map out its next step wherever that is. Iterate until robot reaches destination, once there, iterate back to kitchen.
  if (robot1Info.currentOrder == undefined)
  {
    // Give a new order to robot
    let order = getNewOrder(orderList);
    robot1Info.currentOrder = order;
  }
  let destinationPosition = restaurantMap.filter(function (value) { return value.adjacentTables.includes(robot1Info.currentOrder.position); });

  let nextPosition = determineNextPosition(robot1.position, destinationPosition, restaurantMap, restaurantSpecs);

  // Now update everything for robot 1 since we know it is where it needs to go.

}

function determineNextPosition(robotPosition, destinationPosition, restaurantMap, restaurantSpecs)
{
  let ourMap = restaurantMap;
  let dist = new Array(restaurantMap.length);
  let previous = new Array(restaurantMap.length);
  restaurantMap.forEach(function (value, index, array)
  {
    dist[value.id] = 9999999;
    previous[value.id] = undefined;
  });

  dist[robotPosition] = restaurantSpecs.passTime;
  while (ourMap.length > 0)
  {
    let mapLinkId = smallestNodeInGraph(ourMap, dist);
    ourMap = ourMap.filter(function (value)
    {
      if (value.id != mapLinkId)
      {
        return true;
      }
      return false;
    });
    neighboursOfNode(restaurantMap, mapLinkId).forEach(function (idOfAdjacent)
    {
      let alt = dist[mapLinkId] + distanceBetween(mapLinkId, idOfAdjacent, restaurantSpecs.passTime);
      if (alt < dist[idOfAdjacent])
      {
        dist[idOfAdjacent] = alt;
        previous[idOfAdjacent] = mapLinkId;
      }
    });

  }
  // At this point, we should be able to take the previous array and determine the next position the robot should move by finding the id of previous[id] == robotPosition.

}

function neighboursOfNode(map, linkId)
{
  map.forEach(function (value)
  {
    if (value.id == linkId)
    {
      return value.adjacentTables;
    }
  })
}

function distanceBetween(idA, idB, restaurantMap, passTime)
{
  restaurantMap.forEach(function (value)
  {
    if (value.id == idA)
    {
      // To calc the distance between two nodes, we somehow have to say if a robot is not there time = accidentTime * accident? + passTime;
      let time = passTime;
      if (value.numRobots == 0)
      {
        let randomChance = Math.random() * 10;
        if (randomChance < 3)
        {
          // At this point, we know an accident is going to occur.
          restaurantMap.forEach(function (value, id, arr)
          {
            if (value.id == idB)
            {
              if (restaurantMap[id].accidentTimeElapsed == undefined)
              {
                time += restaurantMap[id].accidentTime;
                restaurantMap[id].accidentTimeElapsed = 0;
              }
              else
              {
                time += restaurantMap[id].accidentTimeElapsed;
              }
            }
          });
        }
      }
      return time;
    };

  })
  return 100000;  // This should hopefully account for any errors should we get here.
}