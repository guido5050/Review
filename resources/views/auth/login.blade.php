<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<div class="container ">
    <div class="row justify-content-center">
        <div class="">
            <div class="card">

                <div class="">

                    <section class="d-flex justify-content-center align-items-center vh-100">
                        <div class="container  ">
                            <div class="row d-flex align-items-center justify-content-center  vh-100 ">
                                <div class="col-md-4 col-lg-7 col-xl-6 ">
                                    <img class="thumb" fetchpriority="high" data-pin-no-hover="true"
                                        src="{{ asset('images/login/image2.jpg') }}"
                                        sizes="(max-width: 479px) 100vw, (min-aspect-ratio: 626/626) calc((100vh - 184px) * 1), (max-width: 1095px) calc(100vw - 40px), calc(100vw - 540px)"
                                        alt="Vector gratuito concepto de reseñas para landing page"
                                        style="max-width: calc((100vh - 184px) * 1)"
                                        srcset="{{ asset('images/login/image1.png') }}">
                                </div>
                                <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">


                                    <form method="POST" action="{{ route('in_log') }}">
                                        @csrf

                                        <div class="form-group row">
                                            <label for="username"
                                                class="col-md-12 col-form-label ">{{ __('E-Mail Address') }}</label>

                                            <div class="col-md-12">
                                                <input id="username"
                                                    class="form-control @error('username') is-invalid @enderror"
                                                    name="username" value="{{ old('username') }}" required
                                                    autocomplete="username" autofocus>
                                                @error('email')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                            </div>
                                        </div>


                                        <div class="form-group row">

                                        </div>
                                        <div class="form-group row">
                                            <label for="password"
                                                class="col-md-12 col-form-label ">{{ __('Password') }}</label>

                                            <div class="col-md-12">
                                                <input id="password" type="password"
                                                    class="form-control @error('password') is-invalid @enderror"
                                                    name="password" required autocomplete="current-password">

                                                @error('password')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                            </div>
                                        </div>

                                        <!-- Aquí es donde colocarías el código del select de empresas -->
                                        <div class="form-group row">
                                            <label for="empresa"
                                                class="col-md-12 col-form-label">{{ __('Empresa') }}</label>

                                            {{-- <div class="col-md-12">
                                                <select id="empresa"
                                                    class="form-control @error('empresa') is-invalid @enderror"
                                                    name="empresa" required>
                                                    @foreach ($empresas as $empresa)
                                                        <option value="{{ $empresa->id }}">
                                                            {{ $empresa->razon_social }}</option>
                                                    @endforeach
                                                </select>

                                                @error('empresa')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror
                                            </div> --}}
                                        </div>
                                        <!-- Fin del código del select de empresas -->

                                        <div class="form-group row">
                                            <div class="col-md-6 ">

                                            </div>
                                        </div>

                                        <div class="form-group row mb-0">
                                            <div class="col-md-12 ">
                                                <button type="submit" class="btn btn-primary btn-block mt-2">
                                                    {{ __('Login') }}
                                                </button>

                                                @if (Route::has('password.request'))
                                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                                        {{ __('Forgot Your Password?') }}
                                                    </a>
                                                @endif
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
    integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
    integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous">
</script>
