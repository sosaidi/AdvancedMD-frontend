import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, NgForOf, NgClass, NgIf, DatePipe],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todos: {
    task: string
    priority: string
    completed: boolean
    dueDate?: string
  }[] = []
  newTodo = { task: '', priority: 'Low', completed: false, dueDate: '' }
  completedCount: number = 0

  // Add a new task
  addTodo(): void {
    if (this.newTodo.task.trim()) {
      this.todos.unshift({ ...this.newTodo }) // Add new task to the top
      this.newTodo = {
        task: '',
        priority: 'Low',
        completed: false,
        dueDate: '',
      } // Reset input
      this.updateCompletedCount()
    }
  }

  // Toggle completion status
  toggleComplete(todo: { completed: boolean }): void {
    todo.completed = !todo.completed
    this.todos = [
      ...this.todos.filter((t) => !t.completed),
      ...this.todos.filter((t) => t.completed),
    ]
    this.updateCompletedCount()
  }

  // Delete a task
  deleteTodo(todo: { task: string }): void {
    this.todos = this.todos.filter((t) => t !== todo)
    this.updateCompletedCount()
  }

  // Update the completed task count
  private updateCompletedCount(): void {
    this.completedCount = this.todos.filter((t) => t.completed).length
  }
}
