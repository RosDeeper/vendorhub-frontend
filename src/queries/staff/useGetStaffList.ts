import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from 'lodash';

import { graphQLClient } from "@/lib/graphql-client";
import { StaffService } from "@/src/services/staff.service";
import { QUERY_KEY } from "../queryKey";
import { DefaultParams, StaffListResponse } from "../types";

export const useGetStaffList = (defaultParams: DefaultParams) => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<DefaultParams>(defaultParams);

  const { data, error, isError, isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_STAFF_LIST, params],

    queryFn: async () => graphQLClient.request<StaffListResponse>({
      document: StaffService.GET_STAFF_LIST,
      variables: { input: params },
    }),
    
    enabled: !isEmpty(params),
    placeholderData: (prevData) => prevData,
  });

  const handleInvalidateStaff = () => {
    return queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEY.GET_STAFF_LIST],
    });
  };

  const staffList = data?.getStaffList?.items ?? [];
  const totalStaff = data?.getStaffList?.total ?? 0;

  return {
    staffList,
    totalStaff,
    isLoading: isFetching,
    isError,
    error,
    params,
    setParams,
    onRefetch: refetch,
    handleInvalidateStaff,
  };
};