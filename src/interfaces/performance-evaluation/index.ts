import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceEvaluationInterface {
  id?: string;
  evaluation_date: any;
  rating: number;
  comments?: string;
  hr_specialist_id: string;
  team_member_id: string;
  created_at?: any;
  updated_at?: any;

  user_performance_evaluation_hr_specialist_idTouser?: UserInterface;
  user_performance_evaluation_team_member_idTouser?: UserInterface;
  _count?: {};
}

export interface PerformanceEvaluationGetQueryInterface extends GetQueryInterface {
  id?: string;
  comments?: string;
  hr_specialist_id?: string;
  team_member_id?: string;
}
