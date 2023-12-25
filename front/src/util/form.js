export const REG_EXP_EMAIL = new RegExp(
	/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  )
  
export const REG_EXP_PASSWORD = new RegExp(
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  )
  
export const FIELD_ERROR = {
	IS_EMPTY: 'Enter a value in the field.',
	IS_BIG: 'Value is too long. Remove excess',
	EMAIL: 'Enter a valid email address.',
	PASSWORD:
	  'Password must be at least 8 characters long, including at least 1 digit, lowercase, and uppercase letter.',
};
