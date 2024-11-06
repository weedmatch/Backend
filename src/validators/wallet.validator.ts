import Joi from 'joi';

export default class WalletValidator {
  static verfiyBank(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
      account_number: Joi.string().required(),
      bank_code: Joi.number().required(),
    });
    return schema.validate(data);
  }

  static addBank(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
        accountDetails: Joi.object().keys({
            account_number: Joi.string().required(),
            account_bank: Joi.string().required(),
            account_name: Joi.string().required(),
            created: Joi.date().default(Date.now),
        }).required()
    });

    return schema.validate(data);
}

  static validateId(walletId: any): Joi.ValidationResult{
    const schema = Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })
    return schema.validate(walletId);
  }
}