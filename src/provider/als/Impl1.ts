import { AsyncLocalStorage } from "async_hooks";

import { Injectable } from "@nestjs/common";

import { AlsService, AlsData } from "@/interface";

@Injectable()
export class Impl1 implements AlsService {
  private readonly als = new AsyncLocalStorage<AlsData>();

  /**
   * 获取当前链路的全部 ALS 数据
   */
  get(): AlsData {
    const store = this.als.getStore();
    if (!store) {
      throw new Error(`ALS 上下文不存在，请在中间件/拦截器中初始化`);
    }
    return store;
  }

  /**
   * 局部更新 ALS 数据（自动合并）
   */
  update(data: Partial<AlsData>): void {
    const store = this.als.getStore();
    if (!store) return;

    Object.assign(store, data);
  }

  /**
   * 初始化链路上下文（中间件/拦截器里调用）
   */
  run<T>(store: AlsData, callback: () => T): T {
    return this.als.run(store, callback);
  }
}
