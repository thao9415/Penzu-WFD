import {Tag} from './tag';
import {User} from './user';

export interface Diary {
  id?: string;
  date?: string;
  title?: string;
  description?: string;
  content?: string;
  tag?: Tag;
  user?: User;
}
