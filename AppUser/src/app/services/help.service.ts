import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class HelpService {

  constructor() { }
  genUrlSearchParams(inputObject){
    const urlSearchParams = new URLSearchParams();
    for (let name in inputObject) {
      if (Object.prototype.hasOwnProperty.call(inputObject, name)) {
        urlSearchParams.append(name, inputObject[name]);
      }
    }
    console.log(urlSearchParams)
    return urlSearchParams; 
  }
  smartCopy(outObject, inObject){
    for (let name in outObject) {
      if (Object.prototype.hasOwnProperty.call(outObject, name)) {
        outObject[name] = inObject[name];
      } 
    }
  }
}
