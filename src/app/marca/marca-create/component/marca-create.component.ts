import { Component, OnInit } from "@angular/core";
import { Marca } from "../../models/marca.model";
import { MarcaService } from '../../marca.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
 selector: 'gc-marca-create',
 templateUrl: './marca-create.component.html'
})

export class MarcaCreateComponent implements OnInit{

  marcaForm!: FormGroup;
  submitted = false
    nome!: string;
    sigla!: string;
    descricao!: string;
    marca!: Marca;
  
    constructor(private marcaService: MarcaService, private formBuilder: FormBuilder) {}
    ngOnInit(): void {
      this.marcaForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(5)]),
      sigla: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      });
      }
    save() {
      const novaMarca: Marca = {
        nome: this.nome,
        sigla: this.sigla,
        descricao: this.descricao
      };
  
      this.marcaService.save(novaMarca).subscribe(
        (res) => {
          console.log('Marca salva:', res);
          // Limpa os campos após salvar
          this.resetForm();
        },
        (error) => console.error('Erro ao salvar marca:', error)
      );
    }
    resetForm() {
        this.nome = '';
        this.sigla = '';
        this.descricao = '';
      }
      addCursoForm(){
        this.submitted = false;
        this.marcaForm.reset();
        }
}