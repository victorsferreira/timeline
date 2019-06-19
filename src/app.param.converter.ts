import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as moment from "moment";

@Injectable()
export class ParamConverterPipe implements PipeTransform {
  private readonly dateFormat:string = "YYYY-MM-DD";

  transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.type === "body") return this.convertBodyParameters(value);
  }

  convertBodyParameters(value) {
    value.endDate = moment(value.endDate, this.dateFormat);
    value.startDate = moment(value.startDate, this.dateFormat);
    
    return value;
  }
}