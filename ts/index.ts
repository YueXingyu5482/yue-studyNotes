type A = {
  age: number;
};
type B = {
  name: string;
};
type C = A & B;
const tt: C = {
  age: 1,
  name: "123",
};
interface D {
  name: string;
}
type E = A & D;
const ee: E = {
  age: 1,
  name: "123",
};
