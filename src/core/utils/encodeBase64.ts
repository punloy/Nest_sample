export function encodeBase64(plainString: string): string {
    return Buffer.from(plainString).toString("base64");
}