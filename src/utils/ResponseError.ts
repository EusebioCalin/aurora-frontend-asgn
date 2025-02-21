export class ResponseError extends Error {
  constructor(message: string | undefined) {
    super(message);
  }

  details: string | string[] | Record<string, unknown> = "";

  addResponse(details: string | string[] | Record<string, unknown>) {

    if (typeof details === "string") {
      this.details = details;
    }
    else if (Array.isArray(details)) {
      this.details = details.join(", ");
    }
    else {
      this.details = Object.entries(details).map(([key, value]) => `${key}: ${value}`).join(", ");
    }
  }
}
