import styled from 'styled-components';

import type { WebGlGradientStylesProps } from '@app/components/common/WebGLGradient/WebGlGradient.interface';

export const WebGlGradientStyles = styled.div`
  #gradient-canvas {
    width: 100%;
    height: 100%;
    --gradient-color-1: ${({ color1 }: WebGlGradientStylesProps) => color1};
    --gradient-color-2: ${({ color2 }: WebGlGradientStylesProps) => color2};
    --gradient-color-3: ${({ color3 }: WebGlGradientStylesProps) => color3};
    --gradient-color-4: ${({ color4 }: WebGlGradientStylesProps) => color4};
  }
`;
