@extends('template')
@section('Titulo_Pagina', 'Control De Turnos')
@section('body')
@php
$cargo = auth()->guard('empleados')->user()->cargo;
@endphp

    @if($cargo < 5 ) 
        <p class="lead">
            Acceso Denegado
        </p>
    @else
    <div class="modal" id="new_user">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Creación De Usuario</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="nombre_completo"
                                class="col-md-4 col-form-label text-md-right">{{ __('Nombre Completo') }}</label>

                            <div class="col-md-6">
                                <input type="" name="id_empleados" id="campo1" hidden="true" readonly="true">
                                <input type="text" class="form-control @error('nombre_completo') is-invalid @enderror"
                                    name="nombre_completo" autofocus id="campo2">

                                @error('nombre_completo')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email"
                                class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input type="email" class="form-control @error('email') is-invalid @enderror"
                                    name="email" id="campo5">

                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="usuario"
                                class="col-md-4 col-form-label text-md-right">{{ __('Usuario: ') }}</label>

                            <div class="col-md-6">
                                <input type="usuario" class="form-control @error('usuario') is-invalid @enderror"
                                    name="usuario" id="campo7">

                                @error('usuario')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password"
                                class="col-md-4 col-form-label text-md-right">{{ __('Contraseña') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password"
                                    class="form-control @error('password') is-invalid @enderror" name="password"
                                    autocomplete="new-password">

                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm"
                                class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control"
                                    name="password_confirmation" autocomplete="new-password">
                            </div>
                            <input type="" name="contrasena" hidden="true" readonly="true">
                        </div>
                        <div class="form-group row">
                            <label for="num_identificacion"
                                class="col-md-4 col-form-label text-md-right">{{ __('No-Identificación') }}</label>

                            <div class="col-md-6">
                                <input type="" class="form-control @error('num_identificacion') is-invalid @enderror"
                                    name="num_identificacion" id="campo3">

                                @error('num_identificacion')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="num_telefono"
                                class="col-md-4 col-form-label text-md-right">{{ __('Número Teléfono') }}</label>

                            <div class="col-md-6">
                                <input type="" class="form-control @error('num_telefono') is-invalid @enderror"
                                    name="num_telefono" id="campo4">

                                @error('num_telefono')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="cargo" class="col-md-4 col-form-label text-md-right">{{ __('Cargo') }}</label>

                            <div class="col-md-6">
                                <select class="form-control @error('cargo') is-invalid @enderror" name="cargo"
                                    id="campo6">
                                    @if($roles->count())
                                    @foreach($roles as $cargo)
                                    <option value="{{$cargo->id}}">{{$cargo->nombre}}</option>
                                    @endforeach
                                    @endif
                                </select>

                                @error('cargo')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="remitente_correo"
                                class="col-md-4 col-form-label text-md-right">{{ __('Podrá recibir correos de reportes ?') }}</label>

                            <div class="col-md-6">
                                <select class="form-control @error('remitente_correo') is-invalid @enderror"
                                    name="remitente_correo" id="campo11">
                                    <option value="0">NO</option>
                                    <option value="1">SI</option>
                                </select>

                                @error('remitente_correo')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="autoriza"
                                class="col-md-4 col-form-label text-md-right">{{ __('Podrá Este Usuario Supervisar Turnos y Gastos ?') }}</label>
                            -
                            <div class="col-md-6">
                                <select class="form-control @error('autoriza') is-invalid @enderror" name="autoriza"
                                    id="campo9">
                                    <option value="0">NO</option>
                                    <option value="1">SI</option>
                                </select>

                                @error('autoriza')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="aprueba"
                                class="col-md-4 col-form-label text-md-right">{{ __('Este Usuario Podrá Aprobar Turnos y Gastos ? ') }}</label>

                            <div class="col-md-6">
                                <select class="form-control @error('aprueba') is-invalid @enderror" name="aprueba"
                                    id="campo10">
                                    <option value="0">NO</option>
                                    <option value="1">SI</option>
                                </select>

                                @error('aprueba')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="aprueba"
                                class="col-md-4 col-form-label text-md-right">{{ __('USUARIO ACTIVO ? ') }}</label>

                            <div class="col-md-6">
                                <select class="form-control @error('activo') is-invalid @enderror" name="activo"
                                    id="campo12">
                                    <option value="0">NO</option>
                                    <option value="1">SI</option>
                                </select>

                                @error('activo')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        </div>
                        <input type="" name="tipo_identificacion" hidden="true" readonly="true"
                            value="Cédula-Nacionalidad">
                        <input type="" name="proveedor" hidden="true" readonly="true" value="Directa">
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Crear') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- *****  -->
   
    <div class="card collapsed-card">
              <div class="card-header bg-warning ">
                <h3 class="card-title">  Roles de Usuario </h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-plus"></i>
                  </button>
                </div>
                <!-- /.card-tools -->
              </div>
              <!-- /.card-header -->
              <div class="card-body" style="display: none;">
              <table class="table table-xl table-responsive-md table-striped table-hover ">
                <thead class="thead-dark">
                    <tr style="text-align: center;">
                        <th>ID</th>
                        <th>ROL</th>
                        <th>DESCRIPCION</th>
                    </tr>
                </thead>
                <tbody>
                    <form method="POST" action=" {{ route('update_role') }} ">@csrf
                        <!-- create_role -->
                        @foreach($roles as $rol)
                        <tr style="text-align: center;">
                            <td> {{$rol->id}}
                                <input type="" name="id[]" value="{{$rol->id}}" hidden="true" readonly="true">
                            </td>
                            <td>
                                <input type="" name="nombre[]" value="{{$rol->nombre}}" class="form-control">
                            </td>
                            <td>
                                <input type="" name="descripcion[]" value="{{$rol->descripcion}}" class="form-control">
                            </td>
                        </tr>
                        @endforeach
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <button class="btn btn-success">Actualizar</button>
                            </td>
                        </tr>
                    </form>
                </tbody>
            </table>
        </div>
              </div>
              <div>
       
        
   
            </div>


    <!-- **** -->

    <div>
        <p class="lead">
           <strong> Usuarios de Empleados</strong>
        </p>
        <div class="form-group">
                        <a href=""  class="btn btn-info">Imprimir Reporte en PDF</a>
                        </div>
        <div class="table-responsive">

            <table class="table whitethead-dark">
                <thead class="thead-dark">
                    <tr class="">
                        <th scope="col">N# </th>
                        <th scope="col">Nombre </th>
                        <th scope="col">N# Identidad</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Usuario</th>
                        <!--   <th scope="col">Contraseña no </th>-->
                        <th scope="col">Autoriza?</th>
                        <th scope="col">Aprueba?</th>
                        <th scope="col">Recibe E-Mail</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Opcion</th>

                    </tr>
                </thead>
                <tbody>
                    @if($usuarios->count())
                    <form method="POST" action=" {{ route('update_users_em') }} "> @csrf
                        @foreach($usuarios as $usuario)
                        <tr style="text-align: center;">
                            <td scope="row">{{ $usuario->id_empleados }}
                                <input type="" name="id_empleados[]" value="{{ $usuario->id_empleados }}" hidden="true"
                                    readonly="true">
                            </td>
                            <td scope="row"> <input type="" name="nombre_completo[]"
                                    value="{{ $usuario->nombre_completo }}" class="form-control"> </td>
                            <td scope="row"> <input type="" name="num_identificacion[]"
                                    value="{{ $usuario->num_identificacion }}" class="form-control"> </td>
                            <td scope="row"> <input type="" name="num_telefono[]" value="{{ $usuario->num_telefono }}"
                                    class="form-control"> </td>
                            <td scope="row"> <input type="" name="email[]" value="{{ $usuario->email }}"
                                    class="form-control"> </td>

                            <td scope="row">
                                <select name="cargo[]" class="form-control" style="width: 100px;">
                                    @foreach($roles as $role)
                                    @if($role->id == $usuario->cargo)
                                    <option value="{{ $role->id }}" selected=""> {{ $role->nombre }} </option>
                                    @endif
                                    @endforeach
                                    @if( $usuario->cargo == 4 )
                                    <option value="5">Master</option>
                                    @endif
                                    @if( $usuario->cargo == 5 )
                                    <option value="5" selected="">Master</option>
                                    @endif
                                    @foreach($roles as $role)
                                    @if($role->id != $usuario->cargo)
                                    <option value="{{ $role->id }}"> {{ $role->nombre }} </option>
                                    @endif
                                    @endforeach
                                </select>
                            </td>

                            <td scope="row"> <input type="" name="usuario[]" value="{{ $usuario->usuario }}"
                                    class="form-control"> 
                            </td>
                            <!-- <td scope="row" class="form-label">{{ __('Contraseña Codificada') }}</td>-->
                            <td scope="row">
                                <select class="form-control" name="autoriza[]">
                                    @if($usuario->autoriza == 1)
                                    <option value="1">✔</option>
                                    <option value="0">❌</option>
                                    @else
                                    <option value="0">❌</option>
                                    <option value="1">✔</option>
                                    @endif
                                </select>
                            </td>
                            <td scope="row">
                                <select class="form-control" name="aprueba[]">
                                    @if($usuario->aprueba == 1)
                                    <option value="1">✔</option>
                                    <option value="0">❌</option>
                                    @else
                                    <option value="0">❌</option>
                                    <option value="1"> ✔</option>
                                    @endif
                                </select>
                            </td>
                            <td scope="row">
                                <select class="form-control" name="remitente_correo[]">
                                    @if($usuario->remitente_correo == 1)
                                    <option value="1">✔</option>
                                    <option value="0">❌</option>
                                    @else
                                    <option value="0">❌</option>
                                    <option value="1">✔</option>
                                    @endif
                                </select>
                            </td>
                            <td scope="row">
                                <select class="form-control" name="activo[]">
                                    @if($usuario->activo == 1)
                                    <option value="1">✔</option>
                                    <option value="0">❌</option>
                                    @else
                                    <option value="0">❌</option>
                                    <option value="1">SI ✔</option>
                                    @endif
                                </select>
                            </td>

                            <td scope="row">
                                <a class="btn btn-success btn-sm" data-toggle="modal" data-target="#editarUserModal{{ $usuario->id_empleados }}">Cambiar Contraseña</a>
                            </td>

                        </tr>
                        @endforeach
                        <tr>
                           
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><a class="btn btn-info" data-toggle="modal" data-target="#new_user"> Nuevo Usuario </a>
                            </td>
                            <td> <button type="submit" class="btn btn-success">Actualizar</button> </td>
                        </tr>
                    </form>


                    @foreach ($usuarios as $usuario)

                        <script type="text/javascript"> 
                            jQuery(document).ready(function($) {

                                $('#editar').on( 'change', function() {

                                if( $('#editar').is(':checked') ) {
                                    $('.mode_change').prop('disabled', false);
                                }
                                else {
                                    $('.mode_change').prop('disabled', true);
                                }

                                });

                            });
                        </script>

                        <div class="modal fade" id="editarUserModal{{ $usuario->id_empleados }}" tabindex="-1"
                            role="dialog" aria-labelledby="editarUserModal{{ $usuario->id_empleados }}Label"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="editarUserModal{{ $usuario->id_empleados }}Label">Cambiar Contraseña</h5>

                                    </div>
                                    <div class="modal-body">
                                        <!-- Agrega el formulario de edición aquí -->

                                        <form method="POST" action="{{route('contrasena')}}">@csrf

                                            <div class="modal-body">

                                                <input type="" name="id_empleados" class="form-control"
                                                    value="{{ $usuario->id_empleados }}" hidden>

                                                <label class="form-label">Nombre Completo</label>
                                                <input type="" name="nombre_completo" class="form-control"
                                                    value="{{ $usuario->nombre_completo}}" readonly>

                                                <label class="form-label">Usuario</label>
                                                <input type="" name="usuario" class="form-control"
                                                    value="{{$usuario->email}}" readonly>

                                                <label class="form-label">Nueva Contraseña</label>
                                                <input type="password" name="nueva_contrasena" class="form-control mode_change" disabled="">

                                                <label class="form-label">Confirmar Contraseña</label>
                                                <input type="password" name="confirmar_contrasena" class="form-control mode_change" disabled="">

                                                <input type="" name="cambiar_contrasena" hidden="true" readonly="true">

                                            </div>
                                            

                                            <div class="custom-control custom-switch">
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class="custom-control-input" id="editar"> 
                                                <label class="custom-control-label" for="editar">&nbsp;&nbsp;Editar Los Datos</label>
                                            </div>

                                            <br>

                                            <div class="modal-footer">
                                                <button type="submit" class="btn btn-success">Guardar</button>
                                                <button type="button" class="btn btn-danger"
                                                    data-dismiss="modal">Cerrar</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach



                    @else
                    <tr>
                        <td colspan="8">No hay registro !!</td>
                    </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
    @endif
    @endsection