<template>
  <div class="main-container">
    <div class="header">
      <LogoTodo></LogoTodo>
    </div>
    <div class="CheckList">
      <form class="todo-input-form">
        <input @focus.prevent="" class="todo-input font16" v-model="todoInput" type="text" placeholder="Add a new task" />
        <button @click.prevent="addTodo()" class="create-button font14" type="submit">
          <span class="create-button-text">Create</span>
          <PlusIcon class="plus-icon"></PlusIcon>
        </button>
      </form>
      <div>
      <my-element v-if="renderCounter" :todoList="todoList"></my-element>
      
        <div v-if="!todoList.length" class="emptylist">
          <EmptyList class="empty-img"></EmptyList>
          <div class="empty-messages">
            <p class="empty-warning empty-warning-header font16">You don't have tasks registered yet</p>
            <p class="empty-warning font 16">Create tasks and organize your to-do items</p>
          </div>
        </div>
        <ul class="todos-list" v-if="todoList.length">
          <li :todo="todoList" class="todo-item" v-for="(todoItem, index) in todoList" :key="index">
            <div class="todo-container">
              <input :id="`todoComplete${index}`" class="checkbox-input" type="checkbox" v-model="todoChecked"
                @change="editToDoItem(index)" />
              <label :for="`todoComplete${index}`">
                <div>
                  <div v-if="todoItem.checked" class="checkbox-container">
                    <div v-if="!hoverCheckedBox[index]" @mouseleave="hoverCheckedBox[index] = false"
                      @mouseenter="hoverCheckedBox[index] = true">
                      <CheckedDefault></CheckedDefault>
                    </div>
                    <div v-if="hoverCheckedBox[index]" @mouseleave="hoverCheckedBox[index] = false">
                      <CheckedActive></CheckedActive>
                    </div>
                  </div>
                  <div v-if="!todoItem.checked" class="checkbox-container">
                    <div v-if="!hoverUncheckedBox[index]" @mouseleave="hoverUncheckedBox[index] = false"
                      @mouseenter="hoverUncheckedBox[index] = true">
                      <UncheckedDefault></UncheckedDefault>
                    </div>
                    <div v-if="hoverUncheckedBox[index]" @mouseleave="hoverUncheckedBox[index] = false">
                      <UnchekedActive></UnchekedActive>
                    </div>
                  </div>
                </div>
              </label>
              <p class="todoText font14" v-bind:class="(todoItem.checked) ? 'todoCompleted' : ''">{{ todoItem.toDoText }}
              </p>
              <div class="delete-button">
                <div v-if="!deleteHover[index]" @mouseleave="deleteHover[index] = false"
                  @mouseenter="deleteHover[index] = true" @click="removeTodo(todoItem)">
                  <DeleteDefault></DeleteDefault>
                </div>
                <div v-if="deleteHover[index]" @mouseleave="deleteHover[index] = false" @click="removeTodo(todoItem)">
                  <DeleteActive></DeleteActive>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref, onMounted, watch, nextTick } from 'vue'
import LogoTodo from '../assets/images/LogoTodo'
import CheckedActive from '../assets/images/CheckedActive'
import CheckedDefault from '../assets/images/CheckedDefault'
import UnchekedActive from '../assets/images/UncheckedActive'
import UncheckedDefault from '../assets/images/UncheckedDefault'
import DeleteActive from '../assets/images/DeleteActive'
import DeleteDefault from '../assets/images/DeleteDefault'
import EmptyList from '../assets/images/EmptyList'
import PlusIcon from '../assets/images/PlusIcon'
import './my-element'
import '../assets/css/main.css'


const todos = ref([])

const todoInput = ref('')
let todoChecked = ref(false);

let deleteHover = ref([]);
let hoverCheckedBox = ref([]);
let hoverUncheckedBox = ref([]);

const renderCounter = ref(true);

const forceRerender = async () => {
  renderCounter.value = false;
  await nextTick();
  renderCounter.value = true;
}

function addTodo() {
  if (!todoInput.value) {
    alert('Please, fill todo with some text');
    return;
  }
  todos.value.push({
    toDoText: todoInput.value,
    checked: false,
  })
  todoInput.value = '';
  deleteHover.value[0] = false;
  forceRerender();
}

function editToDoItem(index) {
  todos.value[index].checked = !todos.value[index].checked;
  forceRerender();
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
  forceRerender();
}

const todoList = computed(() => {
  return todos.value;
}
)

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {
  deep: true
})

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

</script>

