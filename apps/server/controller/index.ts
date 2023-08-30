import {
  Get,
} from 'routing-controllers'
import { Inject, Service } from 'typedi'

@Service()
export class ApplicationController {
  @Get('/ping')
  public async listAll() {
    return 'pong'
  }
}
