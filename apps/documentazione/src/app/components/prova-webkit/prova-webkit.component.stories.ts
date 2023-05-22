import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ModuloStories } from '@webkit/shared';

import { ProvaWebkitComponent } from './prova-webkit.component';

export default {
  title: 'ProvaWebkitComponent',
  component: ProvaWebkitComponent,
  decorators: [
    moduleMetadata(
      //   {
      //   imports: [],
      // }
      ModuloStories
    ),
  ],
} as Meta<ProvaWebkitComponent>;

const Template: Story<ProvaWebkitComponent> = (args: ProvaWebkitComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
