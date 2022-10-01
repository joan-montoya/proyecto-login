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
  correo = "";
  Usuario = {
    nombre: "",
    password: "",
    email: "",
    apellidos: ""
  }
  Usuario1 = {
    email: ""
  }
  @Input() usuarios: any 
  usuari: Array<any> = []
  user = String;
  

  constructor(public UsuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  Mostrar(){
    console.log(this.Usuario)
  }

  registrarUsuario(){
    localStorage.setItem("nom", this.Usuario.nombre);
    localStorage.setItem("app", this.Usuario.apellidos);
    localStorage.setItem("em", this.Usuario.email);
    localStorage.setItem("pass", this.Usuario.password);
    this.Usuario1.email = this.Usuario.email;
    this.UsuariosService.registrarEmail(this.Usuario1).then((data: any) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro Exitoso',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch((err) =>{
      //console.log(err);
        })
        
  }

}
