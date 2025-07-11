import { Unauthenticated } from '@helsa/ddd/core/errors/unauthenticated';
import { Unauthorized } from '@helsa/ddd/core/errors/unauthorized';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { BetterSession, BetterUser, getSession } from '../auth/server';
import { DomainError } from '../ddd/core/domain-error';
import { HttpNextResponse } from './http-next-response';

type RouteHandlerParams<Q, P> = {
  req: NextRequest;
  user: BetterUser;
  params: { [key: string]: any };
  searchParams: Q;
  body: P;
};

type RouteHandler<Q, P> = (params: RouteHandlerParams<Q, P>) => Promise<NextResponse>;

type RouteHandlerOptions<Q, P> = {
  name: string;
  schema?: ZodSchema<P>;
  querySchema?: ZodSchema<Q>;
  authenticated?: boolean;
  permissions?: (user: BetterUser) => boolean;
};

export const routeHandler = <T extends DomainError, P, Q>(
  options: RouteHandlerOptions<Q, P> = {
    name: 'default',
    authenticated: true,
    querySchema: undefined,
    schema: undefined,
    permissions: undefined,
  },
  handler: RouteHandler<Q, P>,
  onError?: (error: T) => NextResponse,
) => {
  return async (req: NextRequest, { params }: { params: Promise<any> }) => {
    const session = await authentication(options.authenticated);
    authorization(session?.user, options.permissions);

    const user = session?.user as BetterUser;
    const urlParams = await params;
    const searchParams = parseSeachParams<Q>(req, options.querySchema);
    const body = parseBody<P>(req, options.schema);

    try {
      return handler({
        req,
        user,
        params: urlParams,
        searchParams,
        body,
      });
    } catch (error) {
      console.error(error);
      switch (true) {
        case error instanceof Unauthenticated:
          return HttpNextResponse.domainError(error, 401);
        case error instanceof Unauthorized:
          return HttpNextResponse.domainError(error, 403);
        case error instanceof DomainError:
          const response = onError?.(error as T);
          if (response) {
            return response;
          }
          return HttpNextResponse.internalServerError();
        case error instanceof ZodError:
          return HttpNextResponse.error(error.message);
        default:
          return HttpNextResponse.internalServerError();
      }
    }
  };
};

async function authentication(authenticated?: boolean): Promise<BetterSession | null> {
  if (authenticated === false) {
    return null;
  }
  const session = await getSession();
  if (!session || !session.user) {
    throw new Unauthenticated('User is not authenticated');
  }
  return session;
}

function authorization(user: BetterUser | undefined, permissions?: (user: BetterUser) => boolean): void {
  if (!user) {
    return;
  }
  if (permissions && !permissions(user)) {
    throw new Unauthorized('User does not have the required permissions');
  }
}

function parseSeachParams<Q>(req: NextRequest, schema?: ZodSchema<Q>): Q {
  if (!schema) {
    return Object.fromEntries(req.nextUrl.searchParams.entries()) as Q;
  }
  return schema.parse(Object.fromEntries(req.nextUrl.searchParams.entries()));
}

function parseBody<P>(req: NextRequest, schema?: ZodSchema<P>): P {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return {} as P; // No body for GET or HEAD requests
  }
  if (!schema) {
    return req.json() as P;
  }
  return schema.parse(req.json());
}
