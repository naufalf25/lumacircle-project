import VoteButton from '../components/VoteButton';

export default {
  title: 'Components/VoteButton',
  component: VoteButton,
  argTypes: {
    onUpvote: { action: 'clicked' },
    onDownvote: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

const Template = (args) => <VoteButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'thread-test',
  totalVote: 0,
};

export const UserOnUpVote = Template.bind({});
UserOnUpVote.args = {
  id: 'thread-test',
  totalVote: 1,
  userUpVote: true,
};

export const UserOnDownVote = Template.bind({});
UserOnDownVote.args = {
  id: 'thread-test',
  totalVote: -1,
  userDownVote: true,
};
