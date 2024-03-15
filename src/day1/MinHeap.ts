export default class MinHeap {
  public length: number;
  public heap: number[];
  
  constructor() {
    this.heap = [];
    this.length = 0;
  }
  
  insert(value: number): void {
    this.heap.push(value);
    this.length++;
    this.heapifyUp(this.length - 1);
  }

  delete(): number {
    if (this.length <= 0) {
      return -1;
    }

    const res = this.heap[0];
    this.heap[0] = this.heap[this.length - 1];
    this.length--;

    this.heapifyDown(0);
    return res;
  }

  parent(idx: number): number {
    return Math.floor(idx / 2);
  }

  leftChild(idx: number): number {
    return idx * 2 + 1;
  }

  rightChild(idx: number): number {
    return idx * 2 + 2;
  }

  heapifyDown(idx: number): void {
    if (idx === this.length - 1) { return; }

    const lIdx = this.leftChild(idx);
    const rIdx = this.rightChild(idx);

    if (this.heap[lIdx] >= this.heap[idx] && this.heap[rIdx] >= this.heap[idx]) {
      return;
    }

    if (this.heap[lIdx] < this.heap[idx] && this.heap[lIdx] <= this.heap[rIdx]) {
      const tmp = this.heap[idx];
      this.heap[idx] = this.heap[lIdx];
      this.heap[lIdx] = tmp;
      this.heapifyDown(lIdx);
      return;
    }
    
    if (this.heap[rIdx] < this.heap[idx] && this.heap[rIdx] < this.heap[lIdx]) {
      const tmp = this.heap[idx];
      this.heap[idx] = this.heap[rIdx];
      this.heap[rIdx] = tmp;
      this.heapifyDown(rIdx);
      return;
    }
  }

  heapifyUp(idx: number): void {
    if (idx <= 0) { return; }
    const parentIdx = this.parent(idx);
    if (this.heap[idx] >= this.heap[parentIdx]) { return; }

    const tmp = this.heap[idx];
    this.heap[idx] = this.heap[parentIdx];
    this.heap[parentIdx] = tmp;
    this.heapifyUp(parentIdx);
  }
}