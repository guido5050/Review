@extends('layouts.app')

@section('content')
    <script type="text/javascript">
        var exampleSocket = new WebSocket('ws://127.0.0.1');
    </script>
    <div class="container ">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-dark center ">
                    </div>

                    <!--/vh-100 h-100 h-100  {{ __('Login') }} -->
                    <div class="card-body">

                        <section class="">
                            <div class="container py-5 ">
                                <div class="row d-flex align-items-center justify-content-center ">
                                    <div class="col-md-8 col-lg-7 col-xl-6">
                                        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                            class="img-fluid" alt="Phone image">
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

                                            <div class="form-group row">
                                                <div class="col-md-6 ">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" name="remember"
                                                            id="remember" {{ old('remember') ? 'checked' : ' ' }}>

                                                        <label class="form-check-label" for="remember">
                                                            {{ __('Remember Me') }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group row mb-0">
                                                <div class="col-md-12 ">
                                                    <button type="submit" class="btn btn-primary btn-block">
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
@endsection
