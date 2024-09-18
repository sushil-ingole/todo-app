import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../Models/Todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  async getAllTodos(): Promise<any> {
    const promise1 = new Promise((resolve) => {
      this.http.get("http://localhost:5100/alltodos").subscribe((res: any) => {
        console.log(res);
        resolve(res);
      });
    });
    return promise1;
  }

  insertTodo(todo: Todo): void {
    this.http.post('http://localhost:5100/insertTodo', todo).subscribe((res: any) => {
      console.log("insertTodo: ", res);
    });
  }
}
