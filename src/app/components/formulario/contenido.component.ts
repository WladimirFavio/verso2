import { Component, Input, OnInit } from '@angular/core';
import { Libro, Parabola } from '../../interface/interface';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['../../app.component.css']
})

export class ContenidoComponent implements OnInit {
  libro: Libro = {};
  // parabola: Parabola = {};
  listParabola: any = [];
  listCategoria: any = [];
  // updParabola: Parabola = {};
  isUpdate = false;
  isUpdateL = false;
  categoria = [
    {id: 0, name: 'Antiguo Testamento'},
    {id: 1, name: 'Nuevo Testamento'}
  ];

constructor(
  private taskService: TaskService,
  ) {

}

  ngOnInit() {
  }


  async loadLibro() {
    setTimeout(() => {
      this.libro.nombre = '';
    }, 500);
    this.listCategoria = await this.taskService.loadLibro();
      for (const l of this.listCategoria) {
        l.catname = this.categoria.find(f => f.id == l.categoria)?.name;
      }
  }

  
  async openModal(idModal: string) {
    this.libro.nombre = '';
    const modal = document.getElementById(idModal);
    if (modal != null) {
      modal.style.display = 'block';
    }

    if (idModal == 'modalLibro') {
      this.generaridLibro()
      this.loadLibro();
    }

  }

  async generaridLibro() {
    const lista: any = await this.taskService.libro?.toArray();
    if (lista !== null || lista !== undefined) {
      const max = lista.map((e: any) => e.id);
      this.libro.id = Math.max(...max) + 1;
    } else {
      this.libro.id = 1;
    }
  }


  closeModal(idModal: string) {
    const modal = document.getElementById(idModal);
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  async guardarLibro() {
    if (this.libro.nombre == '') {
      alert('Ingrese nombre del libro');
      return;
    } else if(this.libro.categoria == null) {
      alert('Seleccione una categoria');
      return;
    } 
    if (this.isUpdateL) {
      this.taskService.updateRegisterLibro(this.libro);
      this.isUpdateL = false;
    } else {
      this.taskService.guardarIndexedDb(this.libro);
    }
    
    this.generaridLibro();
    this.loadLibro();

  }

  eliminarLibro(id: any) {
    this.taskService.deleteRegisterLibro(id);
    this.loadLibro();
  }

  editarLibro(item: Libro) {
    this.isUpdateL = true;
    this.libro = {
      id: item.id,
      nombre: item.nombre,
      categoria: item.categoria
    }
  }

}