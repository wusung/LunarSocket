export default [] as Event[];

interface Event {
  type: 'login' | 'logout' | 'role-set';
  value: string;
}
