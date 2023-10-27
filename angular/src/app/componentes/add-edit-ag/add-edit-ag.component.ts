import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AmbitoGeograficoService } from 'src/app/services/ambito-geografico.service';

@Component({
  selector: 'app-add-edit-ag',
  templateUrl: './add-edit-ag.component.html',
  styleUrls: ['./add-edit-ag.component.css', '../../../shared-styles.css']
})
export class AddEditAgComponent  implements OnInit{
  ambitosG: any[] = []; 
  errorMsg: string | undefined;
  formAmG: FormGroup;
  editAmGeId: number | null = null; 
  sideNavStatus: boolean = false;

constructor(
  private ambitoGeograficoService: AmbitoGeograficoService,
  private router: Router,
  private route: ActivatedRoute,
  private toastr: ToastrService,
  private fb: FormBuilder
  ){
  //se crea formulario con 2 campos 
  this.formAmG = this.fb.group({
    nombre_ambito_geografico: ['', Validators.required],
    estado_ambito_geografico:[true] 
})
}
ngOnInit():void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (!isNaN(id)) {  //si se obtiene un id se almacena 
      this.editAmGeId = id; //aqui 
      this.getAmbitosGeografico(id); //carga los datos en el formulario
    }
  });  
}

//se llama cuando el usuario intenta guardar un ambito geografico 
guardarAmbitoG(event: Event) {
  event.preventDefault();

  if (this.formAmG.valid) { //verificacion 
    const nombreAmbitoGeografico = this.formAmG.get('nombre_ambito_geografico')?.value;
    const estadoAmbitoGeografico = this.formAmG.get('estado_ambito_geografico')?.value;

    if (this.editAmGeId !== null) { //se obtienen valores del formulario 
      this.updateAmbitoGeografico(this.editAmGeId, nombreAmbitoGeografico, estadoAmbitoGeografico);
    } else {
      this.ambitoGeograficoService.newAmbitoGeografico({
        nombre_ambito_geografico: nombreAmbitoGeografico,
        estado_ambito_geografico: estadoAmbitoGeografico
      }).subscribe({
        next: (respuesta) => {
          console.log('Ambito geografico creado exitosamente', respuesta);
          this.getAmbitosGeograficos();
          console.log('Valor de estado_ambito_geografico:', estadoAmbitoGeografico);
          this.toastr.success('ambito geografico fue con éxito', 'Unidad Creada');
        },
        error: (error) => {
          if (error && error.msg) {
            this.errorMsg = error.msg;
            console.error('Error al crear ambito academico', error);
          }
        }
      });
    }
  }
}

//obtiene un ambieto geografico y llena el formulario
getAmbitosGeografico(id: number) {
    this.ambitoGeograficoService.getAmbitosGeografico(id).subscribe((ambitoGeografico) => {
      if (ambitoGeografico && this.formAmG) {
        this.formAmG.get('nombre_ambito_geografico')?.setValue(ambitoGeografico.nombre_ambito_geografico);
        this.formAmG.get('estado_ambito_geografico')?.setValue(ambitoGeografico.estado_ambito_geografico);
      }
      
    });
  }

//obtiene la lista de ambitos geograficos y actualiza ambitosG(lista vacia)
getAmbitosGeograficos() {
  this.ambitoGeograficoService.getAmbitosGeograficos().subscribe((data) => {
    this.ambitosG = data;
    this.formAmG.get('nombre_ambito_geografico')?.setValue('');
    this.formAmG.get('estado_ambito_geografico')?.setValue ('');
    
  });
}

//actualiza ambito geografico existente 
updateAmbitoGeografico(id: number, nombreAmbitoGeografico: string , estadoAmbitoGeografico: boolean) {
  if (this.formAmG) {
    this.ambitoGeograficoService.updateAmbitoGeografico(id, {
      nombre_ambito_geografico: nombreAmbitoGeografico, 
      estado_ambito_geografico: estadoAmbitoGeografico

    }).subscribe({
      next: (respuesta) => {
        console.log('ambito geografico  actualizado exitosamente', respuesta);
        this.getAmbitosGeograficos();
        this.toastr.success('el ambito geografico fue editado correctamente');
      },
      error: (error) => {
        if (error && error.msg) {
          this.errorMsg = error.msg;
          console.error('Error al actualizar ambito academico', error);
        }
      }
    });
  }

}

}








