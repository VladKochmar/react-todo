export default interface Task {
  id: number;
  title: string;
  done: boolean;
  deadline?: string;
  description?: string;
}
