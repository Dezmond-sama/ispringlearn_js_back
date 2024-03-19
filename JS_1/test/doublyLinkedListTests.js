import { DoublyLinkedList } from "../DoublyLinkedList.js";

const testDoublyLinkedList = () => {
    const check = (res, expected) => {
        if (res !== expected) {
            throw new Error(`Expected: ${expected}\n Got: ${res}`);
        }
    };
    let lst = new DoublyLinkedList();
    lst.push(1).push(2).push(3).push(4).unshift(5).push(6);
    check(lst.ToString(), "5 1 2 3 4 6");
    check(lst.length, 6);
    lst.remove(lst.search(2));
    check(lst.ToString(), "5 1 3 4 6");
    check(lst.length, 5);
    lst.remove(lst.search(3));
    check(lst.ToString(), "5 1 4 6");
    check(lst.length, 4);
    lst.remove(lst.search(6));
    check(lst.ToString(), "5 1 4");
    check(lst.length, 3);
    lst.remove(lst.search(5));
    check(lst.ToString(), "1 4");
    check(lst.length, 2);
    lst.remove(lst.search(5));
    check(lst.ToString(), "1 4");
    check(lst.length, 2);

    lst.push(1).push(2).push(3).unshift(4);
    check(lst.ToString(), "4 1 4 1 2 3");
    check(lst.length, 6);

    //---
    lst.insertAfterObject(lst.search(3), 42);
    check(lst.ToString(), "4 1 4 1 2 3 42");
    check(lst.length, 7);
    //---
    lst.insertAfterValue(3, "test");
    check(lst.ToString(), "4 1 4 1 2 3 test 42");
    check(lst.length, 8);
    //---
    lst.insertAfterValue(10, 190);
    check(lst.ToString(), "190 4 1 4 1 2 3 test 42");
    check(lst.length, 9);

    //---
    lst.updateByValue(1, 1111);
    check(lst.ToString(), "190 4 1111 4 1 2 3 test 42");
    check(lst.length, 9);

    lst.updateByValue(4, 4444, true);
    check(lst.ToString(), "190 4444 1111 4444 1 2 3 test 42");
    check(lst.length, 9);
    console.log("Test passed");
};

testDoublyLinkedList();
