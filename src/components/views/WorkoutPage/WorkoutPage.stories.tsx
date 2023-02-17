import { WorkoutPage } from './WorkoutPage';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'components/WorkoutPage',
  component: WorkoutPage,
} as Meta;

export const Default: Story = () => <WorkoutPage />;
