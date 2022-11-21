import { UserData } from './user';

export interface ProjectData {
  id?: string;
  name?: string;
  owner?: string;
  avatar?: string;
  created_at?: string;
  is_default?: boolean;
  owner_info?: UserData;
  updated_at?: string;
  description?: string;
}
