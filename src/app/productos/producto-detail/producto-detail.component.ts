import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductosService } from '../productos.service';
import { IProducto } from '../producto.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { BarRating } from 'ngx-bar-rating';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, JsonPipe, BarRating],
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css',
})
export class ProductoDetailComponent implements OnInit {
  producto?: IProducto | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductosService
  ) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (id === null || isNaN(+id)) {
      this.router.navigate(['/home']);
    }

    this.productoService
      .detalle(Number(id))
      .subscribe((producto: IProducto) => {
        this.producto = producto;
      });
  }
}
