import { Context, useContext } from 'solid-js';

const useContextOrThrow = <T extends unknown>(context: Context<T>) => {
  const resultContext = useContext(context);
  if (!resultContext) {
    throw new Error('the provided context is empty');
  }
  return resultContext;
};

export default useContextOrThrow;
