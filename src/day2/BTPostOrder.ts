function walk(result: number[], curr: BinaryNode<number> | null) {
  if (curr === null) {
    return;
  }
  walk(result, curr.left);
  walk(result, curr.right);
  result.push(curr.value);
}

export default function post_order_search(head: BinaryNode<number>): number[] {
  const result: number[] = [];
  walk(result, head);
  return result;
}