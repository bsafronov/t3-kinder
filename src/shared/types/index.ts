export type KeyValue<K extends string | number, V = unknown> = {
  [key in K]: V;
};
