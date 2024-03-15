/*
assumptions:
- key is unique??
*/
interface Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class LRU<K, V> {
    private length: number;
    private capacity: number;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;
    private head?: Node<V>;
    private tail?: Node<V>;
    
    constructor(capacity: number) {
        this.capacity = capacity;
        this.lookup = new Map();
        this.reverseLookup = new Map();
        this.length = 0;
        this.head = this.tail = undefined;
    }

    createNode(key: K, value: V) {
        const node: Node<V> = { value };
        this.lookup.set(key, node);
        this.reverseLookup.set(node, key);
        return node;
    }

    update(key: K, value: V): void {
        // key in lookup?
        const node: Node<V> | undefined = this.lookup.get(key);

        // if yes, detach and prepend at beginning
        // and update
        if (node) {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        } else {
            // no element with key should exist in lookup since we already
            // checked that
            // if no, prepend new node at beginning
            const newNode = this.createNode(key, value);
            this.prepend(newNode);
            // and truncate
            this.length++;
            this.truncate();
        }
        debugger;
    }
    get(key: K): V | undefined {
        // key in lookup?
        const node: Node<V> | undefined = this.lookup.get(key);
        // if not, return undefined
        if (!node) { return undefined; }

        // if yes, detach and prepend at beginning and return
        this.detach(node);
        this.prepend(node);
        return node.value;
    }

    truncate() {
        const amount = this.length - this.capacity;
        if (amount <= 0) { return; }

        for (let i = 0; i <= amount - 1; i++) {
            this.deleteLast();
        }
    }

    deleteLast() {
        if (!this.tail) {
            return;
        }
        const lastNode = this.tail;
        if (this.tail.prev) {
            this.tail = this.tail.prev;
            this.tail.next = undefined;
        }
        const key = this.reverseLookup.get(lastNode);
        if (key) this.lookup.delete(key);
        this.reverseLookup.delete(lastNode);
        this.length--;
    }

    detach(node: Node<V>) {
        if (this.tail === node) {
            this.tail = node.prev;
        }
        if (this.head === node) {
            this.head = node.next;
        }
        if (node.prev) {
            node.prev.next = node.next;
            node.prev = undefined;
        }
        if (node.next) {
            node.next.prev = node.prev;
            node.next = undefined;
        }
    }

    prepend(node: Node<V>) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
        
    }
}
