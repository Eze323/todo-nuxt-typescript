//pagina principal de MI TODO LIST
<template>
    <div class="container">
        <h1>Mi lista de Tareas</h1>
        <input v-model="newTodoTitle" placeholder="Título de la nueva tarea" />
        <input v-model="newTodoText" placeholder="Texto de la nueva tarea" @keyup.enter="addTodo" />
        <button @click="addTodo">Agregar tarea</button>
        
        <TodoList :todos="todos" @toggle="handleToggle" @remove="handleRemove" />
        
        
    </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue';
import TodoList from '~/components/TodoList.vue';
import type { Todo } from '~/types';

const todos = ref<Todo[]>([]);
const newTodoTitle = ref('');
const newTodoText = ref('');

const addTodo = () => {
    if (!newTodoText.value.trim() ) return;
    todos.value.push({
        id: Date.now(),
        title: newTodoTitle.value,
        text: newTodoText.value,
        completed: false
    });
    newTodoText.value = '';


};

const handleToggle = (id: number) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
    }
};

const handleRemove = (id: number) => {
    todos.value = todos.value.filter(t => t.id !== id);
};
    
</script>
<style scoped>
/* Estilos generales del contenedor */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #020420; /* Fondo negro-azulado similar a Nuxt */
  color: #c9e3e7; /* Color de texto claro para buen contraste */
  min-height: 100vh;
  font-family: 'Inter', sans-serif; /* Una fuente moderna y legible */
}

/* Título principal */
h1 {
  color: #00DC82; /* Verde neón de Nuxt */
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 220, 130, 0.5); /* Efecto de brillo neón */
}

/* Estilos de los inputs */
input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #2d3748; /* Borde oscuro sutil */
  background-color: #1a202c; /* Fondo de input oscuro */
  color: #e2e8f0; /* Color del texto dentro del input */
  border-radius: 8px;
  transition: all 0.3s ease;
}

input::placeholder {
  color: #a0aec0; /* Color del placeholder */
}

input:focus {
  outline: none;
  border-color: #00DC82; /* Borde se vuelve verde neón al hacer focus */
  box-shadow: 0 0 0 2px rgba(0, 220, 130, 0.5); /* Brillo al hacer focus */
}

/* Estilos del botón */
button {
  padding: 0.75rem 1.5rem;
  background-color: #00DC82; /* Color principal de Nuxt */
  color: #020420; /* Texto oscuro sobre el botón verde */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 220, 130, 0.3); /* Sombra para dar profundidad */
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 220, 130, 0.5); /* Sombra más pronunciada al pasar el mouse */
}
</style>