const weakMap = new WeakMap();

const queryAPI = (endpoint) => {
  let t = weakMap.get(endpoint) || 0;
  weakMap.set(endpoint, t -= -1);
  if (t >= 5) throw new Error('Endpoint load is high');
  return t;
};

export { weakMap, queryAPI };