export default class Stack<T> {
    public length: number;
    public data: Array<T>;

    constructor() {
        this.data = [];
        this.length = 0;
    }

    push(item: T): void {
        this.data.push(item);
        this.length++;
    }
    pop(): T | undefined {
        if (this.length <= 0) {
            return;
        }
        this.length--;
        return this.data.pop();
    }
    peek(): T | undefined {
        return this.data[this.length - 1];
    }
}