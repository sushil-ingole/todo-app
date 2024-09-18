import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Todo } from '../Models/Todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @ViewChild('newTodoRef') newTodoRef!: ElementRef;
  newTodo: string = '';
  todos: Todo[] = [];

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllTodos().then((val: Todo[]) => {
      this.todos = val;
    });
  }

  ngAfterViewInit(): void {
    this.newTodoRef.nativeElement.focus();
  }
  
  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({ task: this.newTodo, completed: false });
      this.apiService.insertTodo({ task: this.newTodo, completed: false });
      this.newTodo = '';
    }
    this.newTodoRef.nativeElement.focus();
  }

  toggleComplete(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
