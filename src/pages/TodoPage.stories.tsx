import { Meta } from "@storybook/react";
import TodoPage from "./TodoPage";

export default {
    title: "App/TodoPage",
    component: TodoPage,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        initialTodos: { control: 'object', description: 'Items' },
    },
    args: {
        initialTodos: [],
    },
} satisfies Meta<typeof TodoPage>;

export const Simple: Meta<typeof TodoPage> = {
    args: {
      initialTodos: [{ id: '123', text: 'Simple', labels: [], checked: true }],
    },
  };


export const Secondary: Meta<typeof TodoPage> = {
    args: {
      initialTodos: [
        { id: '1', text: 'This is the first one', labels: [], checked: false },
        { id: '2', text: 'This is the second one', labels: [], checked: true },
      ],
    },
};
