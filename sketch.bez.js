const Settings = {
    nodes: {
        radius: 10,
        color: [33, 150, 243],
        falloff: 900e-3
    },
    edges: {
        weight: 1,
        color: [33-30, 150-30, 243-30],
        impulseColor: [220, 220, 255],
        impulseRadius: 10
    }
};

muscles = ['MVU', 'MVL', 'MDL', 'MVR', 'MDR']
musDleft = ['MDL07', 'MDL08', 'MDL09', 'MDL10', 'MDL11', 'MDL12', 'MDL13', 'MDL14', 'MDL15', 'MDL16', 'MDL17', 'MDL18', 'MDL19', 'MDL20', 'MDL21', 'MDL22', 'MDL23']
musVleft = ['MVL07', 'MVL08', 'MVL09', 'MVL10', 'MVL11', 'MVL12', 'MVL13', 'MVL14', 'MVL15', 'MVL16', 'MVL17', 'MVL18', 'MVL19', 'MVL20', 'MVL21', 'MVL22', 'MVL23']
musDright = ['MDR07', 'MDR08', 'MDR09', 'MDR10', 'MDR11', 'MDR12', 'MDR13', 'MDR14', 'MDR15', 'MDR16', 'MDR17', 'MDR18', 'MDR19', 'MDR20', 'MDL21', 'MDR22', 'MDR23']
musVright = ['MVR07', 'MVR08', 'MVR09', 'MVR10', 'MVR11', 'MVR12', 'MVR13', 'MVR14', 'MVR15', 'MVR16', 'MVR17', 'MVR18', 'MVR19', 'MVR20', 'MVL21', 'MVR22', 'MVR23']


class Edge {
    constructor(opts) {
        this.from = opts.from,
        this.speed = opts.speed,
        this.weight = opts.weight || Settings.edges.weight;
        this.to = opts.to;
        this.color = opts.color || Settings.edges.color;

        this.impulseColor = opts.impulseColor || Settings.edges.impulseColor;
        this.impulseRadius = opts.impulseRadius || Settings.edges.impulseRadius;

        this.a0 = {
            x: (this.from.x + this.to.x) / 2,
            y: this.from.y// + to.y / 2,
        };
        this.a1 = {
            x: this.to.x,// + to.x / 2,
            y: (this.from.y + this.to.y) / 2,
        };

        this.currentAPs = new Set();
    }

    startAP() {
        this.currentAPs.add(1 * (new Date()));
    }

    frame() {
        this.render();
    }

    render() {
        this.currentAPs.forEach(ap => {
            let timedif = (1 * (new Date())) - ap;
            if (timedif < this.speed) {
                let x = bezierPoint(
                    this.from.x, this.a0.x,
                    this.a1.x, this.to.x,
                    timedif / this.speed
                );
                let y = bezierPoint(
                    this.from.y, this.a0.y,
                    this.a1.y, this.to.y,
                    timedif / this.speed
                );
                noStroke();
                fill(...this.impulseColor)
                ellipse(x, y, this.impulseRadius, this.impulseRadius);
            } else {
                this.currentAPs.delete(ap);
            }
        })
        // if (this.lastAPStart) {
        //     let timedif = (1 * (new Date())) - this.lastAPStart;
        //     if (timedif < this.speed) {
        //         let x = bezierPoint(
        //             this.from.x, this.a0.x,
        //             this.a1.x, this.to.x,
        //             timedif / this.speed
        //         );
        //         let y = bezierPoint(
        //             this.from.y, this.a0.y,
        //             this.a1.y, this.to.y,
        //             timedif / this.speed
        //         );
        //         noStroke();
        //         fill(...this.impulseColor)
        //         ellipse(x, y, this.impulseRadius, this.impulseRadius);
        //     } else {
        //         this.lastAPStart = undefined;
        //     }
        // }
        strokeWeight(1);
        noFill();
        stroke(this.color);
        bezier(
            this.from.x, this.from.y,
            this.a0.x, this.a0.y,
            this.a1.x, this.a1.y,
            this.to.x, this.to.y
        );
    }
}


class Node {
    constructor(opts) {
        this.x = opts.x;
        this.y = opts.y;
        this.weight = opts.weight || 1;
        this.name = opts.name;
        this.radius = opts.radius || Settings.nodes.radius;
        this.color = opts.color || Settings.nodes.color;
        this.excitation = opts.initialExcitation || 30;
        this.falloff = opts.falloff || Settings.nodes.falloff;
        this.edges = [];
    }

    excite(ex) {
        if (this.excitation < 90)
            this.excitation += ex;
    }

    registerEdge(edge) {
        this.edges.push(edge);
    }

    frame() {
        this.excitation *= this.falloff;
        if (this.excitation >= 90) {
            for (let edge in this.edges) {
                this.edges[edge].startAP();
                setTimeout(() => {
                    nodes[this.edges[edge].to.name].excite(100 * this.edges[edge].weight);
                }, this.edges[edge].speed);
            }
        }
        this.render();
    }

    render() {
        noStroke();
        fill(...this.color);
        ellipse(this.x, this.y, this.radius, this.radius);

        // Excitation:
        fill(200, 210, 250);
        let excitationRadius = this.radius * (
            this.excitation / 100
        );
        ellipse(this.x, this.y, excitationRadius, excitationRadius);


        textFont("Hand-Light");
        textSize(70);
        // text("Node " + this.name, this.x + 20, this.y - 20);

        line(this.excitation)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let nodes = {};
let edges = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let n in graph.nodes) {
        graph.nodes[n].x = graph.nodes[n].x * windowWidth + 10;
        graph.nodes[n].y = graph.nodes[n].y * windowHeight + 10;
        let newNode = graph.nodes[n];
        if (graph.nodes[n].name[0] == "M") {
            newNode.color = [243, 50, 23];
            newNode.impulseColor = [243, 250, 133];
        }
        nodes[graph.nodes[n].name] = new Node(newNode);
    }
    for (let e in graph.edges) {
        let newEdge = new Edge({
            from: graph.nodes[graph.edges[e].from],
            to: graph.nodes[graph.edges[e].to],
            speed: graph.edges[e].speed,
            weight: graph.edges[e].weight,
        });
        nodes[graph.nodes[graph.edges[e].from].name].registerEdge(newEdge);
        edges.push(newEdge);
    }
}

function draw() {
    background(60, 50);
    for (let e in edges) {
        edges[e].frame();
    }
    for (let n in nodes) {
        nodes[n].frame();
    }
}

function keyPressed() {
    if (keyCode === 49) {
        nodes["FLPR"].excite(200);
        nodes["FLPL"].excite(200);
        nodes["ASHL"].excite(200);
        nodes["ASHR"].excite(200);
        nodes["IL1VL"].excite(200);
        nodes["IL1VR"].excite(200);
        nodes["OLQDL"].excite(200);
        nodes["OLQDR"].excite(200);
        nodes["OLQVR"].excite(200);
        nodes["OLQVL"].excite(200);
    }
    if (keyCode === 50) {
        nodes[11].excite(100);
    }
    if (keyCode === 51) {
        nodes[1].excite(100);
        nodes[11].excite(100);
    }
}
