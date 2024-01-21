import { Document } from 'mongoose';

export interface Avatar {
  filename: string;
  type: string;
  url: string;
  blobName: string;
  private?: boolean;
}

export interface PublicCompany extends Document {
  name: string;
  createdBy: string;
  users: string[];
  subscriptionId: string;
  admins: string[];
  avatar?: Avatar;
}

export interface WokuTextnote extends Document {
  qualification: TextnoteQualification;
  createdBy: string;
  anonymous: boolean;
  values?: string[];
  description: string;
  feedbackType?: string;
}

export interface WokuQualification extends Document {
  qualification: number;
  createdBy?: string;
}

export interface TextnoteQualification extends Document {
  qualification: number;
}

export interface WokuFile extends Document {
  filename: string;
  type: string;
  url?: string;
  blobName?: string;
  private: boolean;
}

export interface VoicemailQualification extends Document {
  qualification: number;
}

export interface VoicemailFile extends Document {
  filename: string;
  type: string;
  url?: string;
  blobName?: string;
  private: boolean;
}

export interface WokuVoicemail extends Document {
  qualification: VoicemailQualification;
  createdBy: string;
  anonymous: boolean;
  values?: string[];
  transcript?: string;
  feedbackType?: string;
  file: VoicemailFile;
}

export interface Woku extends Document {
  description: string;
  createdBy: string;
  companyId: string;
  users?: string[];
  file: WokuFile;
  qualifications?: WokuQualification[];
  textnotes?: WokuTextnote[];
  voicemails: WokuVoicemail[];
  feedbacksSummary?: string;
  folderId: string;
  demographicSurveyFormId: string;
}

export interface PublicUser extends Document {
  name: string;
  username: string;
  avatar?: Avatar;
}

export interface WokuReview {
  woku: Woku;
  users: PublicUser[];
  company: PublicCompany;
}

export interface TextnoteQualification extends Document {
  qualification: number;
  createdBy?: string;
}

export interface Textnote extends Document {
  qualification: TextnoteQualification;
  createdBy?: string;
  wokuId: string;
  anonymous?: boolean;
  values?: string[];
  description: string;
  feedbackType?: string;
  clientId?: string;
}

export interface VoicemailQualification extends Document {
  qualification: number;
}

export interface Voicemail extends Document {
  qualification: VoicemailQualification;
  createdBy?: string;
  wokuId: string;
  anonymous: boolean;
  values?: string[];
  transcript?: string;
  feedbackType?: string;
  file: VoicemailFile;
  clientId?: string;
}

export interface VoicemailFile extends Document {
  filename: string;
  type: string;
  url?: string;
  blobName?: string;
  private: boolean;
}
