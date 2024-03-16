// pretend js array [] is a queue
export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);
  const queue = [source];
  seen[source] = true;
  let curr = source;

  while (queue.length > 0) {
    curr = queue.pop() as number;
    if (curr === needle) {
      break;
    }
    const edges = graph[curr];

    for (let i=0; i<edges.length; i++) {
      if (seen[i]) { continue; }
      if (edges[i]>0) {
        seen[i] = true;
        prev[i] = curr;
        queue.unshift(i);
      }
    }
  }

  if (curr !== needle) {
    return null;
  }

  const path = [];
  while (prev[curr] !== -1) {
    path.push(curr);
    curr = prev[curr];
  }
  return path.concat(curr).reverse();
}