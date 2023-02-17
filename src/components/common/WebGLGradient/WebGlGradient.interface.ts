export interface WebGlGradientProps {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  className?: string;
}

export type WebGlGradientStylesProps = Pick<
  WebGlGradientProps,
  'color1' | 'color2' | 'color3' | 'color4'
>;

export interface GradientInterface {
  initGradient: (id: string) => void;
}
