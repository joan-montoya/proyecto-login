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
  contrase = "";
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

  ngOnInit(){
    this.obtenerUsuarios();
  }

  Mostrar(){
    console.log(this.Usuario)
  }

  registrarUsuario(){
    if(this.Usuario.password == this.contrase){
      for(let x = 0; x < this.usuarios.length; x++){
        if(this.Usuario.email == this.usuarios[x].email ){
          console.log("si")
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este Correo ya esta en uso',
            showConfirmButton: false,
            timer: 1500
          })
          break;
         
        }else{
          localStorage.setItem("nom", this.Usuario.nombre);
          localStorage.setItem("app", this.Usuario.apellidos);
          localStorage.setItem("em", this.Usuario.email);
          localStorage.setItem("pass", this.Usuario.password);

          this.Usuario1.email = this.Usuario.email;
          this.UsuariosService.registrarEmail(this.Usuario1).then((data: any) =>{
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Registro Completo',
                  showConfirmButton: false,
                  timer: 1500
                })
              }).catch((err) =>{
                //console.log(err);
                  })
        }
      }

          
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Las Contraseñas no coinciden',
            showConfirmButton: false,
            timer: 1500
          })
        }

    }

    obtenerUsuarios() {
      this.UsuariosService.obtenerUsuarios().then((data: any) =>{
        console.log(data.usuarios);
        this.usuarios=data.usuarios;
      }).catch((err) =>{
        console.log(err);
      })
      console.log(this.usuarios);
    }
    
}
