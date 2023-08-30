import http from 'http'
import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { useContainer, useKoaServer } from 'routing-controllers'
import { Container, Service } from 'typedi'
import { ApplicationController } from './controller';

@Service()
export default class App {
  private app: Koa | null = null;
  private server: http.Server | null = null

  private initKoa() {
    useContainer(Container)
    const app = new Koa()
    app.use(
      koaBodyParser({
        jsonLimit: '5mb',
        formLimit: '5mb'
      })
    )

    app.use(cors())

    useKoaServer(app, {
      controllers: [
        ApplicationController,
      ]
    })

    this.app = app
    return app
  }

  public start() {
    const app = this.initKoa()
    this.server = http.createServer(app.callback())
    this.server?.listen(5178, () => {
      console.log('app is running at 5178')
    })
  }
}
