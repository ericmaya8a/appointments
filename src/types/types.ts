type Result<T> = {
  success: true;
  data: T;
};

type Error<E = string> = {
  success: false;
  error: E;
};

export type Action<T, E = string> = Promise<Result<T> | Error<E>>;
