export interface Todo {
  id: number;
  title: string;
  text: string;
  completed: boolean;
}
export type TodoList = Todo[];