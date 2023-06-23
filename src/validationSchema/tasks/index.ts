import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  department_manager_id: yup.string().nullable().required(),
  team_member_id: yup.string().nullable().required(),
});
