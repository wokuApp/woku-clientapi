import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class AvatarDTO {
  filename: string;
  type: string;
  url: string;
  blobName: string;
  private?: boolean;
}

export class PublicCompanyDTO extends Document {
  name: string;
  createdBy: string;
  users: string[];
  subscriptionId: string;
  admins: string[];
  avatar?: AvatarDTO;
}

export class WokuTextnoteDTO extends Document {
  qualification: TextnoteQualificationDTO;
  createdBy: string;
  anonymous: boolean;
  values?: string[];
  description: string;
  feedbackType?: string;
}

export class WokuQualificationDTO extends Document {
  qualification: number;
  createdBy?: string;
}

export class WokuFileDTO extends Document {
  filename: string;
  type: string;
  url?: string;
}

export class VoicemailQualificationDTO extends Document {
  qualification: number;
}

export class VoicemailFileDTO extends Document {
  filename: string;
  type: string;
  url?: string;
  blobName?: string;
  private: boolean;
}

export class WokuVoicemailDTO extends Document {
  qualification: VoicemailQualificationDTO;
  createdBy: string;
  anonymous: boolean;
  values?: string[];
  transcript?: string;
  feedbackType?: string;
  file: VoicemailFileDTO;
}

export class WokuDTO extends Document {
  @ApiProperty({
    description: 'woku ID',
    example: '65348875f3a876254aa82d5e',
  })
  _id: string;

  @ApiProperty({
    description: 'woku description.',
    example: 'Docker Training',
  })
  description: string;

  @ApiProperty({
    description: 'User ID creator of the woku.',
    example: '653485cff3a876254aa82d0b',
  })
  createdBy: string;

  @ApiProperty({
    description: 'Company ID to which the woku belongs.',
    example: '6534865cf3a876254aa82d26',
  })
  companyId: string;

  @ApiProperty({
    description:
      'Users Ids who worked on the woku. This field can be an empty array.',
    example: ['653485cff3a876254aa82d0b', '6541cc3f666483667c07dd92'],
  })
  users?: string[];

  @ApiProperty({
    description: 'Data of the file representing the woku.',
    example: {
      filename: 'image',
      type: 'image',
      url: 'https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp',
    },
  })
  file: WokuFileDTO;

  @ApiProperty({
    description: 'Array with the Qualifications received from the woku.',
    example: [
      {
        _id: 'Qualification ID',
        qualification: 4,
      },
    ],
  })
  qualifications?: WokuQualificationDTO[];

  @ApiProperty({
    description: 'Array with the Textnotes received from the woku.',
    example: [
      {
        qualification: { _id: 'Qualification ID', qualification: 4 },
        anonymous: false,
        description: 'Excellent',
        feedbackType: 'recognition',
        clientId: 'Client ID',
        _id: 'Textnote ID',
        createdAt: '2023-10-29T02:26:38.341+00:00',
      },
    ],
  })
  textnotes?: WokuTextnoteDTO[];

  @ApiProperty({
    description: 'Array with the Voicemails received from the woku.',
    example: [
      {
        qualification: { _id: 'Qualification ID', qualification: 4 },
        anonymous: false,
        file: {
          filename: 'audio-review-6596d27998ebf3609b208f4b',
          type: 'audio',
          url: 'https://wokudevfiles.blob.core.windows.net/wokus/28a591ae-0d65-40bb-8e4d-687c9bb75397blob',
        },
        transcription: 'hola todo está súper bien me gustó todo',
        feedbackType: 'recognition',
        clientId: 'Client  ID',
        _id: 'Voicemail ID',
        createdAt: '2023-10-29T02:26:38.341+00:00',
      },
    ],
  })
  voicemails?: WokuVoicemailDTO[];

  @ApiProperty({
    description: 'woku feedback summary',
    example: 'Training with good comments and congratulations',
  })
  feedbacksSummary?: string;

  folderId: string;
}

export class PublicUserDTO extends Document {
  name: string;
  username: string;
  avatar?: AvatarDTO;
}

