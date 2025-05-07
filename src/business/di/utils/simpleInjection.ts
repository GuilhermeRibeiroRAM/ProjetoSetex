import { Provider, Scope } from '@nestjs/common';

export const simpleInjection = <T>(
  token: symbol,
  cls: { new (...rest): T },
  scope = Scope.DEFAULT,
): Provider => {
  return {
    scope,
    provide: token,
    useClass: cls,
  };
};
