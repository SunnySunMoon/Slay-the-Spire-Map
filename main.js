function Linklist (val) {
    this.val = val;
    this.next = null;
}

function StSMap () {
    this.length = 16;
    this.levelsArr = [];
}

//every level can only have 2-5 nodes
StSMap.prototype.createNodesNum = function () {
    let id = 1;
    for (let i=0; i<this.length-1; i++) {
        let level = [];
        for (let j=0; j<5; j++) {
            level.push ({
                type: this.assignNodeType(),
                next1: null, //every node can split into two paths
                next2: null,
                level: i+1,
                connected: false,
                id: id++
            });
        }
        this.levelsArr.push(level);
    }
    for( let i=0; i<this.levelsArr[0].length; i++) {
        this.levelsArr[0][i].connected = true;
    }
    this.levelsArr.push([{type: 5, level: this.length}])
}

//assign a type to the node
StSMap.prototype.assignNodeType = function () {
    return Math.random() < 0.4 ? 0 : (Math.random()<0.5 ? 1 : (Math.random()<0.5 ? 2 :  (Math.random()<0.5 ? 3 : 4)));
}

//build paths
StSMap.prototype.buildPaths = function () {
    //this flag record which node(index) in the next level is the newest connected
    for (let i=0; i<this.length-2; i++) {
        let nodeConnected = {
            index: 0,
            connectedNodesNum: 0 ,
            //if this node has connected to two nodes in last level, it cannot be connected from last level's remaining nodes any longer
        }; 
        for (let j=0; j<this.levelsArr[i].length; j++) {
            if (!this.levelsArr[i][j].connected && i!=0) {
                continue;
            }
            //firstly, determine whether this node will connect to the new node in the next level.
            if ((Math.random() <= 0.25 || nodeConnected.index==2) && j!=0) { //it will
                nodeConnected.index++;
                nodeConnected.connectedNodesNum = 0;
            } else { } //it won't, then keep this index

            //secondly, determine whether this node will split its path
            if (Math.random() <= 0.25) { //it will
                this.levelsArr[i][j].next1 = this.levelsArr[i+1][nodeConnected.index];
                this.levelsArr[i+1][nodeConnected.index].connected = true;
                nodeConnected.index++;
                if (nodeConnected.index > 5) {
                    break;
                }
                this.levelsArr[i][j].next2 = this.levelsArr[i+1][nodeConnected.index];
                console.log(nodeConnected.index)
                this.levelsArr[i+1][nodeConnected.index].connected = true;
                nodeConnected.connectedNodesNum = 1;
            } else { //it won't
                this.levelsArr[i][j].next1 = this.levelsArr[i+1][nodeConnected.index];
                nodeConnected.connectedNodesNum++;
                if (nodeConnected.index > 5) {
                    break;
                }
                this.levelsArr[i+1][nodeConnected.index].connected = true;
            }
        }
    }
    for (let i=0; i<this.levelsArr[this.levelsArr.length-2].length; i++) {
        //let all of the last but one level's nodes' next1 refer to the last node.
        if (this.levelsArr[this.levelsArr.length-2][i].connected) {
            this.levelsArr[this.levelsArr.length-2][i].next1 = this.levelsArr[this.levelsArr.length-1][0];
        }
    }
}

//remve nodes unconnected
StSMap.prototype.shakeTree = function () {
    for (let i=0; i<this.levelsArr.length; i++) {
        for (let j=0; j<this.levelsArr[i].length; j++) {
            if (!this.levelsArr[i][j].connected) {
                this.levelsArr[i].splice(j,1);
                j--;
            }
        }
    }
}