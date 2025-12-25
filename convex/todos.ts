import { ConvexError, v } from "convex/values";
import { mutation, query } from "../convex/_generated/server";

export const getTodos = query({
  handler: async (ctx) => {
    const result = await ctx.db.query("todos").order("desc").collect();
    return result;
  },
});

export const addTodos = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return result;
  },
});

export const toggleTodos = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    const result = await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
    return result;
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const clearTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();

    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
    return { todoDeleted: todos.length };
  },
});
