export class ListNode {
    // Single element of the list
    constructor(value) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
}

export class DoublyLinkedList {
    // List of nodes
    #length = 0;
    constructor() {
        this.head = null;
        this.tail = null;
        this.#length = 0;
    }

    get length() {
        return this.#length;
    }

    // Search an element with value
    search(value) {
        let curr = this.head;
        while (curr) {
            if (curr.value === value) return curr;
            curr = curr.next;
        }
        return null;
    }

    // Add to the begining
    unshift(value) {
        let listNode = new ListNode(value);
        listNode.next = this.head;
        if (this.head) {
            this.head.prev = listNode;
        }
        if (!this.tail) {
            this.tail = listNode;
        }
        this.head = listNode;
        this.#length++;
        return this;
    }

    // Add to the ending
    push(value) {
        let listNode = new ListNode(value);
        listNode.prev = this.tail;
        if (!this.head) {
            this.head = listNode;
        }
        if (this.tail) {
            this.tail.next = listNode;
        }
        this.tail = listNode;
        this.#length++;
        return this;
    }

    // Add after the element or to the begining
    insertAfterObject(prevElem, value) {
        if (prevElem) {
            // Node object
            let listNode = new ListNode(value);
            listNode.prev = prevElem;
            listNode.next = prevElem.next;
            prevElem.next = listNode;
            if (!listNode.next) {
                this.tail = listNode;
            }
            this.#length++;
        } else {
            // null || undefined
            this.unshift(value);
        }
        return this;
    }

    // Add after the element by value
    insertAfterValue(prevValue, value) {
        return this.insertAfterObject(this.search(prevValue), value);
    }

    // element in the list
    contains(elem) {
        let curr = this.head;
        while (curr) {
            if (curr === elem) return true;
            curr = curr.next;
        }
        return false;
    }

    // remove an element
    remove(elem) {
        if (!this.contains(elem)) return this;
        if (elem === this.head && elem === this.tail) {
            this.head = null;
            this.tail = null;
        } else if (elem === this.head) {
            this.head = elem.next;
            elem.next.prev = null; // tail is not null, so elem.next is not null
        } else if (elem === this.tail) {
            this.tail = elem.prev;
            elem.prev.next = null;
        } else {
            elem.prev.next = elem.next;
            elem.next.prev = elem.prev;
        }
        this.#length--;
        return this;
    }

    //update elem
    update(elem, newValue) {
        elem.value = newValue;
        return this;
    }

    updateByValue(oldValue, newValue, updateAll = false) {
        let curr = this.head;
        while (curr) {
            if (curr.value === oldValue) {
                curr.value = newValue;
                if (!updateAll) return;
            }
            curr = curr.next;
        }
        return this;
    }

    // Convert to string
    ToString() {
        let curr = this.head;
        let str = [];
        while (curr) {
            str.push(curr.value);
            curr = curr.next;
        }
        return str.join(" ");
    }
}
