import { fromEvent, of, Observable } from "rxjs";
import { switchMap, map, filter } from "rxjs/operators";
import { io, Socket } from "socket.io-client";
// how to pass auth
const socket$ = of(io("localhost:3001/"));

export const connect$ = socket$.pipe(
  switchMap((socket) => fromEvent(socket, "connect").pipe(map(() => socket)))
);

export function listenOnConnect(event: string) {
  return connect$.pipe(switchMap((socket) => fromEvent(socket, event)));
}

// On connection, emit data from observable
export function emitOnConnect<T = Record<string, any>>(
  observable$: Observable<T>
): Observable<{
  socket: Socket;
  data: T;
}> {
  return connect$.pipe(
    switchMap((socket) => observable$.pipe(map((data) => ({ socket, data }))))
  );
}

export function emitOnEnter(input: HTMLInputElement) {
  return fromEvent<KeyboardEvent>(input, "keyup")
    .pipe(filter((e) => e.keyCode === 13 && Boolean(input.value)))
    .pipe(
      map(() => {
        const content = input.value;
        input.value = "";
        return { content };
      })
    );
}

export function emitSocketEvent(userName: string) {
  return of({ userName }).pipe;
}
