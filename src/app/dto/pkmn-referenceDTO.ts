export class PkmnReferenceDTO {

  name: string;
  url: string;

  constructor(_name: string, _url: string) {
    this.name = _name;
    this.url = _url;
  }

}
