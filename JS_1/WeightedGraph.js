class Edge {
    constructor(node1, node2, weight) {
        this.node1 = node1;
        this.node2 = node2;
        this.weight = weight;
    }
}
export class WeightedGraph {
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
        if (!this.containsNode(node1) || !this.containsNode(node2)) {
            return undefined;
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
