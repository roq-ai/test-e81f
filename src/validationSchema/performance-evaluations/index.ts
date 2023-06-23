import * as yup from 'yup';

export const performanceEvaluationValidationSchema = yup.object().shape({
  evaluation_date: yup.date().required(),
  rating: yup.number().integer().required(),
  comments: yup.string(),
  hr_specialist_id: yup.string().nullable().required(),
  team_member_id: yup.string().nullable().required(),
});
