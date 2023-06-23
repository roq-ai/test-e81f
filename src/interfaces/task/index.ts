import { TimeEntryInterface } from 'interfaces/time-entry';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  title: string;
  description?: string;
  department_manager_id: string;
  team_member_id: string;
  created_at?: any;
  updated_at?: any;
  time_entry?: TimeEntryInterface[];
  user_task_department_manager_idTouser?: UserInterface;
  user_task_team_member_idTouser?: UserInterface;
  _count?: {
    time_entry?: number;
  };
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  department_manager_id?: string;
  team_member_id?: string;
}
