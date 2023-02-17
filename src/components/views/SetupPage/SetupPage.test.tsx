import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { Default } from './SetupPage.stories';

describe('components/SetupPage', () => {
  test('should render default', () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });
});
