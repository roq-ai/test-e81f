import { TaskInterface } from 'interfaces/task';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TimeEntryInterface {
  id?: string;
  start_time: any;
  end_time: any;
  task_id: string;
  team_member_id: string;
  created_at?: any;
  updated_at?: any;

  task?: TaskInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TimeEntryGetQueryInterface extends GetQueryInterface {
  id?: string;
  task_id?: string;
  team_member_id?: string;
}
