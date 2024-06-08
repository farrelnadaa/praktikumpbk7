<template>
  <div id="app">
    <h1>DAFTAR TUGAS</h1>
    <div class="input-container">
      <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Tambah tugas baru" />
      <button @click="addNewTodo">Tambah</button>
    </div>
    <p class="info">Tugas Belum Selesai: <strong>{{ unfinishedTodosCount }}</strong></p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.completed }">
        <div class="todo-item">
          <input type="checkbox" :checked="todo.completed" @change="toggleTodoCompletion(index)" />
          <span>{{ todo.text }}</span>
        </div>
        <button class="delete-button" @click="removeTodoItem(index)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref('');

    const addNewTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value);
        newTodo.value = '';
      }
    };

    const removeTodoItem = (index) => {
      todoStore.removeTodo(index);
    };

    const toggleTodoCompletion = (index) => {
      todoStore.toggleTodoCompletion(index);
    };

    return {
      newTodo,
      todos: todoStore.todos,
      unfinishedTodosCount: todoStore.unfinishedTodosCount,
      addNewTodo,
      removeTodoItem,
      toggleTodoCompletion
    };
  }
};
</script>

<style scoped>
#app {
  /* Properti latar belakang */
  background-image: url('/src/assets/wallpaperflare.com_wallpaper.jpg'); /* Ubah '/background.jpg' sesuai dengan path gambar Anda */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Gaya lainnya */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 60px auto;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #38a169;
  transform: scale(1.05);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: background-color 0.3s, transform 0.3s;
}

li:hover {
  background-color: #f1f1f1;
  transform: scale(1.02);
}

.completed span {
  text-decoration: line-through;
  color: #ccc;
}

.todo-item {
  display: flex;
  align-items: center;
}

input[type="checkbox"] {
  margin-right: 10px;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.info {
  margin-bottom: 20px;
  font-size: 1.1em;
  color: #555;
}
</style>
