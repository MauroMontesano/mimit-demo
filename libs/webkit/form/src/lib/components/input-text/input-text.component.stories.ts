import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ModuloStories } from '@webkit/shared';
import { InputTextComponent } from './input-text.component';

export default {
  title: 'InputTextComponent',
  component: InputTextComponent,
  decorators: [moduleMetadata(ModuloStories)],
} as Meta<InputTextComponent>;

const Template: Story<InputTextComponent> = (args: InputTextComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
