import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: {
    task: string
    priority: string
    completed: boolean
    dueDate?: string
  }[] = []

  getTodos() {
    return this.todos
  }

  addTodo(todo: {
    task: string
    priority: string
    completed: boolean
    dueDate?: string
  }) {
    this.todos.unshift(todo)
  }

  toggleComplete(todo: { completed: boolean }) {
    todo.completed = !todo.completed
  }

  deleteTodo(todo: { task: string }) {
    this.todos = this.todos.filter((t) => t !== todo)
  }
}
