import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { Default } from './SplashScreen.stories';

describe('components/SplashScreen', () => {
  test('should render default', () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });
});
