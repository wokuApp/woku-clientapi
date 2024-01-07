export class CreateWokuDTO {
  description: string;
  file: string;
  secondaryKey: string;
  clientEmail: string;
  clientPhone: number;
}

export class GetWokuReviewDTO {
  wokuId: string;
}

export class CreateTextnoteDTO {
  wokuId: string;
  qualification: number;
  description: string;
  clientEmail: string;
  anonymous: boolean;
}

export class CreateVoicemailDTO {
  wokuId: string;
  qualification: string;
  anonymous: string;
  clientEmail: string;
}
