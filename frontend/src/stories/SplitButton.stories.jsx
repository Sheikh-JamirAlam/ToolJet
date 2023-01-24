import React from 'react';
import SplitButton from '../_ui/SplitButton/SplitButton';

export default {
  title: 'Components/FolderList',
  component: SplitButton,
  args: {
    children: 'Section name',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    leftIcon: {
      // options: Object.keys(),
      control: { type: 'select' },
    },
    rightIcon: {
      // options: Object.keys(),
      control: { type: 'select' },
    },
    onClick: {
      control: 'none',
    },
    className: {
      control: 'text',
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

const Template = (args) => <SplitButton {...args} />;

// 👇 Each story then reuses that template
export const Basic = Template.bind({ children: 'asdasd' });
