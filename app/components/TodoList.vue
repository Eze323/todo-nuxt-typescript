<template>
<div>
<TodoItem 
        v-for="todo in todos" 
        :key="todo.id" 
        :todo="todo" 
        @toggle="handleToggle(todo.id)"
        @remove="handleRemove(todo.id)"
    />
    <p>
        Total: {{ todos.length }} tareas

    </p>
    </div>
    </template>
<script setup lang="ts">
import { ref, type Prop } from 'vue';
import TodoItem from './TodoItem.vue';
import type { Todo, TodoList } from '~/types';

const props = defineProps({
    todos: {
        type: Array as PropType<TodoList>,
        required: true
    }
})

const emit = defineEmits<{
    toggle:  [id:number]; 
    remove:  [id:number];
}>();

const handleToggle = (id: number) => {
    emit('toggle', id);
};
const handleRemove = (id: number) => {
    emit('remove', id);
};
</script>
<style scoped>
/* Estilos del contenedor de la lista de tareas */
div {
    width: 100%;
    max-width: 400px;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #2d3748; /* Línea separadora sutil */
}

/* Párrafo con el contador de tareas */
p {
    text-align: right;
    font-style: italic;
    color: #a0aec0; /* Un gris más suave para la información secundaria */
    margin-top: 1rem;
}
</style>