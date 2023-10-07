import { Response } from 'express';

import Ierr, { StatusCode, ResponseStatus } from '../constant/errorMessages';
import moment from 'moment';

// Helper code for the API consumer to understand the error and handle is accordingly

abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
    protected time?: string,
    protected mobileTime?: Date,
  ) {}

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
  ): Response {
    response.time = moment().format('lll');
    response.mobileTime = new Date();
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message: string = Ierr.UNAUTHORIZED) {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = 'Not Found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    // this.url = res.req?.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message: any = Ierr.BAD_REQUEST) {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}
export class FiledErrorResponse extends ApiResponse {
  constructor(message: any = Ierr.BAD_PARAMETER) {
    super(StatusCode.FAILURE, ResponseStatus.FILED_ERROR, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message: string = Ierr.SERVER_ERROR) {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message: string = Ierr.INVALID_TOKEN) {
    super(
      StatusCode.INVALID_ACCESS_TOKEN,
      ResponseStatus.UNAUTHORIZED,
      message,
    );
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}
export class TokenExpireErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message: string = Ierr.SESSION_EXPIRE) {
    super(StatusCode.RETRY, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<TokenExpireErrorResponse>(res, this);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
