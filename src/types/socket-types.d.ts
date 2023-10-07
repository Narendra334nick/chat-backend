export declare interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export declare interface ClientToServerEvents {
  hello: () => void;
}

export declare interface InterServerEvents {
  ping: () => void;
}

export declare interface SocketData {
  name: string;
  age: number;
}

export declare interface ObjectType {
  [key: string]: any;
}
