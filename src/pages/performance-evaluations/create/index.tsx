import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPerformanceEvaluation } from 'apiSdk/performance-evaluations';
import { Error } from 'components/error';
import { performanceEvaluationValidationSchema } from 'validationSchema/performance-evaluations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PerformanceEvaluationInterface } from 'interfaces/performance-evaluation';

function PerformanceEvaluationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PerformanceEvaluationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPerformanceEvaluation(values);
      resetForm();
      router.push('/performance-evaluations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PerformanceEvaluationInterface>({
    initialValues: {
      evaluation_date: new Date(new Date().toDateString()),
      rating: 0,
      comments: '',
      hr_specialist_id: (router.query.hr_specialist_id as string) ?? null,
      team_member_id: (router.query.team_member_id as string) ?? null,
    },
    validationSchema: performanceEvaluationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Performance Evaluation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="evaluation_date" mb="4">
            <FormLabel>Evaluation Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.evaluation_date ? new Date(formik.values?.evaluation_date) : null}
                onChange={(value: Date) => formik.setFieldValue('evaluation_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="rating" mb="4" isInvalid={!!formik.errors?.rating}>
            <FormLabel>Rating</FormLabel>
            <NumberInput
              name="rating"
              value={formik.values?.rating}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.rating && <FormErrorMessage>{formik.errors?.rating}</FormErrorMessage>}
          </FormControl>
          <FormControl id="comments" mb="4" isInvalid={!!formik.errors?.comments}>
            <FormLabel>Comments</FormLabel>
            <Input type="text" name="comments" value={formik.values?.comments} onChange={formik.handleChange} />
            {formik.errors.comments && <FormErrorMessage>{formik.errors?.comments}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'hr_specialist_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'team_member_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'performance_evaluation',
  operation: AccessOperationEnum.CREATE,
})(PerformanceEvaluationCreatePage);
