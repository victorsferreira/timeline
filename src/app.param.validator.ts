import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as moment from "moment";

@Injectable()
export class ParamValidatorPipe implements PipeTransform {
  private action: string;
  private readonly dateFormat:string = "YYYY-MM-DD";

  constructor() {
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.type === "body") return this.validateCreateParams(value);
  }

  private validateCreateParams(body) {
    this.validateDate(body.startDate);
    this.validateDate(body.endDate);

    return body;
  }

  private validateDate(date) {
    if (!moment(parseInt(date), this.dateFormat).isValid()) {
      throw new Error("Date is not valid");
    }

    return true;
  }
}