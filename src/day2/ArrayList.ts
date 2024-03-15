export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private data: Array<T>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.data = new Array(capacity);
        this.length = 0;
    }

    prepend(item: T): void {
        console.log('item to prepend: ', item)
        this.adjustCapacity();
        console.log('length: ', this.length);
        console.log('prepend data before run: ', this.data);
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i-1];
        }
        this.data[0] = item;
        this.length++;
        console.log(this.data);
    }

    adjustCapacity(): void {
        if (this.length < this.capacity) { return; }

        const doubleArray = new Array(2 * this.capacity);
        for (let i = 0; i <= this.length - 1; i++) {
            doubleArray[i] = this.data[i];
        }
        this.data = doubleArray;
    }

    insertAt(item: T, idx: number): void {
        this.adjustCapacity();
        for (let i = this.length - 1; i > idx; i--) {
            this.data[i] = this.data[i-1];
        }
        this.data[idx] = item;
        this.length++;
    }
    append(item: T): void {
        this.adjustCapacity();
        this.data[this.length] = item;
        this.length++;
        console.log(this.data);
    }
    remove(item: T): T | undefined {
        // assumption: user won't try to remove undefined.
        let itemIdx = -1;
        for (let i = 0; i <= this.length - 1; i++) {
            if (this.data[i] === item) {
                itemIdx = i;
                break;
            }
        }
        if (itemIdx === -1) { return undefined; }

        for (let i = itemIdx; i <= this.length - 1; i++) {
            this.data[i] = this.data[i+1];
        }
        this.length--;
        return item;
    }
    get(idx: number): T | undefined {
        return this.data[idx];
    }
    hasEntry(idx: number): boolean {
        return idx < this.length && this.data.hasOwnProperty(idx);
    }
    removeAt(idx: number): T | undefined {
        if (!this.hasEntry(idx)) { return undefined; }
        const item = this.data[idx];
        for (let i = idx; i < this.length - 1; i++) {
            this.data[i] = this.data[i+1];
        }
        this.length--;
        return item;
    }
}
