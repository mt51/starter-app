import 'reflect-metadata';
import http from 'http'
import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { useContainer, useKoaServer } from 'routing-controllers'
import { Container } from 'typedi'

function start() {
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
    controllers: []
  })

  const server = http.createServer(app.callback())

  server.listen(5178)
}

start();
