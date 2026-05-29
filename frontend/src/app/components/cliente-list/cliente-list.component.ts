import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, InputTextModule],
  providers: [ConfirmationService],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  clienteForm: FormGroup;
  displayModal = false;
  isEdit = false;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.clienteForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getAll().subscribe(data => this.clientes = data);
  }

  showCreateModal() {
    this.isEdit = false;
    this.clienteForm.reset();
    this.displayModal = true;
  }

  showEditModal(cliente: any) {
    this.isEdit = true;
    this.clienteForm.patchValue(cliente);
    this.displayModal = true;
  }

  save() {
    if (this.clienteForm.invalid) return;

    const cliente = this.clienteForm.value;
    if (this.isEdit) {
      this.clienteService.update(cliente.id, cliente).subscribe(() => {
        this.loadClientes();
        this.displayModal = false;
      });
    } else {
      this.clienteService.create(cliente).subscribe(() => {
        this.loadClientes();
        this.displayModal = false;
      });
    }
  }

  deleteItem(cliente: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + cliente.nome + '?',
      accept: () => {
        this.clienteService.delete(cliente.id).subscribe(() => {
          this.loadClientes();
        });
      }
    });
  }
}
