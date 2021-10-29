const disabledSubmitGeneral = (
  isAdd: boolean, isEdit: boolean, isLoading: boolean, isTouched: boolean,
) => {
  if (isAdd) {
    return !isTouched || isLoading;
  }
  return !isEdit || isLoading;
};

const FormBusiness = {
  disabledSubmitGeneral,
};

export default FormBusiness;
