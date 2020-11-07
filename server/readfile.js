const fs = require('fs');
// console.log(result);

function loadFile(fileName){
    let contents = fs.readFileSync(fileName);

    console.log(contents);
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
    let i = 1;
    for(let line of otherLines){
        
        let items = line.split(' ');
        // Order line 
        if(items.length == 3){
            let order = items.map(i => parseInt(i));
            orderList.push(order);
        }
        // res line
        else{
            let resMapLine = [];
            for(let item of items){
                let robots = [];
                let linkid = NaN;
                if(item === 'K'){
                    linkid = 0;
                    robots= [1,2];
                }
                else if(item === 'A' || item==='0'){
                    linkid = i++;
                }
                resMapLine.push({tile:item, robots:robots, linkid:linkid});
            }
            resMap.push(resMapLine);
        }
    }


    let linkList = [];
    for(let i=0; i<resMap.length; i++){
        for(let j=0; j<resMap[i].length; j++){
            item = resMap[i][j];
            if(!isNaN(item.linkid)){
                let linkid = item.linkid;
                let accidentTime = 0;
                let adjacentTables = [];
                let adjacentLinks = [];
                if(item.tile === 'A'){
                    accidentTime = metaInf.waitTime;
                }
                

                let adjacentNodes = getAdjacentNodes(i, j, resMap);
                for(let node of adjacentNodes){
                    if (isNaN(node.linkid)){
                        adjacentTables.push(parseInt(node.tile));
                    }
                    else {
                        adjacentLinks.push(parseInt(node.linkid));
                    }
                }

                linkList.push({id:linkid, accidentTime:accidentTime, adjacentTables:adjacentTables, adjacentLinks:adjacentLinks});
            }
        }
    }

    return {metaInf:metaInf, resMap:resMap, orderList:orderList, linkList:linkList};
}

function getAdjacentNodes(i, j, resMap){
    let adjacentNodes = [];
    if(i-1 > -1){
        adjacentNodes.push(resMap[i-1][j]);
    }
    if(i+1 < resMap.length){
        adjacentNodes.push(resMap[i+1][j]);
    }
    if(j-1 > -1){
        adjacentNodes.push(resMap[i][j-1]);
    }
    if(j+1 < resMap[i].length){
        adjacentNodes.push(resMap[i][j+1]);
    }
    return adjacentNodes;
}

module.exports = {
    loadFile
}