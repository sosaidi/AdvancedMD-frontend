// import { TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';
// import { of } from 'rxjs';

// describe('AuthGuard', () => {
//   let guard: AuthGuard;
//   let authService: jasmine.SpyObj<AuthService>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       providers: [
//         AuthGuard,
//         { provide: AuthService, useValue: authServiceSpy },
//         { provide: Router, useValue: routerSpy },
//       ],
//     });

//     guard = TestBed.inject(AuthGuard);
//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   it('should be created', () => {
//     expect(guard).toBeTrue();
//   });

//   it('should allow access if user is logged in', () => {
//     authService.isLoggedIn.and.returnValue(true);

//     const result = guard.canActivate();
//     expect(result).toBeTrue();
//   });

//   it('should redirect to login if user is not logged in', () => {
//     authService.isLoggedIn.and.returnValue(false);

//     const result = guard.canActivate();
//     expect(result).toBeNull();
//     expect(router.navigate).toHaveBeenCalledWith(['/login']);
//   });
// });
