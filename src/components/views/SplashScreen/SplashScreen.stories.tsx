import { SplashScreen } from './SplashScreen';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'components/SplashScreen',
  component: SplashScreen,
} as Meta;

export const Default: Story = () => <SplashScreen />;
