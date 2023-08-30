import {
  JsonController,
  Get,
} from 'routing-controllers'
import { Service } from 'typedi'

@Service()
@JsonController()
export class ApplicationController {
  @Get('/ping')
  public async ping() {
    console.log('ping')
    return 'pong'
  }
}
