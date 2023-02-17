import type { FC } from 'react';
import { useEffect } from 'react';

import type {
  GradientInterface,
  WebGlGradientProps,
} from '@app/components/common/WebGLGradient/WebGlGradient.interface';
import { WebGlGradientStyles } from '@app/components/common/WebGLGradient/WebGlGradient.styles';
import { classNames } from '@app/helpers';

import { Gradient } from './gradient';

export const WebGlGradient: FC<WebGlGradientProps> = ({
  color1,
  color2,
  color3,
  color4,
  className,
}) => {
  useEffect(() => {
    const gradient = new Gradient() as unknown as GradientInterface;
    gradient.initGradient('#gradient-canvas');
  }, []);

  return (
    <WebGlGradientStyles
      color1={color1}
      color2={color2}
      color3={color3}
      color4={color4}
    >
      <canvas
        className={classNames(
          'h-full w-full object-cover object-center',
          className,
        )}
        id="gradient-canvas"
        data-js-darken-top="true"
        data-transition-in="true"
      />
    </WebGlGradientStyles>
  );
};
