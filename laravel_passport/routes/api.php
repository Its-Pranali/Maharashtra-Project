<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TalukaController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\BranchController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| These routes are loaded by the RouteServiceProvider and are assigned
| to the "api" middleware group.
|--------------------------------------------------------------------------
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::apiResource('districts', DistrictController::class);


Route::get('/organizations', [OrganizationController::class, 'index']);
Route::post('/organizations', [OrganizationController::class, 'store']);
Route::put('/organizations/{id}', [OrganizationController::class, 'update']);
Route::delete('/organizations/{id}', [OrganizationController::class, 'destroy']);


Route::get('/designations', [DesignationController::class, 'index']);
Route::post('/designations', [DesignationController::class, 'save']);
Route::put('/designations/{id}', [DesignationController::class, 'update']);
Route::delete('/designations/{id}', [DesignationController::class, 'delete']);


Route::get('/products', [ProductController::class, 'index']);
Route::post('/products/save', [ProductController::class, 'save']);


// Route::post('/roles', [RoleController::class, 'save']);
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles/save', [RoleController::class, 'save']);
Route::put('roles/{id}', [RoleController::class, 'update']);
Route::delete('roles/{id}', [RoleController::class, 'delete']);

Route::get('/branch', [BranchController::class, 'index']);
Route::post('/branch/save', [BranchController::class, 'save']);
Route::put('branch/{id}', [BranchController::class, 'update']);
Route::delete('branch/{id}', [BranchController::class, 'delete']);

Route::get('/taluka', [TalukaController::class, 'index']);
Route::post('/taluka/save', [TalukaController::class, 'save']);
Route::put('/taluka/{id}', [TalukaController::class, 'update']);
Route::delete('/taluka/{id}', [TalukaController::class, 'delete']);

Route::get('/bank', [BankController::class, 'index']);
Route::post('/bank/save', [BankController::class, 'save']);
Route::put('/bank/{id}', [BankController::class, 'update']);
Route::delete('/bank/{id}', [BankController::class, 'delete']);

Route::get('/module', [ModuleController::class, 'index']);
Route::post('/module/save', [ModuleController::class, 'save']);


Route::middleware(['auth:api', 'check.token.expiry'])->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});
