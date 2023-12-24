import { Component, Input, OnInit } from '@angular/core';
import { Parabola } from 'src/app/interface/interface';
import { ContenidoComponent } from '../formulario/contenido.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})

export class ItemlistComponent implements OnInit{
 @Input() listparabola: any[] = [];
  constructor(private contenido: ContenidoComponent,
            private taskService: TaskService,
            ) {}

  ngOnInit() {
    setTimeout(async () => {
      for (const l of this.listparabola) {
        const firstFriend = await this.taskService.db.libro.get({id: Number(l.idcategoria)});
        l.catname = firstFriend.nombre;
      }
    }, 1000);
  }


}
