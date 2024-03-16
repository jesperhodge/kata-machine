interface Node<T> {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
}

export default class Queue<T> {
    public length: number;
    private head: Node<T> | null;
    private tail: Node<T> | null;
    

    constructor() {
        this.head = this.tail = null;
        this.length = 0;
    }

    enqueue(item: T): void {
        const newNode: Node<T> = { value: item };
        this.length++;

        if (!this.tail) {
            this.tail = this.head = newNode;
            return;
        }
        
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
    }
    deque(): T | undefined {
        const val = this.head?.value;
        if (!this.head) return undefined;
        this.length--;
        if (this.head === this.tail) {
            this.head = this.tail = null;
            return val;
        }
        this.head = this.head.next || null;
        return val;
    }
    peek(): T | undefined {
        return this.head?.value || undefined;
    }
}