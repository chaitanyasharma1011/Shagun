// REGEX USED IN VALIDATION
export const regex = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  INPUT_NUMBER: /^-?\d*(\.\d{0,1})?$/,
  INPUT_INTEGER: /^(?<![\d.])(?:[0-9]+)?(?![\d.])$/,
};

//RENDER ERROR FOR INPUT FIELDS
export const onRenderError = (error) => ({
  error: Boolean(error),
  helperText: (
    <span
      className={`font-inter-regular text-xs${
        error ? " text-[#df6868]" : " text-white"
      }`}
    >
      {error}
    </span>
  ),
});

// VALIDATE FORM USING YUP
export const onFormValidate = async (schema, form, options = {}) => {
  const optionsTemp = { abortEarly: false, ...options };
  try {
    const values = await schema.validate(form, optionsTemp);
    return { error: false, values };
  } catch (error) {
    const { message: count, ...keys } = error;
    const errorPath = {};
    // console.log(error);
    keys.inner.forEach(({ path, message }) => {
      errorPath[path] = message;
    });
    return {
      count,
      keys,
      error: true,
      errorPath,
    };
  }
};

//RENDER NECESSARY INPUT FIELD PROPS
export const onRenderInput = (
  form,
  setForm,
  name,
  defaultValue,
  callback = () => {},
  type = "",
  context = {}
) => ({
  name: name,
  value: form[name] || defaultValue,
  onChange: (event) => {
    const { name, value } = event.target;

    if (context.maxLength && value.length > context.maxLength) {
      return; // Exit early if the input > max length
    }

    if (type === "number") {
      // console.log(regex.INPUT_NUMBER.test(value));
      if (!regex.INPUT_NUMBER.test(value)) return;
    }
    if (type == "integer") {
      if (!regex.INPUT_INTEGER.test(value)) return;
    }
    setForm((prev = {}) => ({
      ...prev,
      [name]: value,
    }));
    callback(
      value,
      {
        ...form,
        [name]: value,
      },
      setForm
    );
  },
});
