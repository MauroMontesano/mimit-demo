// /**
//  * This is the base page component for page that need to show model.
//  * The model can arrive from back-end or from parent component (in lookup modality) so the order to get model is:
//  * 1)In input gets the complete model (finish)
//  * 2)If no model in input -> I load id from input and use it to call back-end
//  * 3)If no id in input -> i try to read id from path (based on idKey param)
//  *
//  * 2 -> ngOnInit -> setIdKey -> _idModel (is present) -> stop but in setIdModel -> call to backend
//  * 2 -> ngOnInit -> setIdKey  -> !_idModel (not present ) -> get id from path -> setIdModel -> call to backend
//  *

import { Component } from '@angular/core';
import { BaseModel } from '@engular/base-models';
import { DetailBasePageComponent } from '@engular/base-page';

//  */
@Component({
  template: '',
})
export abstract class EafDetailBasePageComponent<M extends BaseModel> extends DetailBasePageComponent<M> {}
