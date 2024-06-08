// stores/todoStore.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTodoStore = defineStore('todoStore', () => {
  const todos = ref([]);

  const addTodo = (text) => {
    todos.value.push({ text, completed: false });
  };

  const removeTodo = (index) => {
    todos.value.splice(index, 1);
  };

  const toggleTodoCompletion = (index) => {
    todos.value[index].completed = !todos.value[index].completed;
  };

  const unfinishedTodosCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length;
  });

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodoCompletion,
    unfinishedTodosCount,
  };
});
