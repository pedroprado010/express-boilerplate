export const batchAll = async <T extends readonly unknown[] | [], RT>(
  list: T,
  batchSize: number,
  map: (item: T[number], index: number, list: T) => RT | Promise<RT>,
): Promise<RT[]> => {
  if (batchSize <= 0) {
    throw new Error(`Size cannot be less than or equal to 0. Given ${batchSize}`);
  }
  const result = new Array(list.length).fill(null);
  const stack = new Set();
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const savedPromise = Promise.resolve(map(item, i, list)).then(
      (response) => {
        result[i] = response;
        stack.delete(savedPromise);
      },
    );
    stack.add(savedPromise);
    if (stack.size === batchSize) {
      // wait for one of them to finish before continuing
      await Promise.race(stack);
    }
  }
  // wait for the rest of the stack to finish after the loop
  await Promise.all(stack);

  return result;
};

export const raceSettled = async <T>(p: Iterable<T | PromiseLike<T>>): Promise<PromiseSettledResult<T>> => {
  try {
    const result = await Promise.race(p);
    return { value: result, status: 'fulfilled' };
  } catch (error) {
    return { status: 'rejected', reason: error };
  }
};

export const batchAllSettled = async <T extends readonly unknown[] | [], RT>(
  list: T,
  batchSize: number,
  map: (item: T[number], index: number, list: T) => RT | PromiseLike<RT>,
): Promise<PromiseSettledResult<RT>[]> => {
  if (batchSize <= 0) {
    throw new Error(`Size cannot be less than or equal to 0. Given ${batchSize}`);
  }
  const result = new Array(list.length).fill(null) as PromiseSettledResult<RT>[];
  const stack = new Set();
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const savedPromise = Promise.resolve(map(item, i, list))
      .then((response) => {
        result[i] = { value: response, status: 'fulfilled'};
        stack.delete(savedPromise);
      })
      .catch((error) => {
        result[i] = { reason: error, status: 'rejected'};
        stack.delete(savedPromise);
      });

    stack.add(savedPromise);
    if (stack.size === batchSize) {
      // wait for one of them to finish before continuing
      await raceSettled(stack);
    }
  }
  // wait for the rest of the stack to finish after the loop
  await Promise.allSettled(stack);

  return result;
};
