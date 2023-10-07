
export default class utils {
  public static encodeToBase64<T>(data: T): string {
    const str = JSON.stringify(data);
    const buffer = Buffer.from(str, 'utf8');
    const base64String = buffer.toString('base64');
    return base64String;
  }

  public static decodeBase64String(data: string): any {
    const buffer = Buffer.from(data, 'base64');
    const decodedString = buffer.toString('utf-8');
    return JSON.parse(decodedString);
  }
}