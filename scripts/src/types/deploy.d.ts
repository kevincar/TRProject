type callbackFunc = (err?: Error | null | undefined, result?: any) => void;
type taskFunc = (result: any, callback: callbackFunc)=> void;

interface User {
  "domain": string,
  "email": string,
  "name": string,
  "photoUrl": string
}

interface FunctionSet {
  "values": Function[]
}
