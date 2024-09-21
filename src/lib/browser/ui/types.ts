type Size = 'sm' | 'md' | 'lg' | 'xl';

type Direction = 'up' | 'right' | 'down' | 'left';

export type IconSize = Size;

export type TextAreaSize = Size;

export type ArrowSize = Extract<Size, 'md' | 'lg' | 'xl'>;

export type ArrowDirection = Extract<Direction, 'up' | 'left'>;
