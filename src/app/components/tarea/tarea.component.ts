import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  form:FormGroup;

  constructor(private fb:FormBuilder,
    private toastr: ToastrService) { 
    this.form = this.fb.group({
      tarea: ['',Validators.required]
    });
  }

  showSuccess() {
    this.toastr.success('La tarea se agrego con exito!','Tarea Agregada');
  }

  ngOnInit(): void {
  }

  todo:string[] = ['Lavar la ropa'];

  progress:string[] = [];
  done:string[] = [];

  agregarTarea(){
    this.todo.push(this.form.value.tarea);
    this.showSuccess();
    this.form.reset();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
