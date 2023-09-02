import fs from 'fs';
import path from 'path';
import http from 'http';
import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import koaConnect from 'koa-connect';
import koaSend from 'koa-send';
import cors from '@koa/cors';
import { useContainer, useKoaServer } from 'routing-controllers';
import { Container, Service } from 'typedi';
import { ApplicationController } from './controller';

@Service()
export default class App {
  private app: Koa | null = null;
  private server: http.Server | null = null;

  constructor() {
    this.app = this.initKoa();
  }

  private initKoa() {
    useContainer(Container);
    const app = new Koa();
    app.use(
      koaBodyParser({
        jsonLimit: '5mb',
        formLimit: '5mb',
      }),
    );

    app.use(cors());

    useKoaServer(app, {
      routePrefix: '/api',
      controllers: [ApplicationController],
    });

    this.app = app;
    return app;
  }

  public async start() {
    if (process.env.NODE_ENV === 'development') {
      await this.startDev();
    } else {
      await this.startProd();
    }

    this.server = http.createServer(this.app!.callback());

    this.server?.listen(5178, () => {
      console.log('app is running at 5178');
    });
  }

  public async startProd() {
    const template = fs.readFileSync('index.html', 'utf-8');
    this.app?.use(async (ctx, next) => {
      if (ctx.path.startsWith('/assets')) {
        await koaSend(ctx, ctx.path, { root: path.resolve(__dirname) });
        return;
      }

      if (ctx.path.startsWith('/api')) {
        next();
        return;
      }

      ctx.type = 'text/html';
      ctx.body = template;
      return;
    });
  }

  public async startDev() {
    const { createServer } = (await import('vite')).default;
    const viteServer = await createServer({
      root: path.resolve(__dirname, '../client'),
      logLevel: 'error',
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    });

    this.app?.use(koaConnect(viteServer.middlewares));

    this.app?.use(async (ctx, next) => {
      if (ctx.request.url.startsWith('/api')) {
        next();
      } else {
        try {
          let template = fs.readFileSync(
            path.resolve(__dirname, '../client/index.html'),
            'utf-8',
          );
          template = await viteServer.transformIndexHtml(ctx.path, template);
          ctx.type = 'text/html';
          ctx.body = template;
        } catch (e: any) {
          viteServer && viteServer.ssrFixStacktrace(e);
          console.log(e.stack);
          ctx.throw(500, e.stack);
        }
      }
    });
  }
}
