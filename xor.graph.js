o = "o"
const graph = {
    edges: [
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

        { from: 3, to: o, weight: 1, speed: 500 },
        { from: 13, to: o, weight: 1, speed: 500 },
    ],
    nodes: {

        // XOR A B
        1: { name: 1, x: 100, y: 100 },
        2: { name: 2, x: 155, y: 194 },
        3: { name: 3, x: 255, y: 244 },
        4: { name: 4, x: 305, y: 350 },

        11: { name: 11, x: 400 + 100, y: 100 },
        12: { name: 12, x: 400 + 155, y: 194 },
        13: { name: 13, x: 400 + 255, y: 244 },
        14: { name: 14, x: 400 + 305, y: 350 },


        o: { name: o, x: 900, y: 900 },
    }
};
