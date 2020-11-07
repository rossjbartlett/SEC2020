const fs = require('fs');

function loadFile(fileName){
    let contents = fs.readFileSync(fileName,"utf8");
    let lines = contents.split('\n');
    lines = lines.map(s => s.trim());

    let infoLines =  lines.slice(0,4);
    let otherLines = lines.slice(4, lines.length);


    // Meta information 
    let metaInf = {
        passTime: parseInt(infoLines[0]),
        waitTime: parseInt(infoLines[1]),
        handoverTime: parseInt(infoLines[2]),
        deliveryPoints: parseInt(infoLines[3])
    }

    let resMap = [];
    let orderList = [];
    for(let line of otherLines){
        let items = line.split(' ');
        if(items.length == 3){
            let order = items.map(i => parseInt(i));
            // console.log(order);

            orderList.push(order);
        }
        else{
            for(let item of items){
                if(item === 'K'){
                    orderList,push({})
                }
                else if(item === 'A'){
                }
                else{
                    console.log(item);
                }
            }
        }
    }
    // console.log(orderList);

    return {metaInf:metaInf, resMap:resMap, orderList:orderList};
}


result = loadFile('Input1.txt');
// console.log(result);