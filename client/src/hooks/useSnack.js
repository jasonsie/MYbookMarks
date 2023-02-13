import { useSnackbar } from 'notistack';

export const useSnack = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant =
    (variant) =>
    (data = '修改成功!') => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(data, { variant });
    };

  return { handleClickVariant };
};
