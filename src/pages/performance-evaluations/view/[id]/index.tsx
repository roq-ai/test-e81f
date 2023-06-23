import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import {
  Text,
  Box,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Link,
  IconButton,
  Flex,
  Center,
  Stack,
} from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { FiTrash, FiEdit2, FiEdit3 } from 'react-icons/fi';
import { getPerformanceEvaluationById } from 'apiSdk/performance-evaluations';
import { Error } from 'components/error';
import { PerformanceEvaluationInterface } from 'interfaces/performance-evaluation';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function PerformanceEvaluationViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PerformanceEvaluationInterface>(
    () => (id ? `/performance-evaluations/${id}` : null),
    () =>
      getPerformanceEvaluationById(id, {
        relations: [
          'user_performance_evaluation_hr_specialist_idTouser',
          'user_performance_evaluation_team_member_idTouser',
        ],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Flex justifyContent="space-between" mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Performance Evaluation Detail View
          </Text>
          {hasAccess('performance_evaluation', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
            <NextLink href={`/performance-evaluations/edit/${data?.id}`} passHref legacyBehavior>
              <Button
                onClick={(e) => e.stopPropagation()}
                mr={2}
                as="a"
                variant="outline"
                colorScheme="blue"
                leftIcon={<FiEdit2 />}
              >
                Edit
              </Button>
            </NextLink>
          )}
        </Flex>
        {error && (
          <Box mb={4}>
            {' '}
            <Error error={error} />{' '}
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <Stack direction="column" spacing={2} mb={4}>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Evaluation Date:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.evaluation_date as unknown as string}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Rating:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.rating}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Comments:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.comments}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Created At:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.created_at as unknown as string}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Updated At:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  {data?.updated_at as unknown as string}
                </Text>
              </Flex>
            </Stack>
            <Box>
              {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" as="span">
                    User Performance Evaluation Hr Specialist Id Touser:
                  </Text>
                  <Text fontSize="md" as="span" ml={3}>
                    <Link
                      as={NextLink}
                      href={`/users/view/${data?.user_performance_evaluation_hr_specialist_idTouser?.id}`}
                    >
                      {data?.user_performance_evaluation_hr_specialist_idTouser?.email}
                    </Link>
                  </Text>
                </Flex>
              )}
              {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                <Flex alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold" as="span">
                    User Performance Evaluation Team Member Id Touser:
                  </Text>
                  <Text fontSize="md" as="span" ml={3}>
                    <Link
                      as={NextLink}
                      href={`/users/view/${data?.user_performance_evaluation_team_member_idTouser?.id}`}
                    >
                      {data?.user_performance_evaluation_team_member_idTouser?.email}
                    </Link>
                  </Text>
                </Flex>
              )}
            </Box>
            <Box></Box>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'performance_evaluation',
  operation: AccessOperationEnum.READ,
})(PerformanceEvaluationViewPage);
