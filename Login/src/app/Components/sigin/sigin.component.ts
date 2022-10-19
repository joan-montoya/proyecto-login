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
  resultado = "La contraseña no cumple con lo siguiente: ";   
  points = 0;                     
  mayCount = 0;                  
  segnCount = 0;
  minCount = 0;
  carCount = 0;
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
  vali = '';
  

  constructor(public UsuariosService: UsuariosService) { }

  ngOnInit(){
    this.obtenerUsuarios();
  }

  Mostrar(){
    console.log(this.Usuario)
  }

  registrarUsuario(){
    this.mayCount = 0;
    this.minCount = 0;
    this.segnCount = 0;
    this.carCount = 0;
    this.vali = this.Usuario.password;
    if(this.vali.length > 8){
      for(let x = 0; x < this.vali.length; x++){
        if((this.vali.charCodeAt(x) > 64 && this.vali.charCodeAt(x) < 91)){
          this.mayCount ++;
        }
        if((this.vali.charCodeAt(x) > 96 && this.vali.charCodeAt(x) < 123)){
          this.minCount ++;
        }
        if((this.vali.charCodeAt(x + 1) - (this.vali.charCodeAt(x) ) ) == 1 ){
          this.segnCount ++;
        }
        if((this.vali.charCodeAt(x) > 32 && this.vali.charCodeAt(x) < 48)){
          this.carCount ++;
        }
        if((this.vali.charCodeAt(x) > 57 && this.vali.charCodeAt(x) < 65)){
          this.carCount ++;
        }
        if((this.vali.charCodeAt(x) > 90 && this.vali.charCodeAt(x) < 97)){
          this.carCount ++;
        }
        if((this.vali.charCodeAt(x) > 122 && this.vali.charCodeAt(x) < 255)){
          this.carCount ++;
        }
      }

      if(this.mayCount > 0 && this.mayCount < this.vali.length){
        this.mayCount=0;
      }else if(this.mayCount == 0 && this.mayCount < this.vali.length){
        this.mayCount=0;
        this.resultado = this.resultado+ "no contiene mayusculas, ";
        this.points++;
      }
      if(this.minCount == 0){
        this.minCount = 0;
        this.resultado = this.resultado+ "No contiene minusculas, ";
        this.points++;
        
      }
      if(this.segnCount > 0){
          this.segnCount=0;
          this.resultado = this.resultado+ "no puede contener caracteres consecutivos, ";
          this.points++;
        }
      if(this.carCount == 0){
        this.carCount = 0;
        this.resultado = this.resultado+ "no contiene caracter especial, ";
        this.points++;
        }

        if(this.points > 0){
          Swal.fire(
            'La contraseña no es valida',
            this.resultado,
            'error'
          )
          this.resultado = "La contraseña no cumple con lo siguiente: ";
          this.points = 0;
        }else{
          console.log("dentro")
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

        
    }else{
      Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Minimo 8 caracteres',
              showConfirmButton: false,
              timer: 1500
            })
    }

    // if(this.carCount > 0){
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'contiene caracter',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.carCount=0;
    //   }
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
