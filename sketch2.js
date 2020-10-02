const Settings = {
    nodes: {
        radius: 10,
        color: [33, 150, 243],
        falloff: 900e-3
    },
    edges: {
        show: false,
        animate: false,
        weight: 1,
        color: [33 - 30, 150 - 30, 243 - 30],
        impulseColor: [220, 220, 255],
        impulseRadius: 10
    },
    text: {
        show: true,
        size: 10,
        font: "Helvetica"
    }
};

muscles = ['MVU', 'MVL', 'MDL', 'MVR', 'MDR']
musDleft = ['MDL07', 'MDL08', 'MDL09', 'MDL10', 'MDL11', 'MDL12', 'MDL13', 'MDL14', 'MDL15', 'MDL16', 'MDL17', 'MDL18', 'MDL19', 'MDL20', 'MDL21', 'MDL22', 'MDL23']
musVleft = ['MVL07', 'MVL08', 'MVL09', 'MVL10', 'MVL11', 'MVL12', 'MVL13', 'MVL14', 'MVL15', 'MVL16', 'MVL17', 'MVL18', 'MVL19', 'MVL20', 'MVL21', 'MVL22', 'MVL23']
musDright = ['MDR07', 'MDR08', 'MDR09', 'MDR10', 'MDR11', 'MDR12', 'MDR13', 'MDR14', 'MDR15', 'MDR16', 'MDR17', 'MDR18', 'MDR19', 'MDR20', 'MDL21', 'MDR22', 'MDR23']
musVright = ['MVR07', 'MVR08', 'MVR09', 'MVR10', 'MVR11', 'MVR12', 'MVR13', 'MVR14', 'MVR15', 'MVR16', 'MVR17', 'MVR18', 'MVR19', 'MVR20', 'MVL21', 'MVR22', 'MVR23']
mLeft = ['MDL07', 'MDL08', 'MDL09', 'MDL10', 'MDL11', 'MDL12', 'MDL13', 'MDL14', 'MDL15', 'MDL16', 'MDL17', 'MDL18', 'MDL19', 'MDL20', 'MDL21', 'MDL22', 'MDL23', 'MVL07', 'MVL08', 'MVL09', 'MVL10', 'MVL11', 'MVL12', 'MVL13', 'MVL14', 'MVL15', 'MVL16', 'MVL17', 'MVL18', 'MVL19', 'MVL20', 'MVL21', 'MVL22', 'MVL23']
mRight = ['MDR07', 'MDR08', 'MDR09', 'MDR10', 'MDR11', 'MDR12', 'MDR13', 'MDR14', 'MDR15', 'MDR16', 'MDR17', 'MDR18', 'MDR19', 'MDR20', 'MDL21', 'MDR22', 'MDR23', 'MVR07', 'MVR08', 'MVR09', 'MVR10', 'MVR11', 'MVR12', 'MVR13', 'MVR14', 'MVR15', 'MVR16', 'MVR17', 'MVR18', 'MVR19', 'MVR20', 'MVL21', 'MVR22', 'MVR23']


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
        if (Settings.edges.show) {
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
            if (Settings.edges.animate) {
                if (this.lastAPStart) {
                    let timedif = (1 * (new Date())) - this.lastAPStart;
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
                        this.lastAPStart = undefined;
                    }
                }
            }
            strokeWeight(1);
            noFill();
            stroke(this.color);
            /*bezier(
                this.from.x, this.from.y,
                this.a0.x, this.a0.y,
                this.a1.x, this.a1.y,
                this.to.x, this.to.y
            );*/
        }
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

    mouseInRange() {
        return (
            Math.pow(
                Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2),
                0.5
            ) < this.radius
        );
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

        if (Settings.text.show && this.mouseInRange()) {
            textFont(Settings.text.font);
            textSize(Settings.text.size);
            text("" + this.name, this.x + 5, this.y - 5);
        }

        line(this.excitation)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let nodes = {};
let edges = [];
let worm = {};

function setup() {
    createCanvas(windowWidth, windowHeight);

    worm = {
        x: (windowWidth * (5 / 6)),
        y: windowHeight / 2,
        velocity: 2,
        heading: Math.PI / 2
    };

    for (let n in graph.nodes) {
        graph.nodes[n].x = graph.nodes[n].x * (windowWidth * (2 / 3)) + 10;
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
    // background(60, 50);
    fill(60, 50);
    rect(0, 0, (windowWidth * 4 / 6) + 10, windowHeight);
    fill(60, 1);
    rect((windowWidth * 4 / 6) + 10, 0, windowWidth, windowHeight);
    for (let e in edges) {
        edges[e].frame();
    }
    for (let n in nodes) {
        nodes[n].frame();
    }

    // Here we can run accumulators, e.g., to determine motility
    simulateWormStep();
}

let evented = false;

function simulateWormStep(eventHappened = false) {

    eventHappened = eventHappened || evented;
    evented = false;

    let dir = 0;
    for (let m of mLeft) {
        dir += nodes[m].excitation;
    }
    for (let m of mRight) {
        dir -= nodes[m].excitation;
    }
    // console.log(dir / 100)
    dir /= 360;
    let wormSize = 5;
    if (eventHappened) {
        wormSize = 7;
        fill(250, 0, 0);
    } else {
        fill(150, 200, 200, 150);
    }
    // stroke(150, 200, 200);
    noStroke();
    // line(worm.x + 5000, worm.y, (windowWidth * 4/6) + 10, worm.y)
    // line(worm.x, worm.y + 5000, worm.x, worm.y - 5000)
    ellipse(worm.x, worm.y, wormSize, wormSize);

    if (int(dir * 100) == 0) {
        return;
    }

    worm.heading += dir;
    worm.x += Math.cos(worm.heading) * (worm.velocity * (Math.abs(dir) > 0.05));
    worm.y += Math.sin(worm.heading) * (worm.velocity * (Math.abs(dir) > 0.05));


    if (worm.x > windowWidth - 10 || worm.x < (windowWidth * 4 / 6) + 10) {
        noseTouch();
        evented = true;
    }
    if (worm.y > windowHeight - 10 || worm.y < (10)) {
        noseTouch();
        evented = true;
    }

    worm.x = Math.min(worm.x, windowWidth - 11);
    worm.y = Math.min(worm.y, windowHeight - 11);

    worm.x = Math.max(worm.x, (windowWidth * 4 / 6) + 11);
    worm.y = Math.max(worm.y, 11);

}

function noseTouch() {
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

function keyPressed() {
    if (keyCode === 49) {
        noseTouch();
        simulateWormStep(true);
    }
    if (keyCode === 50) {
        nodes["VA8"].excite(200);
    }
}
