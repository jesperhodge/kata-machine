// unperformant queue with complexity O(n)
// TODO: implement as a linked list
class Queue {
  public data: Array<any>;
  public length: number;
  constructor() {
    this.data = [];
    this.length = 0;
  }
  enqueue(node: any) {
    this.data.push(node);
    this.length++;
  }
  deque(): any {
    this.length--;
    return this.data.shift();
  }
}

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
  const queue = new Queue();
  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);
  let curr = source;
  seen[curr] = true;

  queue.enqueue(source);

  while (queue.length > 0) {
    console.log('queue: ', queue.data);
    curr = queue.deque();
    if (curr === needle) {
      break;
    }

    const edges = graph[curr];
    console.log('edges: ', edges);

    for (let i=0; i<=edges.length-1; i++) {
      if (seen[i]) { continue; }
      if (edges[i] > 0) {
        prev[i] = curr;
        seen[i] = true;
        queue.enqueue(i);
      }
    }
  }

  if (curr !== needle) return null;

  const path: any[] = [];
  console.log('seen: ', seen);
  console.log('prev: ', prev);
  console.log('path: ', path);
  console.log('curr: ', curr);
  console.log('queue: ', queue.data);

  while (prev[curr] !== -1) {
    path.push(curr);
    curr = prev[curr];
  }

  return path.concat(curr).reverse();
}