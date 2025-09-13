<template>
    <div class="todo-item">
        <input type="checkbox" v-model="localTodo.completed" @change="$emit('toggle', localTodo.id)" />
        <span class="todo-title">{{ localTodo.title }}</span>
        <span :class="{ completed: localTodo.completed }" class="todo-text">{{ localTodo.text }}</span>
        <button @click="$emit('remove', localTodo.id)">Eliminar</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'; // Asegúrate de importar 'watch'
import type { Todo } from '~/types';

const props = defineProps({
    todo: {
        type: Object as PropType<Todo>,
        required: true
    }
});

// Usamos localTodo para que el v-model no modifique directamente la prop
const localTodo = ref<Todo>({ ...props.todo });

// Usamos watch para actualizar localTodo si la prop 'todo' cambia desde el padre
watch(() => props.todo, (newTodo) => {
  localTodo.value = { ...newTodo };
}, { deep: true }); // deep: true si 'todo' tiene objetos anidados que podrían cambiar

// Emitimos eventos para toggle y remove, pasando el ID de la tarea
const emit = defineEmits(['toggle', 'remove']);

</script>

<style scoped>
/* Contenedor de cada ítem */
.todo-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    margin-bottom: 0.75rem;
    background-color: #1a202c; /* Fondo oscuro del ítem */
    border-radius: 8px;
    border: 1px solid #2d3748; /* Borde sutil */
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Sombra suave */
}

/* Efecto al pasar el mouse sobre el ítem */
.todo-item:hover {
    border-color: #00DC82; /* Borde se ilumina de verde neón */
    box-shadow: 0 0 15px rgba(0, 220, 130, 0.4); /* Efecto de brillo */
    transform: translateY(-2px); /* Pequeño levantamiento */
}

/* Estilos para el texto del título y texto de la tarea */
.todo-title {
    font-weight: bold;
    color: #e2e8f0;
    margin-right: 0.5rem;
}

.todo-text {
    flex-grow: 1; /* Permite que el texto ocupe el espacio disponible */
    color: #c9e3e7;
}

/* Estilos cuando la tarea está completada */
.completed {
    text-decoration: line-through; /* Tacha el texto */
    color: #a0aec0; /* Color gris para indicar que está "desactivado" */
    font-style: italic;
}

/* Estilos del checkbox personalizado */
input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem; /* Asegura el tamaño fijo */
    min-height: 1.5rem;
    border: 2px solid #2d3748;
    border-radius: 6px; /* Bordes ligeramente más redondeados */
    background-color: #1a202c;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    margin-right: 1rem;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5); /* Sombra interna para profundidad */
}

/* Efecto cuando el checkbox está marcado */
input[type="checkbox"]:checked {
    background-color: #00DC82;
    border-color: #00DC82;
    box-shadow: 0 0 8px rgba(0, 220, 130, 0.7); /* Brillo intenso al marcar */
}

/* Icono de "check" dentro del checkbox */
input[type="checkbox"]:checked::after {
    content: '✓';
    font-size: 1.2rem;
    font-weight: bold;
    color: #020420; /* Color del check, oscuro para buen contraste */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Estilos del botón de "Eliminar" */
button {
    background-color: transparent;
    border: 1px solid #ff6b6b; /* Borde rojo */
    color: #ff6b6b; /* Color rojo sutil para eliminar */
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 1rem;
    transition: all 0.2s ease;
    text-transform: uppercase;
    font-size: 0.85rem;
}

button:hover {
    background-color: #ff3b3b; /* Fondo rojo más intenso */
    color: #ffffff; /* Texto blanco */
    box-shadow: 0 0 10px rgba(255, 59, 59, 0.5); /* Brillo rojo */
    transform: translateY(-1px);
}
</style>