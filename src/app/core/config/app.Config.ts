import { environment } from './../../../environments/environment';

export class AppConfig {
  public static pdfPasswordRemover(): string {
    return environment.pdfPasswordRemover;
  }
}