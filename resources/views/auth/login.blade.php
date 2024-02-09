<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<div class="container ">
    <div class="row justify-content-center">
        <div class="col-md-11">
            <div class="card">

                <div class="card-body">

                    <section class="">
                        <div class="container  ">
                            <div class="row d-flex align-items-center justify-content-center ">
                                <div class="col-md-8 col-lg-7 col-xl-6">
                                    <img class="thumb" fetchpriority="high" data-pin-no-hover="true"
                                        src="https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?t=st=1707231462~exp=1707232062~hmac=99aef5110fc72e4495f14d7cc660849567f196a697ff29c31986eae409bb657e"
                                        sizes="(max-width: 479px) 100vw, (min-aspect-ratio: 626/626) calc((100vh - 184px) * 1), (max-width: 1095px) calc(100vw - 40px), calc(100vw - 540px)"
                                        width="626" height="626"
                                        alt="Vector gratuito concepto de reseñas para landing page"
                                        style="max-width: calc((100vh - 184px) * 1)"
                                        srcset="https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=360&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 360w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=740&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 740w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=826&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 826w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=900&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 900w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=996&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 996w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=1060&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 1060w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=1380&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 1380w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=1480&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 1480w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=1800&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 1800w, https://img.freepik.com/vector-gratis/concepto-resenas-landing-page_52683-12186.jpg?w=2000&amp;t=st=1707231470~exp=1707232070~hmac=6ad10499a628859e2f4b0ac4bb15b40970dc2d75c378d4e7bc81807de555410d 2000w">
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

                                            <div class="col-md-12">
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
                                            </div>
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
