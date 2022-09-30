import { Component, Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { UsuariosService } from '../../Services/usuarios.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {

  Usuario = {
    nombre: "",
    password: "",
    email: "",
    apellidos: ""
  }

  constructor(public UsuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  Mostrar(){
    console.log(this.Usuario)
  }

  registrarUsuario(){
    console.log(this.Usuario); 
    this.UsuariosService.registrarUsuario(this.Usuario).then((data: any) =>{
    }).catch((err) =>{
      //console.log(err);
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Credenciales correctas',
          showConfirmButton: false,
          timer: 1500
        })
  }

}
