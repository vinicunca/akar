export type Direction = 'horizontal' | 'vertical';

export type ResizeEvent = KeyboardEvent | MouseEvent | TouchEvent;
export type ResizeHandler = (event: ResizeEvent) => void;

export interface DragState {
  dragHandleId: string;
  dragHandleRect: DOMRect;
  initialCursorPosition: number;
  initialLayout: Array<number>;
}
