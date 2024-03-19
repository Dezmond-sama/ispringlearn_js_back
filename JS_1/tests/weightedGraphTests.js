// tests

import { WeightedGraph } from "../WeightedGraph.js";

const testWeightedGraph = () => {
    const check = (res, expected) => {
        if (res !== expected) {
            throw new Error(`Expected: ${expected}\n Got: ${res}`);
        }
    };

    let graph = new WeightedGraph();
    graph.addEdge(1, 2, 3);
    graph.addEdge(2, 3, 2);
    graph.addEdge(3, 4, 6);
    graph.addEdge(1, 4, 10);
    graph.addEdge(4, 5, 3);
    graph.addEdge(3, 5, 7);
    graph.addEdge(6, 7, 1);
    graph.addEdge(7, 8, 8);

    check(graph.shortestDistance(1, 5), 12);
    check(graph.shortestDistance(1, 4), 10);
    check(graph.shortestDistance(3, 5), 7);
    check(graph.shortestDistance(4, 5), 3);
    check(graph.shortestDistance(2, 5), 9);

    graph.removeEdge(3, 5);
    check(graph.shortestDistance(3, 5), 9);

    check(graph.shortestDistance(1, 7), undefined);
    check(graph.shortestDistance(6, 8), 9);
    check(graph.shortestDistance(6, 80), undefined);

    console.log("Test passed");
};

testWeightedGraph();
