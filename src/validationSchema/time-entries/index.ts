import * as yup from 'yup';

export const timeEntryValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  task_id: yup.string().nullable().required(),
  team_member_id: yup.string().nullable().required(),
});
