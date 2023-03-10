import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '버튼',
};

export const Styled = Template.bind({});
Styled.args = {
  ...Default.args,
  color: 'gradient',
  radius: 'circle',
};
