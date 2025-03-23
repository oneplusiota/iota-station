---
title: "React Hooks Explained"
description: "A deep dive into React Hooks and how they can simplify your components"
date: "2023-10-20"
author: "Shivam Nayak"
cover: "/defaultproject.jpeg"
icon: "🪝"
tags: ["React", "Hooks", "JavaScript", "Web Development"]
featured: true
---

# React Hooks Explained

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component. They allow you to "hook into" React state and lifecycle features from function components.

## Why Use Hooks?

Hooks solve several problems in React:

1. **Reusing Stateful Logic**: Hooks allow you to reuse stateful logic without changing your component hierarchy.

2. **Complex Components**: Hooks let you split one component into smaller functions based on what pieces are related.

3. **Classes Confusion**: Hooks let you use more of React's features without classes, which can be confusing with `this` binding.

## Common Hooks

### useState

The `useState` hook lets you add state to functional components:

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
useEffect
The useEffect hook lets you perform side effects in function components:

import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
Conclusion
React Hooks provide a more direct API to React concepts you already know: props, state, context, refs, and lifecycle. They make it easier to reuse stateful logic between components and make your code more readable and maintainable.