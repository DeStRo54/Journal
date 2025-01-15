import { usePostAdminAddGroupMutation } from '@/utils/redux/apiSlices/adminApiSlice/adminApi';
import { useFormik } from 'formik';
import { AdminSchema, AdminSchemasType } from '../shemas';

export const useAdminForm = () => {
  const [postGroup, { isLoading, isError }] = usePostAdminAddGroupMutation();

  const form = useFormik<AdminSchemasType>({
    validationSchema: AdminSchema,
    validateOnBlur: false,
    initialValues: {
      adminGroup: '',
      adminCourse: '',
      adminIcal: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      await postGroup({
        params: {
          name: values.adminGroup,
          course: Number(values.adminCourse),
          icalLink: values.adminIcal
        }
      });
    }
  });

  return {
    form,
    state: {
      isLoading: isLoading,
      isError: isError,
    }
  };
};
