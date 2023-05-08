import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ModuloStories } from '@webkit/shared';
import { InputPasswordComponent } from './input-password.component';

export default {
  title: 'InputPasswordComponent',
  component: InputPasswordComponent,
  decorators: [moduleMetadata(ModuloStories)],
} as Meta<InputPasswordComponent>;

const Template: Story<InputPasswordComponent> = (args: InputPasswordComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
