o = "o"
oC = "oC"
oC02 = "oC02"
oS = "oS"
oS02 = "oS02"
const graph = {
    edges: [
        // Adder 1
        { from: 1, to: 2, weight: 1, speed: 500 },
        { from: 2, to: 3, weight: 0.50, speed: 500 },
        { from: 1, to: 4, weight: 1, speed: 500 },
        { from: 4, to: 3, weight: 0.50, speed: 500 },

        { from: 11, to: 12, weight: 1, speed: 500 },
        { from: 12, to: 13, weight: 0.50, speed: 500 },
        { from: 11, to: 14, weight: 1, speed: 500 },
        { from: 14, to: 13, weight: 0.50, speed: 500 },

        { from: 11, to: 3, weight: 0.5, speed: 990 },
        { from: 1, to: 13, weight: 0.5, speed: 990 },

        { from: 3, to: oS, weight: 1, speed: 500 },
        { from: 13, to: oS, weight: 1, speed: 500 },


        { from: 1, to: 21, weight: 1, speed: 500 },
        { from: 11, to: 22, weight: 1, speed: 500 },
        { from: 21, to: 23, weight: 0.50, speed: 500 },
        { from: 22, to: 23, weight: 0.50, speed: 500 },

        { from: 23, to: oC, weight: 0.50, speed: 500 },


        // Adder 2
        { from: 102, to: 202, weight: 1, speed: 500 },
        { from: 202, to: 302, weight: 0.50, speed: 500 },
        { from: 102, to: 402, weight: 1, speed: 500 },
        { from: 402, to: 302, weight: 0.50, speed: 500 },

        { from: 1102, to: 1202, weight: 1, speed: 500 },
        { from: 1202, to: 1302, weight: 0.50, speed: 500 },
        { from: 1102, to: 1402, weight: 1, speed: 500 },
        { from: 1402, to: 1302, weight: 0.50, speed: 500 },

        { from: 1102, to: 302, weight: 0.5, speed: 990 },
        { from: 102, to: 1302, weight: 0.5, speed: 990 },

        { from: 302, to: oS02, weight: 1, speed: 500 },
        { from: 1302, to: oS02, weight: 1, speed: 500 },


        { from: 102, to: 2102, weight: 1, speed: 500 },
        { from: 1102, to: 2202, weight: 1, speed: 500 },
        { from: 2102, to: 2302, weight: 0.50, speed: 500 },
        { from: 2202, to: 2302, weight: 0.50, speed: 500 },

        { from: 2302, to: oC02, weight: 0.50, speed: 500 },


    ],
    nodes: {
        // XOR 1 2
        1: { name: 1, x: 0.5 * 100, y: 0.5 * 100 },
        2: { name: 2, x: 0.5 * 155, y: 0.5 * 194 },
        3: { name: 3, x: 0.5 * 255, y: 0.5 * 244 },
        4: { name: 4, x: 0.5 * 305, y: 0.5 * 350 },

        11: { name: 11, x: 0.5 * 300 + 100, y: 0.5 * 100 },
        12: { name: 12, x: 0.5 * 300 + 155, y: 0.5 * 194 },
        13: { name: 13, x: 0.5 * 300 + 255, y: 0.5 * 244 },
        14: { name: 14, x: 0.5 * 300 + 305, y: 0.5 * 350 },

        // AND 1 2
        21: { name: 21, x: 0.5 * 400, y: 0.5 * 200 },
        22: { name: 22, x: 0.5 * 800, y: 0.5 * 200 },
        23: { name: 23, x: 0.5 * 600, y: 0.5 * 500 },

        oS: { name: oS, x: 0.5 * 1000, y: 0.5 * 600 },
        oC: { name: oC, x: 0.5 * 700, y: 0.5 * 600 },

        // XOR 102 1102
        102: { name: 102, x: 400 + 0.5 * 100, y: 0.5 * 100 },
        202: { name: 202, x: 400 + 0.5 * 155, y: 0.5 * 194 },
        302: { name: 302, x: 400 + 0.5 * 255, y: 0.5 * 244 },
        402: { name: 402, x: 400 + 0.5 * 305, y: 0.5 * 350 },

        // AND 102 1102
        1102: { name: 1102, x: 400 + 0.5 * 300 + 100, y: 0.5 * 100 },
        1202: { name: 1202, x: 400 + 0.5 * 300 + 155, y: 0.5 * 194 },
        1302: { name: 1302, x: 400 + 0.5 * 300 + 255, y: 0.5 * 244 },
        1402: { name: 1402, x: 400 + 0.5 * 300 + 305, y: 0.5 * 350 },

        // AND 102 1102
        2102: { name: 2102, x: 400 + 0.5 * 400, y: 0.5 * 200 },
        2202: { name: 2202, x: 400 + 0.5 * 800, y: 0.5 * 200 },
        2302: { name: 2302, x: 400 + 0.5 * 600, y: 0.5 * 500 },

        oS02: { name: oS02, x: 400 + 0.5 * 1000, y: 0.5 * 600 },
        oC02: { name: oC02, x: 400 + 0.5 * 700, y: 0.5 * 600 },
    }
};


const Settings = {
    nodes: {
        radius: 10,
        color: [33, 150, 243],
        falloff: 900e-3
    },
    edges: {
        weight: 1,
        color: [33 - 30, 150 - 30, 243 - 30],
        impulseColor: [220, 220, 255],
        impulseRadius: 10
    }
};


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
        strokeWeight(4);
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


        // textFont("Hand-Light");
        // textSize(70);
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
        nodes[graph.nodes[n].name] = new Node(graph.nodes[n]);
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
        nodes[1].excite(100);
    }
    if (keyCode === 50) {
        nodes[11].excite(100);
    }
    if (keyCode === 51) {
        nodes[1].excite(100);
        nodes[11].excite(100);
    }
    if (keyCode === 52) {
        nodes[102].excite(100);
    }
    if (keyCode === 53) {
        nodes[1102].excite(100);
    }
    if (keyCode === 54) {
        nodes[102].excite(100);
        nodes[1102].excite(100);
    }
}
