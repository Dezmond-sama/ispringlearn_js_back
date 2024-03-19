// Написать класс, реализующий взвешенный граф.
// Предусмотреть методы
//    поиска,
//    вставки,
//    удаления,
//    изменения элемента
//    определения количества элементов.
// Предусмотреть метод поиска кратчайшего расстояния между двумя узлами.
class Edge {
    constructor(node1, node2, weight) {
        this.node1 = node1;
        this.node2 = node2;
        this.weight = weight;
    }
}
class WeightedGraph {
    #nodes = new Array();
    #edges = new Array();

    constructor() {
        this.#nodes = [];
        this.#edges = [];
    }

    containsNode(node) {
        return this.#nodes.includes(node);
    }
    nodeIndex(node) {
        return this.#nodes.indexOf(node);
    }
    addNode(node) {
        if (!this.containsNode(node)) this.#nodes.push(node);
        return this.nodeIndex(node);
    }

    addEdge(node1, node2, weight) {
        if (!this.containsNode(node1)) this.addNode(node1);
        if (!this.containsNode(node2)) this.addNode(node2);
        this.#edges.push(new Edge(node1, node2, weight));
    }
    edgeWeight(node1, node2) {
        return this.#edges.find(
            (edge) =>
                (edge.node1 === node1 && edge.node2 === node2) ||
                (edge.node1 === node2 && edge.node2 === node1)
        )?.weight;
    }
    removeNode(node) {
        let index = this.nodeIndex(node);
        this.#nodes.splice(index, 1);
        this.#edges = this.#edges.filter(
            (edge) => edge.node1 !== node && edge.node2 !== node
        );
    }
    removeEdge(node1, node2) {
        this.#edges = this.#edges.filter(
            (edge) =>
                (edge.node1 !== node1 || edge.node2 !== node2) &&
                (edge.node1 !== node2 || edge.node2 !== node1)
        );
    }
    updateNode(node, newNode) {
        if (node === newNode) return;
        if (!this.containsNode(node)) {
            throw new Error(`Node ${node} doesn't exist`);
        }
        if (this.containsNode(newNode)) {
            throw new Error(`Node ${newNode} already exists`);
        }
        let index = this.nodeIndex(node);
        this.#nodes[index] = newNode;
    }
    get count() {
        return this.#nodes.length;
    }
    shortestDistance(node1, node2) {
        if (!this.containsNode(node1)) {
            throw new Error(`Node ${node1} doesn't exist`);
        }
        if (!this.containsNode(node2)) {
            throw new Error(`Node ${node2} doesn't exist`);
        }
        const distances = new Map();
        const previous = new Map();
        const queue = new Array();
        queue.push(node1);
        distances.set(node1, 0);
        while (queue.length > 0) {
            let current = queue.shift();
            for (let neighbor of this.neighbors(current)) {
                let distance =
                    distances.get(current) + this.edgeWeight(current, neighbor);
                if (
                    !distances.has(neighbor) ||
                    distance < distances.get(neighbor)
                ) {
                    distances.set(neighbor, distance);
                    previous.set(neighbor, current);
                    queue.push(neighbor);
                }
            }
        }
        return distances.get(node2);
    }
    neighbors(node) {
        return this.#edges
            .filter((edge) => edge.node1 === node || edge.node2 === node)
            .map((edge) => (edge.node1 === node ? edge.node2 : edge.node1));
    }
}

// tests

let graph = new WeightedGraph();
graph.addEdge(1, 2, 3);
graph.addEdge(2, 3, 2);
graph.addEdge(3, 4, 6);
graph.addEdge(1, 4, 10);
graph.addEdge(4, 5, 3);
graph.addEdge(3, 5, 7);
graph.addEdge(6, 7, 1);
graph.addEdge(7, 8, 8);

console.log(graph.shortestDistance(1, 5));
console.log(graph.shortestDistance(1, 4));
console.log(graph.shortestDistance(1, 3));
console.log(graph.shortestDistance(3, 5));
console.log(graph.shortestDistance(4, 5));

graph.removeEdge(3, 5);
console.log(graph.shortestDistance(3, 5));

console.log(graph.shortestDistance(1, 7));
console.log(graph.shortestDistance(6, 8));
