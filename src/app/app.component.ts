import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs/operators";
import { Todo, TodosService } from "./services/todos.service";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  todos: Todo[] = [];
  todoTitle: string = '';

  loading: boolean = true;

  constructor(
    private todosService: TodosService,
  ) {
  }

  ngOnInit(): void {
    this.fetchTodos();
  }


  fetchTodos() {
    this.loading = true;

    this.todosService.fetchTodos()
        .subscribe(
          response => {
            this.todos = response;
            this.loading = false;
            console.log(response);
          },
        )
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false,
    }

    this.todosService.addTodo(newTodo)
      .subscribe(
        todo => {
          this.todos.push(todo);
          this.todoTitle = '';
        }
      )
  }

  removeTodo(id: number | undefined) {
    this.todosService.removeTodo(id)
    .subscribe( response => {
      console.log(response);
      this.todos = this.todos.filter(todo => todo.id !== id);
    })
  }
}
