import PropTypes from 'prop-types';
import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Click Me!',
  className:
    'bg-primary border border-primary rounded-lg py-2 px-5 font-semibold text-lg text-white hover:bg-transparent hover:text-primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Button',
  className:
    'bg-slate-500 border border-slate-500 rounded-lg py-2 px-5 italic font-semibold text-lg text-white',
  disabled: true,
};
