import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { Default } from './WorkoutPage.stories';

describe('components/WorkoutPage', () => {
  test('should render default', () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });
});
