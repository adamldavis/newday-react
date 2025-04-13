import { Meta } from "@storybook/react";
import { fn } from '@storybook/test';
import TodoItem from "./TodoItem";

export default {
    title: "App/Todo-Item",
    component: TodoItem,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        text: { control: 'text', description: 'Item text' },
        checked: { control: 'boolean' },
        id: { control: 'select', options: ['1', '123', '900'] },
    },
    args: {
        moveItem: fn(),
        modifyItem: fn(),
        deleteItem: fn(),
        index: 0,
        id: '123',
    },
} satisfies Meta<typeof TodoItem>;

export const Simple: Meta<typeof TodoItem> = {
    args: {
      text: 'Simple'
    },
  };


export const Secondary: Meta<typeof TodoItem> = {
    args: {
      text: 'This is a todo list item'
    },
  };
