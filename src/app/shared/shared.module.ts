/**
 * SharedModule é DESCONTINUADO
 *
 * Em uma arquitetura standalone, use shared.imports.ts em vez disso.
 * SHARED_IMPORTS contém o array de módulos reutilizáveis.
 *
 * @deprecated Usar shared.imports.ts (SHARED_IMPORTS) em vez disso
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
];

/**
 * Mantido apenas para referência histórica.
 * Para novos componentes, use SHARED_IMPORTS de shared.imports.ts
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class SharedModule { }
