import { Accessor } from 'solid-js';

type ReactivityProperty<T> = [Accessor<T>, (value: T) => void];

export default ReactivityProperty;
