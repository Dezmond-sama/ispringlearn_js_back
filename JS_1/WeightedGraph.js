/**
 * Represents an edge in a weighted graph.
 * It has two nodes and a weight.
 * Used to store the edges of the graph in an array.
 * @property {*} node1 - First node of the edge.
 * @property {*} node2 - Second node of the edge.
 * @property {number} weight - Weight of the edge between the two nodes.
 */
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

    /**
     * Creates an empty weighted graph.
     */
    constructor() {
        this.#nodes = [];
        this.#edges = [];
    }

    /**
     * Returns true if the graph contains the given node, false otherwise.
     * @param {*} node The node to search for.
     * @return {boolean} True if the graph contains the node, false otherwise.
     */
    containsNode(node) {
        return this.#nodes.includes(node);
    }

    /**
     * Returns the index of the given node in the graph's node list.
     * If the node is not in the graph, returns -1.
     * @param {*} node The node to search for.
     * @return {number} The index of the node in the graph's node list, or -1 if not found.
     */
    nodeIndex(node) {
        return this.#nodes.indexOf(node);
    }

    /**
     * Adds a node to the graph.
     * If the node is already in the graph, does nothing.
     * @param {*} node The node to be added.
     * @return {number} The index of the node in the graph's node list.
     */
    addNode(node) {
        if (!this.containsNode(node)) this.#nodes.push(node);
        return this.nodeIndex(node);
    }

    /**
     * Adds an edge to the graph between the two given nodes.
     * If either of the nodes is not in the graph, it is added to the graph first.
     * @param {*} node1 The first node of the edge.
     * @param {*} node2 The second node of the edge.
     * @param {number} weight The weight of the edge between the two nodes.
     */
    addEdge(node1, node2, weight) {
        if (!this.containsNode(node1)) this.addNode(node1);
        if (!this.containsNode(node2)) this.addNode(node2);
        this.#edges.push(new Edge(node1, node2, weight));
    }

    /**
     * Returns the weight of the edge between the two given nodes,
     * or undefined if there is no such edge.
     * @param {*} node1 The first node of the edge.
     * @param {*} node2 The second node of the edge.
     * @return {number|undefined} The weight of the edge, or undefined if there is no edge between the two nodes.
     */
    edgeWeight(node1, node2) {
        return this.#edges.find(
            (edge) =>
                (edge.node1 === node1 && edge.node2 === node2) ||
                (edge.node1 === node2 && edge.node2 === node1)
        )?.weight;
    }

    /**
     * Removes the given node from the graph, along with all edges incident to it.
     * @param {*} node The node to be removed.
     */
    removeNode(node) {
        let index = this.nodeIndex(node);
        this.#nodes.splice(index, 1);

        this.#edges = this.#edges.filter(
            (edge) => edge.node1 !== node && edge.node2 !== node
        );
    }

    /**
     * Removes the edge between the two given nodes from the graph.
     * If there is no edge between the two nodes, nothing happens.
     * @param {*} node1 The first node of the edge.
     * @param {*} node2 The second node of the edge.
     */
    removeEdge(node1, node2) {
        this.#edges = this.#edges.filter(
            (edge) =>
                // Keep the edge if it doesn't match the given nodes
                (edge.node1 !== node1 || edge.node2 !== node2) &&
                (edge.node1 !== node2 || edge.node2 !== node1)
        );
    }

    /**
     * Updates the node in the graph.
     * If the new node is already in the graph, an error is thrown.
     * If the node to be updated does not exist, an error is thrown.
     * @param {*} node The node to be updated.
     * @param {*} newNode The new node that replaces the old node.
     */
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

    /**
     * Gets the number of nodes in the graph.
     * @return {number} The number of nodes in the graph.
     */
    get count() {
        return this.#nodes.length;
    }

    /**
     * Calculates the shortest distance between two nodes in the graph using
     * Dijkstra's algorithm.
     * @param {*} source The starting node of the path.
     * @param {*} destination The ending node of the path.
     * @return {number|undefined} The shortest distance between the source and
     *     destination nodes if such path exists, undefined otherwise.
     */
    shortestDistance(source, destination) {
        if (!this.containsNode(source) || !this.containsNode(destination)) {
            return undefined;
        }

        const distances = new Map();
        const previous = new Map();
        const queue = [source];

        distances.set(source, 0);

        while (queue.length > 0) {
            const current = queue.shift();

            for (const neighbor of this.neighbors(current)) {
                const distance =
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

        return distances.get(destination);
    }

    /**
     * Returns the list of nodes that are connected to the given node
     * through edges in the graph.
     * @param {*} node The node to find its neighbors.
     * @return {Array<*>} The list of neighbors of the given node.
     */
    neighbors(node) {
        return this.#edges
            .filter((edge) => edge.node1 === node || edge.node2 === node)
            .map((edge) => (edge.node1 === node ? edge.node2 : edge.node1));
    }
}
