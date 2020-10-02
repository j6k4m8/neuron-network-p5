o = "o"
const graph = {
    edges: [
        { from: 1, to: 2, weight: 1, speed: 500 },
        { from: 2, to: 3, weight: 0.95, speed: 500 },
        { from: 3, to: 4, weight: 0.95, speed: 500 },
        { from: 4, to: 2, weight: 0.95, speed: 500 },
        { from: 2, to: 5, weight: 0.2, speed: 500 },
        // { from: 5, to: 2, weight: 1, speed: 500 },

        { from: 11, to: 5, weight: 0.9, speed: 1000 },

        { from: 5, to: o, weight: 1, speed: 500 },
    ],
    nodes: {
        1: { name: 1, x: 100, y: 100 },
        11: { name: 11, x: 400, y: 100 },
        2: { name: 2, x: 155, y: 194 },
        3: { name: 3, x: 255, y: 244 },
        4: { name: 4, x: 305, y: 350 },
        5: { name: 5, x: 505, y: 550 },
        o: { name: o, x: 900, y: 900 },
    }
};
