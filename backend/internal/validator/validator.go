package validator

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type Validator struct {
	v *validator.Validate
}

func NewValidator() *Validator {
	return &Validator{v: validator.New()}
}

func (val *Validator) Validate(s interface{}) map[string]string {
	err := val.v.Struct(s)
	if err == nil {
		return nil
	}

	errors := make(map[string]string)
	for _, fe := range err.(validator.ValidationErrors) {
		field := fe.Field()
		switch fe.Tag() {
		case "required":
			errors[field] = fmt.Sprintf("%s wajib diisi", field)
		case "email":
			errors[field] = fmt.Sprintf("%s harus berupa email yang valid", field)
		case "min":
			errors[field] = fmt.Sprintf("%s minimal %s karakter", field, fe.Param())
		case "max":
			errors[field] = fmt.Sprintf("%s maksimal %s karakter", field, fe.Param())
		default:
			errors[field] = fmt.Sprintf("%s tidak valid (%s)", field, fe.Tag())
		}
	}
	return errors
}
