<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Resena;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;



    protected $table  = 'usuarios';
    protected $primaryKey = 'id_usuario'; //Esta la use para obtener el id en el controlador

    /**
     * Aqui hacemos igual el metodo de relacion es decir 'estamos en el modelo User' y decimos que el usuario puede tener uno o muchas resenas
     */
    //Metodo de relacion
    //  public function Resena(): HasMany
    // {
    //     return $this->hasMany(Resena::class, 'id_usuario', 'id_resena');
    // }



    public function getAuthIdentifierName()
    {
        return 'id_empleados'; // Nombre del campo de identificación
    }

    public function getAuthPassword()
    {
        return $this->attributes['contrasena']; // Nombre del campo de contraseña
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'email',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [

        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


}
