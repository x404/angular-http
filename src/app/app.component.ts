import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs/operators";

export interface Todo{
  completed: boolean,
  title: string,
  id?: number
}


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
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.loading = true;
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
        .pipe(
          delay(500)
        )
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

    this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
      .subscribe(
        todo => {
          this.todos.push(todo);
          this.todoTitle = '';
        }
      )
  }

  removeTodo(id: number | undefined): void {

    this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .subscribe( response => {
      console.log(response);
      this.todos = this.todos.filter(todo => todo.id !== id);
    })
  }
}