export class WokuReviewDTO {
  @ApiProperty({
    description: 'Woku data',
    example: {
      _id: '65348875f3a876254aa82d5e',
      description: 'Docker Training',
      createdBy: '653485cff3a876254aa82d0b',
      companyId: '6534865cf3a876254aa82d26',
      users: ['653485cff3a876254aa82d0b', '6541cc3f666483667c07dd92'],
      file: {
        filename: 'image',
        type: 'image',
        url: 'https://wokudevfiles.blob.core.windows.net/wokus/cd7f9cf3-c2e4-4ff0-8a96-19ff813f569e1699220394936-image.webp',
      },
      qualifications: [
        {
          _id: 'Qualification ID',
          qualification: 4,
        },
      ],
      textnotes: [
        {
          qualification: {
            qualification: 4,
          },
          anonymous: false,
          description: 'Excellent',
          feedbackType: 'recognition',
          clientId: 'Client ID',
        },
      ],
      voicemails: [
        {
          qualification: {
            _id: 'Qualification ID',
            qualification: 4,
          },
          anonymous: false,
          file: {
            filename: 'audio-review-6596d27998ebf3609b208f4b',
            type: 'audio',
            url: 'https://wokudevfiles.blob.core.windows.net/wokus/28a591ae-0d65-40bb-8e4d-687c9bb75397blob',
          },
          transcription: 'hola todo está súper bien me gustó todo',
          feedbackType: 'recognition',
          clientId: 'Client ID',
        },
      ],
      feedbacksSummary: 'Training with good comments and congratulations',
    },
  })
  woku: WokuDTO;

  @ApiProperty({
    description: 'Array of Users who worked on the woku.',
    example: [
      {
        _id: 'User ID',
        name: 'dior',
        createdAt: '2023-10-22T02:15:43.994+00:00',
        avatar: {
          _id: 'File ID',
          filename: 'diego.png',
          type: 'image',
          url: 'https://wokudevfiles.blob.core.windows.net/wokus/5fb16472-8fcb-462a-b08b-88fa316e079d1700095980638-diego.webp',
        },
      },
    ],
  })
  users: PublicUserDTO[];

  @ApiProperty({
    description: 'Company data of the woku',
    example: {
      _id: 'Company ID',
      name: 'woku',
      createdAt: '2023-10-22T02:15:43.994+00:00',
      avatar: {
        _id: 'File ID',
        filename: 'wokuLogo',
        type: 'image',
        url: 'https://wokudevfiles.blob.core.windows.net/wokus/24d230df-cd8e-4345-9944-9cfed9c7da52wokuLogo.png',
      },
    },
  })
  company: PublicCompanyDTO;
}

export class TextnoteQualificationDTO extends Document {
  qualification: number;
  createdBy?: string;
}

export class TextnoteDTO extends Document {
  @ApiProperty({
    description: 'Textnote Qualification',
    example: {
      _id: 'Qualification ID',
      qualification: 4,
    },
  })
  qualification: TextnoteQualificationDTO;

  createdBy?: string;

  @ApiProperty({
    description: 'Woku ID',
    example: '65348875f3a876254aa82d5e',
  })
  wokuId: string;

  @ApiProperty({
    description: 'Anonymous state',
    example: false,
  })
  anonymous?: boolean;

  values?: string[];

  @ApiProperty({
    description: 'Feedaback',
    example: 'Excellent',
  })
  description: string;

  @ApiProperty({
    description: 'Feedaback type',
    example: 'recognition',
  })
  feedbackType?: string;

  @ApiProperty({
    description: 'Client ID',
    example: '653c78b70c83744b1340a551',
  })
  clientId?: string;
}

export class VoicemailDTO extends Document {
  @ApiProperty({
    description: 'Voicemail Qualification',
    example: {
      _id: 'Qualification ID',
      qualification: 4,
    },
  })
  qualification: VoicemailQualificationDTO;

  createdBy?: string;

  @ApiProperty({
    description: 'Woku ID',
    example: '65348875f3a876254aa82d5e',
  })
  wokuId: string;

  @ApiProperty({
    description: 'Anonymous state',
    example: false,
  })
  anonymous: boolean;

  values?: string[];

  @ApiProperty({
    description: 'Audio transcription',
    example: 'hola todo está súper bien me gustó todo',
  })
  transcription?: string;

  @ApiProperty({
    description: 'Feedaback type',
    example: 'recognition',
  })
  feedbackType?: string;

  @ApiProperty({
    description: 'Audio file data',
    example: {
      filename: 'audio-review-6596d27998ebf3609b208f4b',
      type: 'audio',
      url: 'https://wokudevfiles.blob.core.windows.net/wokus/28a591ae-0d65-40bb-8e4d-687c9bb75397blob',
    },
  })
  file: VoicemailFileDTO;

  @ApiProperty({
    description: 'Client ID',
    example: '653c78b70c83744b1340a551',
  })
  clientId?: string;
}
