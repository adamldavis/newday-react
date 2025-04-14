import { Meta } from "@storybook/react";
import { fn } from '@storybook/test';
import TodoList from "./TodoList";

export default {
    title: "App/Todo-List",
    component: TodoList,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        todos: { control: 'object', description: 'Items' },
    },
    args: {
        todos: [],
        dispatch: fn(),
    },
} satisfies Meta<typeof TodoList>;

export const Simple: Meta<typeof TodoList> = {
    args: {
      todos: [{ id: '123', text: 'Simple', labels: [], checked: true }],
    },
  };


export const Secondary: Meta<typeof TodoList> = {
    args: {
      todos: [
        { id: '1', text: 'This is the first one', labels: [], checked: false },
        { id: '2', text: 'This is the second one', labels: [], checked: true },
      ],
    },
};
