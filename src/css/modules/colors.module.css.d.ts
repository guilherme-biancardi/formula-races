type ColorKeys = 'soft' | 'mid' | 'dark' | 'darker';

type Color<C extends string, Keys extends string = ColorKeys> = Readonly<Record<C, string>> & {
  readonly [K in `${Keys}${Capitalize<C>}`]: string;
};

export type SystemColors = Color<'background'> &
  Color<'text', 'soft' | 'dark'> &
  Color<'primary', 'dark'>;

const styles: SystemColors;

export default styles;
