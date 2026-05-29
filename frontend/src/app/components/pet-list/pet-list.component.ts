import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, InputTextModule],
  providers: [ConfirmationService],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  pets: any[] = [];
  petForm: FormGroup;
  displayModal = false;
  isEdit = false;

  constructor(
    private petService: PetService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.petForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      especie: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getAll().subscribe(data => this.pets = data);
  }

  showCreateModal() {
    this.isEdit = false;
    this.petForm.reset();
    this.displayModal = true;
  }

  showEditModal(pet: any) {
    this.isEdit = true;
    this.petForm.patchValue(pet);
    this.displayModal = true;
  }

  save() {
    if (this.petForm.invalid) return;

    const pet = this.petForm.value;
    if (this.isEdit) {
      this.petService.update(pet.id, pet).subscribe(() => {
        this.loadPets();
        this.displayModal = false;
      });
    } else {
      this.petService.create(pet).subscribe(() => {
        this.loadPets();
        this.displayModal = false;
      });
    }
  }

  deleteItem(pet: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + pet.nome + '?',
      accept: () => {
        this.petService.delete(pet.id).subscribe(() => {
          this.loadPets();
        });
      }
    });
  }
}
